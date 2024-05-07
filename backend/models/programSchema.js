const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    program: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("program", programSchema);
