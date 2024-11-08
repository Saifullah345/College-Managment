const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema(
  {
    district: {
      type: String,
      required: true,
      index: true,
    },
    provinceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "province",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("district", districtSchema);
