const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    session: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("session", sessionSchema);
