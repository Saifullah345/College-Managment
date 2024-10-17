const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("newUsers", userSchema);
