const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema(
  {
    province: {
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

module.exports = mongoose.model("province", provinceSchema);
