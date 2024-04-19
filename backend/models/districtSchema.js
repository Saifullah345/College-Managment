const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema(
  {
    province: {
      type: String,
      required: true,
      index: true,
    },
    district: {
      type: String,
      required: true,
      index: true,
    },
    tehsil: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("district", districtSchema);
