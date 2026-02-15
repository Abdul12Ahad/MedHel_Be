// utils/openAssistantEngine.js
import fetch from "node-fetch";

export const generateOAReport = async (inputData) => {
  const {
    age,
    gender,
    symptoms,
    duration,
    temperature,
    lifestyle,
    existingConditions,
    allergies,
    medications
  } = inputData;

  const prompt = `
You are a general wellness assistant.

User Details:
- Age: ${age}
- Gender: ${gender}
- Symptoms: ${symptoms}
- Duration: ${duration}
- Body Temperature: ${temperature}
- Lifestyle / Activity Level: ${lifestyle}
- Existing Medical Conditions: ${existingConditions}
- Allergies: ${allergies}
- Current Medications: ${medications}

IMPORTANT RULES:
- Do NOT diagnose diseases.
- Do NOT prescribe medicines.
- Do NOT suggest antibiotics.
- Provide only general wellness advice.
- Include a clear disclaimer.

FORMAT STRICTLY AS:

1. Wellness Summary
2. Possible Common Causes (Non-Diagnostic)
3. Immediate Care & Precautions
4. Safe OTC Support (If Needed)
5. Physical Activity & Rest Guidance
6. Diet & Lifestyle Recommendations
7. When to Seek Medical Help
8. Disclaimer
`;

  const response = await fetch(
    "https://api.openassistant.io/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "oasst-sft-4-pythia-12b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4
      })
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error("Open Assistant Error: " + err);
  }

  const data = await response.json();

  const text =
    data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error("Open Assistant returned empty response");
  }

  return text;
};
