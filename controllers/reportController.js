import Report from "../models/Report.js";
import { generateGroqReport } from "../utils/groqAIEngine.js";
import { generateFallbackReport } from "../utils/wellnessEngine.js";

export const generateReport = async (req, res) => {
  try {
    const inputData = req.body;
    let reportData;
    let sourceUsed = "AI";

    try {
      reportData = await generateGroqReport(inputData);

      if (!reportData || !reportData.summary) {
        throw new Error("Empty AI response");
      }

    } catch (err) {
      console.error("Groq failed → fallback used:", err.message);
      reportData = generateFallbackReport(inputData);
      sourceUsed = "fallback";
    }

    const report = await Report.create({
      user: req.user,
      inputData,
      aiReport: reportData,
      source: sourceUsed
    });

    res.status(201).json({
      message: "Report generated successfully",
      source: sourceUsed,
      report
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user }).sort({ createdAt: -1 });
    res.json({ reports });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
