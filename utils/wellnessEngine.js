export const generateFallbackReport = (inputData) => {
  const {
    age,
    symptoms = "",
    duration = "",
    temperature = "",
    lifestyle = "",
    existingConditions = ""
  } = inputData;

  return {
    summary: `You have been experiencing ${symptoms} for ${duration}. This is a general wellness overview.`,
    causes:
      "Possible causes include lifestyle strain, posture-related stress, or minor nutritional deficiencies.",
    precautions:
      "Ensure proper rest, maintain hydration, and avoid overexertion.",
    otc:
      "Basic pain relief options may be used if suitable. Avoid anything that causes allergies.",
    exercises:
      lifestyle.toLowerCase().includes("active")
        ? "Light stretching and walking may help."
        : "Rest is advised until symptoms improve.",
    diet:
      "Maintain a balanced diet with adequate protein, calcium, and vitamin D.",
    doctorAdvice:
      "Seek medical advice if pain worsens, persists beyond two weeks, or limits mobility.",
    disclaimer:
      "This report provides general wellness guidance only and is not a medical diagnosis."
  };
};
