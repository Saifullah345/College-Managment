const mongoose = require("mongoose");

const feeHistorySchema = new mongoose.Schema(
  {
    sclassName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sclass",
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "session",
    },
    totalFee: {
      type: Number,
      default: 0,
    },
    discountFee: {
      type: Number,
      default: 0,
    },
    fee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fee",
    },
    discount: {
      type: Number,
      default: 0,
    },
    remainingFee: {
      type: Number,
      default: 0,
    },
    paidFee: {
      type: Number,
      default: 0,
    },
    year: {
      type: String,
    },
    paidFees: [
      {
        feeType: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    remainingFees: [
      {
        feeType: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const studentSchema = new mongoose.Schema(
  {
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
      type: String,
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
      default: "",
    },
    idCardFront: {
      type: String,
      default: "",
    },
    idCardBack: {
      type: String,
      default: "",
    },
    MetricDMC: {
      type: String,
      default: "",
    },
    sclassName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sclass",
    },
    admissionStatus: {
      type: String,
      default: "pending",
    },
    role: {
      type: String,
      default: "Student",
    },
    feeHistory: [feeHistorySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", studentSchema);
