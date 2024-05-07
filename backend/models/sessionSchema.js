const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    session: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("session", sessionSchema);
