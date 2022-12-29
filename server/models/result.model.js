const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    trails: {
      type: Schema.Types.ObjectId,
      ref: "trails",
    },
    userAnwers: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: "questions",
        },
        selectedAnswer:[{ type: String, required: true }]
      },
    ],
  },
  { timestamps: true }
);

const Result = mongoose.model("result", ResultSchema);
module.exports = Result;
