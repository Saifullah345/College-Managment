const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    boardName: {
      type: String,
      required: true,
      index: true,
    },
    boardAddress: {
      type: String,
      required: true,
      index: true,
    },
    session: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("board", boardSchema);
