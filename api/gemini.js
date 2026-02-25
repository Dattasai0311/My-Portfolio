const RATE_LIMIT = {
  minIntervalMs: 2000,
  maxPerMinute: 20,
  maxPerDay: 300
};

const LIMITER_STORE = globalThis.__portfolioRateLimiter || new Map();
globalThis.__portfolioRateLimiter = LIMITER_STORE;

const MODEL_FALLBACKS = ["gemini-2.5-flash", "gemini-1.5-flash"];

const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
};

const now = () => Date.now();

const prune = (entry, timestamp) => {
  const minuteCutoff = timestamp - 60 * 1000;
  const dayCutoff = timestamp - 24 * 60 * 60 * 1000;
  entry.minuteHits = entry.minuteHits.filter((t) => t > minuteCutoff);
  entry.dayHits = entry.dayHits.filter((t) => t > dayCutoff);
};

const enforceRateLimit = (ip) => {
  const timestamp = now();
  const entry = LIMITER_STORE.get(ip) || { minuteHits: [], dayHits: [], lastAt: 0 };
  prune(entry, timestamp);

  if (timestamp - entry.lastAt < RATE_LIMIT.minIntervalMs) {
    return {
      allowed: false,
      status: 429,
      message: "Too many requests. Please wait a moment."
    };
  }
  if (entry.minuteHits.length >= RATE_LIMIT.maxPerMinute) {
    return {
      allowed: false,
      status: 429,
      message: "Rate limit exceeded for this minute."
    };
  }
  if (entry.dayHits.length >= RATE_LIMIT.maxPerDay) {
    return {
      allowed: false,
      status: 429,
      message: "Daily request limit exceeded."
    };
  }

  entry.lastAt = timestamp;
  entry.minuteHits.push(timestamp);
  entry.dayHits.push(timestamp);
  LIMITER_STORE.set(ip, entry);

  return { allowed: true, status: 200, message: "" };
};

const sendJson = (res, status, body) => {
  res.status(status).setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(body));
};

const callGemini = async ({ apiKey, model, userPrompt, systemInstruction }) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => null);
  return { response, data };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_KEY || "";
  const configuredModel = process.env.GEMINI_MODEL || process.env.VITE_GEMINI_MODEL || "";
  if (!apiKey) {
    return sendJson(res, 500, { error: "Server missing GEMINI_API_KEY." });
  }

  const userPrompt = req.body?.userPrompt;
  const systemInstruction = req.body?.systemInstruction;

  if (typeof userPrompt !== "string" || !userPrompt.trim()) {
    return sendJson(res, 400, { error: "Prompt is required." });
  }
  if (typeof systemInstruction !== "string" || !systemInstruction.trim()) {
    return sendJson(res, 400, { error: "System instruction is required." });
  }
  if (userPrompt.length > 2000) {
    return sendJson(res, 400, { error: "Prompt too long (max 2000 characters)." });
  }
  if (systemInstruction.length > 25000) {
    return sendJson(res, 400, { error: "System instruction too long." });
  }

  const ip = getClientIp(req);
  const limit = enforceRateLimit(ip);
  if (!limit.allowed) {
    return sendJson(res, limit.status, { error: limit.message });
  }

  const models = [...new Set([configuredModel, ...MODEL_FALLBACKS].filter(Boolean))];

  try {
    for (const model of models) {
      const { response, data } = await callGemini({ apiKey, model, userPrompt, systemInstruction });
      if (response.status === 404) continue;

      if (!response.ok) {
        const message = data?.error?.message || "Gemini API request failed.";
        return sendJson(res, response.status, { error: message });
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return sendJson(res, 200, { text });
    }
    return sendJson(res, 503, { error: "No available Gemini model responded." });
  } catch (error) {
    console.error("Gemini proxy error:", error);
    return sendJson(res, 500, { error: "Server-side AI request failed." });
  }
}

