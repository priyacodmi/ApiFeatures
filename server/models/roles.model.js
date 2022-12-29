const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Roles = mongoose.model("roles", RolesSchema);
module.exports = Roles;
