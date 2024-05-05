const mongoose = require("mongoose");

const tehsilSchema = new mongoose.Schema(
  {
    tehsil: {
      type: String,
      required: true,
      index: true,
    },
    districtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "district",
      required: true,
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

module.exports = mongoose.model("tehsil", tehsilSchema);
