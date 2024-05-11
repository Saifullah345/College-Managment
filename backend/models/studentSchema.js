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
    type: String,
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

  // sclassName: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "sclass",
  //
  // },
  // school: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "admin",
  //
  // },
  // role: {
  //   type: String,
  //   default: "Student",
  // },
  // examResult: [
  //   {
  //     subName: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "subject",
  //     },
  //     marksObtained: {
  //       type: Number,
  //       default: 0,
  //     },
  //   },
  // ],
  // attendance: [
  //   {
  //     date: {
  //       type: Date,
  //
  //     },
  //     status: {
  //       type: String,
  //       enum: ["Present", "Absent"],
  //
  //     },
  //     subName: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "subject",
  //
  //     },
  //   },
  // ],
});

module.exports = mongoose.model("student", studentSchema);
