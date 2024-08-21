const bcrypt = require("bcrypt");
const Student = require("../models/studentSchema.js");
const Subject = require("../models/subjectSchema.js");
const driveHandlers = require("../utilits/drive_handlers.js");
const multer = require("multer");
const Fee = require("../models/feeSchema");
const mongoose = require("mongoose");

const upload = multer().fields([
  { name: "idCardFront", maxCount: 1 },
  { name: "idCardBack", maxCount: 1 },
  { name: "studentProfile", maxCount: 1 },
  { name: "MetricDMC", maxCount: 1 },
]);
// const studentRegister = async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(req.body.password, salt);

//     const existingStudent = await Student.findOne({
//       rollNum: req.body.rollNum,
//       school: req.body.adminID,
//       sclassName: req.body.sclassName,
//       provinces: req.body.provinces,
//       address: req.body.provinces,
//     });

//     if (existingStudent) {
//       res.send({ message: "Roll Number already exists" });
//     } else {
//       const student = new Student({
//         ...req.body,
//         school: req.body.adminID,
//         password: hashedPass,
//       });

//       let result = await student.save();

//       result.password = undefined;
//       res.send(result);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const studentRegister = async (req, res) => {
  try {
    upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({ error: error.message });
      } else if (
        !req.files["idCardFront"] ||
        !req.files["idCardBack"] ||
        !req.files["MetricDMC"] ||
        !req.files["studentProfile"]
      ) {
        return res.status(400).json({ error: "File(s) missing" });
      }
      const studentData = req.body;

      let idCardFront = await driveHandlers.uploadImage(
        req.files["idCardFront"][0]
      );
      if (idCardFront.uploaded === true) {
        studentData.idCardFront = idCardFront.url;
      }
      let idCardBack = await driveHandlers.uploadImage(
        req.files["idCardBack"][0]
      );
      if (idCardBack.uploaded === true) {
        studentData.idCardBack = idCardBack.url;
      }
      let MetricDMC = await driveHandlers.uploadImage(
        req.files["MetricDMC"][0]
      );
      if (MetricDMC.uploaded === true) {
        studentData.MetricDMC = MetricDMC.url;
      }
      let studentProfile = await driveHandlers.uploadImage(
        req.files["studentProfile"][0]
      );
      if (studentProfile.uploaded === true) {
        studentData.studentProfile = studentProfile.url;
      }

      const feeDetails = await Fee.findOne({
        sclass: studentData.sclassName,
        session: studentData.session,
      });

      if (!feeDetails) {
        return res.status(400).json({
          error: "Fee details not found for the specified class and session",
        });
      }

      const feeValues = feeDetails.toObject();
      let totalFee = Object.keys(feeValues).reduce((sum, key) => {
        if (
          key !== "_id" &&
          key !== "createdAt" &&
          key !== "updatedAt" &&
          key !== "__v" &&
          key !== "session" &&
          key !== "sclass"
        ) {
          const fee = parseFloat(feeValues[key]) || 0;
          sum += fee;
        }
        return sum;
      }, 0);

      const tuitionFee = parseFloat(feeValues.tuitionFee) || 0;
      const discountPercent = parseFloat(studentData.discount) || 0;
      const discountAmount = (tuitionFee * discountPercent) / 100;
      const remainingFee = totalFee - discountAmount;
      studentData.feeHistory = [
        {
          sclassName: studentData.sclassName,
          session: studentData.session,
          totalFee,
          discountFee: discountAmount,
          discount: studentData.discount,
          remainingFee,
          paidFee: 0,
        },
      ];

      // Set fee details in student data
      studentData.discountFee = discountAmount.toString();
      studentData.remainingFee = remainingFee.toString();
      studentData.paidFee = "0"; // Assuming initial paid fee is 0

      const student = new Student(studentData);
      let result = await student.save();

      return res.status(201).json({
        code: 200,
        data: result,
        message: "Student data saved successfully",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updateData = req.body;

    // Find the student by ID
    let student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // If class or session is updated, add previous fee details to history
    if (updateData.sclassName || updateData.session) {
      const feeDetails = await Fee.findOne({
        sclass: student.sclassName,
        session: student.session._id,
      });
      if (feeDetails) {
        const feeValues = feeDetails.toObject();
        let totalFee = Object.keys(feeValues).reduce((sum, key) => {
          if (
            key !== "_id" &&
            key !== "createdAt" &&
            key !== "updatedAt" &&
            key !== "__v" &&
            key !== "session" &&
            key !== "sclass"
          ) {
            const fee = parseFloat(feeValues[key]) || 0;
            sum += fee;
          }
          return sum;
        }, 0);

        const tuitionFee = parseFloat(feeValues.tuitionFee) || 0;
        const discountPercent = parseFloat(updateData.discount) || 0;
        const discountAmount = (tuitionFee * discountPercent) / 100;
        const remainingFee = totalFee - discountAmount;

        student.feeHistory.push({
          sclassName: student.sclassName,
          session: student.session,
          totalFee,
          discountFee: discountAmount,
          remainingFee,
          paidFee: student.paidFee || 0,
          year: student.year,
          s,
        });
      }
    }

    // Update student data except profile images and CNIC documents
    Object.keys(updateData).forEach((key) => {
      if (
        key !== "studentProfile" &&
        key !== "idCardFront" &&
        key !== "idCardBack" &&
        key !== "MetricDMC"
      ) {
        student[key] = updateData[key];
      }
    });

    // If a discount is provided, update the fee details accordingly
    if (updateData.discount) {
      const feeDetails = await Fee.findOne({
        sclass: student.sclassName,
        session: student.session._id,
      });

      if (feeDetails) {
        const feeValues = feeDetails.toObject();
        const tuitionFee = parseFloat(feeValues.tuitionFee) || 0;
        const discountPercent = parseFloat(updateData.discount) || 0;
        const discountAmount = (tuitionFee * discountPercent) / 100;
        const remainingFee =
          Object.keys(feeValues).reduce((sum, key) => {
            if (
              key !== "_id" &&
              key !== "createdAt" &&
              key !== "updatedAt" &&
              key !== "__v" &&
              key !== "session" &&
              key !== "sclass"
            ) {
              const fee = parseFloat(feeValues[key]) || 0;
              sum += fee;
            }
            return sum;
          }, 0) - discountAmount;

        student.discountFee = discountAmount;
        student.remainingFee = remainingFee;
      }
    }

    await student.save();

    return res.status(200).json({
      code: 200,
      message: "Student data updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateStudentFee = async (req, res) => {
  try {
    const { id } = req.params;
    const { paidFee, remainingFee, classId, feeType } = req.body;

    let student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const feeDetails = await Fee.findOne({
      sclass: student.sclassName,
      session: student.session,
    });
    if (!feeDetails) {
      return res.status(400).json({
        error: "Fee details not found for the specified class and session",
      });
    }

    let feeHistory = student.feeHistory.find(
      (history) => history.sclassName.toString() === classId
    );

    if (!feeHistory) {
      return res.status(404).json({ error: "Class fee history not found" });
    }

    if (!feeType || typeof feeType !== "string" || feeType.trim() === "") {
      return res.status(400).json({ error: "Invalid fee type" });
    }

    if (paidFee === undefined || paidFee <= 0) {
      return res.status(400).json({ error: "Invalid paid fee amount" });
    }

    // Apply discount to all remainingFees for tuitionFee
    feeHistory.remainingFees = feeHistory.remainingFees.map((fee) => {
      if (fee.feeType === "tuitionFee" && feeHistory.discount) {
        const discountAmount = (fee.amount * feeHistory.discount) / 100;
        return {
          ...fee,
          amount: fee.amount - discountAmount,
        };
      }
      return fee;
    });

    const paidFees = feeHistory.paidFees.filter(
      (fee) => fee.feeType === feeType
    );
    const previousPaidFee = paidFees.reduce(
      (total, fee) => total + fee.amount,
      0
    );

    let discountedFee = feeDetails[feeType];
    if (feeType === "tuitionFee" && feeHistory.discount) {
      const discountAmount = (feeDetails[feeType] * feeHistory.discount) / 100;
      discountedFee -= discountAmount;
    }

    if (Number(paidFee) + Number(previousPaidFee) > Number(discountedFee)) {
      return res
        .status(400)
        .json({ error: "Paid fee exceeds the total fee for this type" });
    }

    feeHistory.paidFees.push({
      feeType,
      amount: Number(paidFee),
      date: new Date(),
    });

    const totalPaidSoFar = previousPaidFee + Number(paidFee);
    feeHistory.paidFee += Number(paidFee);

    if (totalPaidSoFar >= discountedFee) {
      feeHistory.remainingFees = feeHistory.remainingFees.filter(
        (fee) => fee.feeType !== feeType
      );
    } else {
      feeHistory.remainingFees = feeHistory.remainingFees.filter(
        (fee) => fee.feeType !== feeType
      );

      feeHistory.remainingFees.push({
        feeType,
        amount: discountedFee - totalPaidSoFar,
        date: new Date(),
      });
    }

    if (remainingFee !== undefined) {
      feeHistory.remainingFee = remainingFee;
    }

    await student.save();

    return res.status(200).json({
      code: 200,
      message: "Fee details updated successfully",
      updatedFeeHistory: feeHistory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const studentLogIn = async (req, res) => {
  try {
    let student = await Student.findOne({
      rollNum: req.body.rollNum,
      name: req.body.studentName,
    });
    if (student) {
      const validated = await bcrypt.compare(
        req.body.password,
        student.password
      );
      if (validated) {
        student = await student.populate("school", "schoolName");
        student = await student.populate("sclassName", "sclassName");
        student.password = undefined;
        student.examResult = undefined;
        student.attendance = undefined;
        res.send(student);
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getStudents = async (req, res) => {
  try {
    // Fetch students with populated references
    let students = await Student.find()
      .populate("sclassName")
      .populate("session")
      .exec();

    // Fetch all fees and populate related session and sclass
    const fees = await Fee.find().populate("session").populate("sclass").exec();

    // Create new student objects with updated feeHistory
    students = students.map((student) => {
      // Filter fees based on student’s sclassName and session
      const studentFees = fees.filter(
        (fee) =>
          fee.sclass.toString() === student.sclassName.toString() &&
          fee.session.toString() === student.session.toString()
      );

      // Construct new feeHistory array based on matching fees
      const newFeeHistory = studentFees.map((fee) => ({
        sclassName: fee.sclass,
        session: fee.session,
        totalFee: fee.totalFee,
        discountFee: fee.discountFee,
        fee: fee, // Reference to the fee
        discount: fee.discount,
        remainingFee: fee.remainingFee,
        paidFee: fee.paidFee,
        year: fee.year,
        paidFees: fee.paidFees,
      }));

      // Merge new feeHistory with existing feeHistory
      return {
        ...student.toObject(),
        feeHistory: [...student.feeHistory, ...newFeeHistory],
      };
    });

    if (students.length > 0) {
      res.send(students);
    } else {
      res.send({ message: "No students found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getStudentDetail = async (req, res) => {
  try {
    let student = await Student.findById(req.params.id)
      .populate("sclassName")
      .populate("session")
      .populate({
        path: "feeHistory.sclassName",
        model: "sclass",
      })
      .exec();

    if (!student) {
      return res.status(404).json({ message: "No student found" });
    }

    const studentSclassId = student.sclassName._id.toString();
    const studentSessionId = student.session._id.toString();

    // Fetch fees based on student's sclass and session
    const studentFees = await Fee.find({
      sclass: studentSclassId,
      session: studentSessionId,
    })
      .populate("session")
      .populate("sclass")
      .exec();
    // Merge new fee history into existing fee history
    studentFees.forEach((fee) => {
      const existingHistory = student.feeHistory.find(
        (history) =>
          history.sclassName._id.toString() === fee.sclass._id.toString() &&
          history.session._id.toString() === fee.session._id.toString()
      );

      if (existingHistory) {
        // Update existing history with new fee data
        existingHistory.totalFee = fee.totalFee || existingHistory.totalFee;
        existingHistory.discountFee =
          fee.discountFee || existingHistory.discountFee;
        existingHistory.discount = fee.discount || existingHistory.discount;
        existingHistory.remainingFee =
          fee.remainingFee || existingHistory.remainingFee;
        existingHistory.paidFee = fee.paidFee || existingHistory.paidFee;

        // Merge paidFees and remainingFees
        fee.paidFees?.forEach((paidFee) => {
          const existingPaidFee = existingHistory.paidFees.find(
            (pf) => pf.feeType === paidFee.feeType
          );
          if (existingPaidFee) {
            existingPaidFee.amount += paidFee.amount;
          } else {
            existingHistory.paidFees.push(paidFee);
          }
        });

        fee.remainingFees?.forEach((remainingFee) => {
          const existingRemainingFee = existingHistory.remainingFees.find(
            (rf) => rf.feeType === remainingFee.feeType
          );
          if (existingRemainingFee) {
            existingRemainingFee.amount = remainingFee.amount;
          } else {
            existingHistory.remainingFees.push(remainingFee);
          }
        });

        existingHistory.fee = fee;
      } else {
        // Add new fee data if it doesn't exist in feeHistory
        student.feeHistory.push({
          sclassName: fee.sclass,
          session: fee.session,
          totalFee: fee.totalFee,
          discountFee: fee.discountFee,
          discount: fee.discount,
          remainingFee: fee.remainingFee,
          paidFee: fee.paidFee,
          paidFees: fee.paidFees,
          remainingFees: fee.remainingFees,
          fee: fee,
        });
      }
    });

    // Ensure feeHistory has unique entries by checking sclassName and session IDs
    const uniqueFeeHistory = student.feeHistory.reduce((acc, current) => {
      const existingEntry = acc.find(
        (item) =>
          item.sclassName._id.toString() ===
            current.sclassName._id.toString() &&
          item.session._id.toString() === current.session._id.toString()
      );

      if (existingEntry) {
        // Merge the fields from current into existingEntry if not already set
        existingEntry.totalFee =
          existingEntry.totalFee || current.totalFee || 0;
        existingEntry.discountFee =
          existingEntry.discountFee || current.discountFee || 0;
        existingEntry.discount =
          existingEntry.discount || current.discount || 0;
        existingEntry.remainingFee =
          existingEntry.remainingFee || current.remainingFee || 0;
        existingEntry.paidFee = existingEntry.paidFee || current.paidFee || 0;

        // Merge arrays for paidFees and remainingFees
        current.paidFees.forEach((paidFee) => {
          const existingPaidFee = existingEntry.paidFees.find(
            (pf) => pf.feeType === paidFee.feeType
          );
          if (existingPaidFee) {
            existingPaidFee.amount += paidFee.amount;
          } else {
            existingEntry.paidFees.push(paidFee);
          }
        });

        current.remainingFees.forEach((remainingFee) => {
          const existingRemainingFee = existingEntry.remainingFees.find(
            (rf) => rf.feeType === remainingFee.feeType
          );
          if (existingRemainingFee) {
            existingRemainingFee.amount = remainingFee.amount;
          } else {
            existingEntry.remainingFees.push(remainingFee);
          }
        });

        existingEntry.fee = existingEntry.fee || current.fee || {};
      } else {
        acc.push(current);
      }

      return acc;
    }, []);

    student.feeHistory = uniqueFeeHistory;

    // Remove sensitive information
    student.password = undefined;
    return res.status(200).json(student);
  } catch (err) {
    console.error("Error in getStudentDetail:", err);
    res.status(500).json(err);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).json(err);
  }
};

const deleteStudents = async (req, res) => {
  try {
    const result = await Student.deleteMany({ school: req.params.id });
    if (result.deletedCount === 0) {
      res.send({ message: "No students found to delete" });
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

const deleteStudentsByClass = async (req, res) => {
  try {
    const result = await Student.deleteMany({ sclassName: req.params.id });
    if (result.deletedCount === 0) {
      res.send({ message: "No students found to delete" });
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

// const updateStudent = async (req, res) => {
//   try {
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       res.body.password = await bcrypt.hash(res.body.password, salt);
//     }
//     let result = await Student.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );

//     result.password = undefined;
//     return res.send(result);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };
const updateStudentClass = async (req, res) => {
  try {
    const { sclassName } = req.body;

    // Ensure sclassName is provided in the request body
    if (!sclassName) {
      return res.status(400).json({ message: "sclassName is required" });
    }

    // Find the student by ID
    let student = await Student.findById(req.params.id)
      .populate("sclassName")
      .populate("session");
    if (student.feeHistory[student.feeHistory.length - 1].remainingFee !== 0) {
      return res
        .status(404)
        .json({ error: "Please Submit Previous Class Fee" });
    }

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the sclassName field
    student.sclassName = sclassName;

    // Find the fee details for the new class and session
    const feeDetails = await Fee.findOne({
      sclass: student.sclassName,
      session: student.session._id,
    });

    if (!feeDetails) {
      return res.status(404).json({ error: "Fee details not found" });
    }
    const feeValues = feeDetails.toObject();
    let totalFee = Object.keys(feeValues).reduce((sum, key) => {
      if (
        key !== "_id" &&
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "__v" &&
        key !== "session" &&
        key !== "sclass"
      ) {
        const fee = parseFloat(feeValues[key]) || 0;
        sum += fee;
      }
      return sum;
    }, 0);
    // console.log(student.feeHistory);
    // Calculate the fee details

    const tuitionFee = parseFloat(feeValues.tuitionFee) || 0;
    const discountPercent = 0;
    const discountAmount = (tuitionFee * discountPercent) / 100;
    const remainingFee = totalFee - discountAmount;

    // Add the new fee history entry
    student.feeHistory.push({
      sclassName: student.sclassName,
      session: student.session,
      totalFee: tuitionFee,
      discountFee: discountAmount,
      remainingFee,
      paidFee: 0,
      year: new Date().getFullYear().toString(),
    });

    // Save the updated student
    await student.save();

    // Exclude password from the response
    student.password = undefined;

    return res.send(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateExamResult = async (req, res) => {
  const { subName, marksObtained } = req.body;

  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.send({ message: "Student not found" });
    }

    const existingResult = student.examResult.find(
      (result) => result.subName.toString() === subName
    );

    if (existingResult) {
      existingResult.marksObtained = marksObtained;
    } else {
      student.examResult.push({ subName, marksObtained });
    }

    const result = await student.save();
    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const studentAttendance = async (req, res) => {
  const { subName, status, date } = req.body;

  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.send({ message: "Student not found" });
    }

    const subject = await Subject.findById(subName);

    const existingAttendance = student.attendance.find(
      (a) =>
        a.date.toDateString() === new Date(date).toDateString() &&
        a.subName.toString() === subName
    );

    if (existingAttendance) {
      existingAttendance.status = status;
    } else {
      // Check if the student has already attended the maximum number of sessions
      const attendedSessions = student.attendance.filter(
        (a) => a.subName.toString() === subName
      ).length;

      if (attendedSessions >= subject.sessions) {
        return res.send({ message: "Maximum attendance limit reached" });
      }

      student.attendance.push({ date, status, subName });
    }

    const result = await student.save();
    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const clearAllStudentsAttendanceBySubject = async (req, res) => {
  const subName = req.params.id;

  try {
    const result = await Student.updateMany(
      { "attendance.subName": subName },
      { $pull: { attendance: { subName } } }
    );
    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const clearAllStudentsAttendance = async (req, res) => {
  const schoolId = req.params.id;

  try {
    const result = await Student.updateMany(
      { school: schoolId },
      { $set: { attendance: [] } }
    );

    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeStudentAttendanceBySubject = async (req, res) => {
  const studentId = req.params.id;
  const subName = req.body.subId;

  try {
    const result = await Student.updateOne(
      { _id: studentId },
      { $pull: { attendance: { subName: subName } } }
    );

    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeStudentAttendance = async (req, res) => {
  const studentId = req.params.id;

  try {
    const result = await Student.updateOne(
      { _id: studentId },
      { $set: { attendance: [] } }
    );

    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  studentRegister,
  studentLogIn,
  updateStudentFee,
  getStudents,
  getStudentDetail,
  deleteStudents,
  deleteStudent,
  updateStudent,
  studentAttendance,
  deleteStudentsByClass,
  updateExamResult,
  updateStudentClass,
  clearAllStudentsAttendanceBySubject,
  clearAllStudentsAttendance,
  removeStudentAttendanceBySubject,
  removeStudentAttendance,
};
