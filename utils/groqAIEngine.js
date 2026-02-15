import fetch from "node-fetch";

export const generateGroqReport = async (inputData) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY missing");
  }

  const prompt = `
You are a professional general wellness assistant.

RULES:
- NO diagnosis
- NO prescriptions
- NO antibiotics
- General wellness advice only
- Doctor-like, professional tone
- Return ONLY valid JSON

JSON FORMAT:
{
  "summary": "",
  "causes": "",
  "precautions": "",
  "otc": "",
  "exercises": "",
  "diet": "",
  "doctorAdvice": "",
  "disclaimer": ""
}

USER DATA:
${JSON.stringify(inputData, null, 2)}
`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
  model: "llama-3.1-8b-instant",
  messages: [
    { role: "system", content: "You are a safe wellness assistant." },
    { role: "user", content: prompt }
  ],
  temperature: 0.2,
  max_tokens: 700,
  response_format: { type: "json_object" }
})
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();

  try {
    const parsed = JSON.parse(data.choices[0].message.content);

    if (!parsed.summary) {
      throw new Error("Invalid AI response structure");
    }

    return parsed;
  } catch {
    throw new Error("Groq returned invalid JSON");
  }
};
