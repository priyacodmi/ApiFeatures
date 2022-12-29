const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String, required: true },
    role: {
      type: Schema.Types.ObjectId,
      ref: "roles", 
    },
    trails: [{
      type: Schema.Types.ObjectId,
      ref: "trails", 
    }],
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
