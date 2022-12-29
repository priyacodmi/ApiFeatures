const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctOption : { type: [String], required: true },
  },
  { timestamps: true }
);

const Question = mongoose.model("questions", QuestionSchema);
module.exports = Question;