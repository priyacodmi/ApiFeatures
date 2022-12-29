const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrailsSchema = new mongoose.Schema(
  {
    trailName: {
      type: String,
      required: true,
      unique: true,
    },
    attemptedUser: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "questions",
      },
    ],
  },
  { timestamps: true }
);

const Trails = mongoose.model("trails", TrailsSchema);
module.exports = Trails;
