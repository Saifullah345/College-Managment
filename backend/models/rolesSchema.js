const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      index: true,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("role", rolesSchema);
