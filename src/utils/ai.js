import { portfolioData } from "../data/portfolio";

const SYSTEM_PROMPT = `
You are an AI assistant representing Datta Sai Adithya Vinjamuri. 
Here is his resume data: ${JSON.stringify(portfolioData)}.
Your goal is to answer questions about Datta professionally and enthusiastically.
- If asked about skills, mention his specific tech stack (Python, AWS, etc.).
- If asked about projects, explain them in detail using the provided descriptions.
- Keep answers concise (under 3 sentences) unless asked for more detail.
- Format your response nicely using Markdown:
  - Use **bold** for emphasis.
  - Use bullet points (* or -) for lists.
  - Use \`code\` or \`\`\`code blocks\`\`\` for technical terms or commands.
`;

const RATE_LIMIT = {
  minIntervalMs: 2500,
  maxPerMinute: 8,
  maxPerDay: 120,
  maxPromptChars: 2000,
  requestTimeoutMs: 15000,
  devFallbackTimeoutMs: 30000
};

const RATE_STORE_KEY = "portfolio_ai_rate_state_v1";
let inFlight = false;
let lastRequestAt = 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithTimeout = async (url, options, timeoutMs) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

const readRateState = () => {
  if (typeof window === "undefined") return { minuteHits: [], dayHits: [] };
  try {
    const raw = window.localStorage.getItem(RATE_STORE_KEY);
    if (!raw) return { minuteHits: [], dayHits: [] };
    const parsed = JSON.parse(raw);
    return {
      minuteHits: Array.isArray(parsed.minuteHits) ? parsed.minuteHits : [],
      dayHits: Array.isArray(parsed.dayHits) ? parsed.dayHits : []
    };
  } catch {
    return { minuteHits: [], dayHits: [] };
  }
};

const writeRateState = (state) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(RATE_STORE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota/private mode errors; request can still proceed.
  }
};

const enforceLocalRateLimit = () => {
  const now = Date.now();

  if (inFlight) {
    return {
      allowed: false,
      message: "Please wait for the current AI response before sending another request."
    };
  }

  if (now - lastRequestAt < RATE_LIMIT.minIntervalMs) {
    const waitSeconds = Math.ceil((RATE_LIMIT.minIntervalMs - (now - lastRequestAt)) / 1000);
    return {
      allowed: false,
      message: `You're sending requests too quickly. Please wait ${waitSeconds}s and try again.`
    };
  }

  const state = readRateState();
  const minuteCutoff = now - 60 * 1000;
  const dayCutoff = now - 24 * 60 * 60 * 1000;

  state.minuteHits = state.minuteHits.filter((t) => t > minuteCutoff);
  state.dayHits = state.dayHits.filter((t) => t > dayCutoff);

  if (state.minuteHits.length >= RATE_LIMIT.maxPerMinute) {
    return {
      allowed: false,
      message: "Rate limit reached: too many AI requests in one minute. Please try again shortly."
    };
  }

  if (state.dayHits.length >= RATE_LIMIT.maxPerDay) {
    return {
      allowed: false,
      message: "Daily AI request limit reached for this browser. Please try again tomorrow."
    };
  }

  state.minuteHits.push(now);
  state.dayHits.push(now);
  writeRateState(state);
  lastRequestAt = now;

  return { allowed: true, message: "" };
};

const callGeminiDirectForDev = async (userPrompt, systemInstruction) => {
  const apiKey = import.meta.env.VITE_GEMINI_KEY || "";
  const configuredModel = import.meta.env.VITE_GEMINI_MODEL || "";
  const fallbackModels = ["gemini-2.5-flash", "gemini-1.5-flash"];
  const modelsToTry = [...new Set([configuredModel, ...fallbackModels].filter(Boolean))];
  if (!apiKey) {
    return { ok: false, message: "Missing VITE_GEMINI_KEY in local .env." };
  }

  for (const model of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      let response;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          response = await fetchWithTimeout(
            url,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ parts: [{ text: userPrompt }] }],
                systemInstruction: { parts: [{ text: systemInstruction }] }
              })
            },
            RATE_LIMIT.devFallbackTimeoutMs
          );
          break;
        } catch (error) {
          const isAbort = error?.name === "AbortError";
          if (isAbort && attempt === 0) {
            await sleep(1000);
            continue;
          }
          throw error;
        }
      }

      if (response.status === 404) continue;
      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const msg = errData?.error?.message || `Gemini error ${response.status}`;
        return { ok: false, message: msg };
      }
      const data = await response.json().catch(() => null);
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return { ok: true, text };
    } catch (error) {
      if (error?.name === "AbortError") {
        return { ok: false, message: "Gemini request timed out. Please retry in a few seconds." };
      }
      return { ok: false, message: error?.message || "Network error to Gemini API." };
    }
  }

  return { ok: false, message: "No available Gemini model responded in local fallback." };
};

export const callGeminiAPI = async (userPrompt, systemInstruction = SYSTEM_PROMPT) => {
  if (!userPrompt?.trim()) {
    return "Please enter a prompt before sending.";
  }
  if (userPrompt.length > RATE_LIMIT.maxPromptChars) {
    return `Prompt too long. Keep it under ${RATE_LIMIT.maxPromptChars} characters.`;
  }

  const rate = enforceLocalRateLimit();
  if (!rate.allowed) return rate.message;

  inFlight = true;

  try {
    let response;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      response = await fetchWithTimeout(
        "/api/gemini",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userPrompt, systemInstruction })
        },
        RATE_LIMIT.requestTimeoutMs
      );

      if (response.status === 429 && attempt === 0) {
        await sleep(1200);
        continue;
      }
      break;
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      const errMessage = errData?.error || "Unknown API error";
      if (response.status === 404 && import.meta.env.DEV) {
        const fallback = await callGeminiDirectForDev(userPrompt, systemInstruction);
        if (fallback?.ok && fallback.text) return fallback.text;
        return `Local API route is unavailable and Gemini fallback failed: ${fallback?.message || "unknown error"}`;
      }
      if (response.status === 429) return "AI rate limit reached. Please retry in a moment.";
      if (response.status === 401 || response.status === 403) {
        return "AI is blocked by API key restrictions on the server.";
      }
      throw new Error(`API Error ${response.status}: ${errMessage}`);
    }

    const data = await response.json();
    return data?.text || "AI model unavailable right now. Please try again shortly.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System offline due to API/network issue. Please try again later.";
  } finally {
    inFlight = false;
  }
};
