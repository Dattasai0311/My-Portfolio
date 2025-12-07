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

export const callGeminiAPI = async (userPrompt, systemInstruction = SYSTEM_PROMPT) => {
  const apiKey = import.meta.env.VITE_GEMINI_KEY || "";
  if (!apiKey) {
    return "AI is offline because no API key is configured.";
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm having trouble connecting to the neural network right now."
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System offline. Please try again later.";
  }
};
