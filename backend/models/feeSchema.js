const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "session",
    },
    sclass: { type: mongoose.Schema.Types.ObjectId, ref: "sclass" },
    admissionFee: {
      type: String,
    },
    tuitionFee: {
      type: String,
    },
    cardFee: {
      type: String,
    },
    libraryFee: {
      type: String,
    },
    laboratoryFee: {
      type: String,
    },
    laboratoryBreakage: {
      type: String,
    },
    librarySecurityFee: {
      type: String,
    },
    securityFee: {
      type: String,
    },
    examinationFee: {
      type: String,
    },
    welfareFee: {
      type: String,
    },
    hospitalFee: {
      type: String,
    },
    enrollmentFee: {
      type: String,
    },
    verificationFee: {
      type: String,
    },
    reAdmissionFee: {
      type: String,
    },
    specialFee: {
      type: String,
    },
    utilityFee: {
      type: String,
    },
    hostelFee: {
      type: String,
    },
    prospectusFee: {
      type: String,
    },
    magazineFee: {
      type: String,
    },
    donationFee: {
      type: String,
    },
    loanFee: {
      type: String,
    },
    fineFee: {
      type: String,
    },
    miscFee: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("fee", feeSchema);
