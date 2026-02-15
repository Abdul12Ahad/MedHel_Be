import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    inputData: {
      age: String,
      gender: String,
      symptoms: String,
      duration: String,
      temperature: String,
      lifestyle: String,
      existingConditions: String,
      allergies: String,
      medications: String
    },
    aiReport: {
      summary: String,
      causes: String,
      precautions: String,
      otc: String,
      exercises: String,
      diet: String,
      doctorAdvice: String,
      disclaimer: String
    },
    source: {
      type: String,
      enum: ["AI", "fallback"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
