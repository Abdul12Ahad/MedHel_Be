// utils/reportBuilder.js

export const buildReport = ({
  summary,
  causes,
  precautions,
  otc,
  exercises,
  diet,
  doctorAdvice,
  disclaimer
}) => {
  return `
1. Wellness Summary
${summary}

2. Possible Common Causes (Non-Diagnostic)
${causes}

3. Immediate Care & Precautions
${precautions}

4. Safe OTC Support (If Needed)
${otc}

5. Physical Activity & Rest Guidance
${exercises}

6. Diet & Lifestyle Recommendations
${diet}

7. When to Seek Medical Help
${doctorAdvice}

8. Disclaimer
${disclaimer}
`;
};
