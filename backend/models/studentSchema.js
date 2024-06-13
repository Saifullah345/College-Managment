const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  citizenship: {
    type: String,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "session",
  },
  cnic: {
    type: Number,
  },
  dob: {
    type: String,
  },
  religion: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
  whatsAppNumber: {
    type: Number,
  },
  program: {
    type: String,
  },
  gender: {
    type: String,
  },
  enrollmentNo: {
    type: String,
  },
  board: {
    type: String,
  },
  serialNumber: {
    type: Number,
  },
  rollNumber: {
    type: String,
  },
  yearOfPassing: {
    type: Number,
  },
  provinces: {
    type: String,
  },
  district: {
    type: String,
  },
  tehsil: {
    type: String,
  },
  postalAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  nameOfReference: {
    type: String,
  },
  numberOfReference: {
    type: Number,
  },
  relationWithReference: {
    type: String,
  },
  otherDetailWithReference: {
    type: String,
  },
  studentProfile: {
    type: String,
  },
  idCardFront: {
    type: String,
  },
  idCardBack: {
    type: String,
  },
  MetricDMC: {
    type: String,
  },

  sclassName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sclass",
  },
  admissionStatus: {
    type: String,
  },
  remainingFee: {
    type: String,
  },
  discountFee: {
    type: String,
  },
  paidFee: {
    type: String,
  },
  role: {
    type: String,
    default: "Student",
  },
});

module.exports = mongoose.model("student", studentSchema);
