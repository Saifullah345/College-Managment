const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema(
  {
    instituteProfile: {
      type: String,
    },
    instituteName: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    targetLine: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Institute", instituteSchema);
