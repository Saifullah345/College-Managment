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

      // Upload files to the drive
      const uploadFiles = async (file) => {
        let uploadedFile = await driveHandlers.uploadImage(file[0]);
        return uploadedFile.uploaded ? uploadedFile.url : null;
      };

      studentData.idCardFront = await uploadFiles(req.files["idCardFront"]);
      studentData.idCardBack = await uploadFiles(req.files["idCardBack"]);
      studentData.MetricDMC = await uploadFiles(req.files["MetricDMC"]);
      studentData.studentProfile = await uploadFiles(
        req.files["studentProfile"]
      );

      // Fetch fee details
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

      // Calculate total fee and fees to store in remainingFees array
      let totalFee = 0;
      const remainingFees = [];

      Object.keys(feeValues).forEach((key) => {
        if (
          key !== "_id" &&
          key !== "createdAt" &&
          key !== "updatedAt" &&
          key !== "__v" &&
          key !== "session" &&
          key !== "sclass"
        ) {
          let fee = parseFloat(feeValues[key]) || 0;

          // Apply discount to tuitionFee if applicable
          if (key === "tuitionFee") {
            const discountPercent = parseFloat(studentData.discount) || 0;
            const discountAmount = (fee * discountPercent) / 100;
            fee -= discountAmount; // Apply discount
            studentData.discountFee = discountAmount.toString();
          }

          if (fee > 0) {
            // Store only non-zero fees
            remainingFees.push({ feeType: key, amount: fee, date: new Date() });
            totalFee += fee; // Calculate total fee
          }
        }
      });

      // Calculate remaining fee
      studentData.remainingFee = totalFee.toString();
      studentData.paidFee = "0"; // Assuming initial paid fee is 0
      studentData.feeHistory = [
        {
          sclassName: studentData.sclassName,
          session: studentData.session,
          totalFee,
          discount: studentData.discount,
          remainingFee: totalFee,
          paidFee: 0,
          remainingFees, // Store remaining fees array in fee history
        },
      ];

      // Create and save new student record
      const student = new Student(studentData);
      const result = await student.save();

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
    const { paidFee, feeType } = req.body;

    // Fetch student details
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Fetch fee details for the student's class and session
    const feeDetails = await Fee.findOne({
      sclass: student.sclassName,
      session: student.session,
    });
    if (!feeDetails) {
      return res.status(400).json({
        error: "Fee details not found for the specified class and session",
      });
    }

    // Find the fee history for the specified class
    let feeHistory = student.feeHistory.find(
      (history) =>
        history.sclassName.toString() === student.sclassName.toString()
    );

    if (!feeHistory) {
      return res.status(404).json({ error: "Class fee history not found" });
    }

    // Validate input
    if (!feeType || typeof feeType !== "string" || feeType.trim() === "") {
      return res.status(400).json({ error: "Invalid fee type" });
    }

    if (paidFee === undefined || paidFee <= 0) {
      return res.status(400).json({ error: "Invalid paid fee amount" });
    }

    // Calculate the total paid fees for the specific fee type
    const totalPaidFeesForType = feeHistory.paidFees
      .filter((fee) => fee.feeType === feeType)
      .reduce((total, fee) => total + fee.amount, 0);

    // Get the original fee amount from fee details and apply any discounts
    let feeAmount = parseFloat(feeDetails[feeType]) || 0;
    if (feeType === "tuitionFee" && feeHistory.discount) {
      feeAmount -= (feeAmount * feeHistory.discount) / 100;
    }

    // Ensure the new payment does not exceed the total fee amount
    if (Number(paidFee) + totalPaidFeesForType > feeAmount) {
      return res
        .status(400)
        .json({ error: "Paid fee exceeds the total fee for this type" });
    }

    // Add the new paid fee to the paid fees array
    feeHistory.paidFees.push({
      feeType,
      amount: Number(paidFee),
      date: new Date(),
    });

    // Calculate the remaining fee after the new payment
    const newRemainingFee =
      feeAmount - (totalPaidFeesForType + Number(paidFee));

    // Update the remaining fees array, removing the old entry for this fee type
    feeHistory.remainingFees = feeHistory.remainingFees.filter(
      (fee) => fee.feeType !== feeType
    );

    // Add updated remaining fee if it is greater than 0
    if (newRemainingFee > 0) {
      feeHistory.remainingFees.push({
        feeType,
        amount: newRemainingFee,
        date: new Date(),
      });
    }

    // Ensure all fee types in feeDetails are included in remainingFees
    const feeTypes = Object.keys(feeDetails).filter(
      (key) =>
        feeDetails[key] &&
        key !== "_id" &&
        key !== "session" &&
        key !== "sclass"
    );

    feeTypes.forEach((type) => {
      const feeExists = feeHistory.remainingFees.some(
        (f) => f.feeType === type
      );
      const originalAmount = parseFloat(feeDetails[type]) || 0;

      if (!feeExists && originalAmount > 0) {
        feeHistory.remainingFees.push({
          feeType: type,
          amount: originalAmount,
          date: new Date(),
        });
      }
    });

    // Update total remainingFee based on all remaining fees
    feeHistory.remainingFee = feeHistory.remainingFees.reduce(
      (total, fee) => total + fee.amount,
      0
    );
    feeHistory.paidFee = feeHistory.paidFees.reduce(
      (total, fee) => total + fee.amount,
      0
    );

    // Save updated student data
    await student.save();

    return res
      .status(200)
      .json({ message: "Student fee updated successfully", student });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
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
    const student = await Student.findById(req.params.id)
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

    const studentSclassId =
      student.feeHistory[
        student.feeHistory.length - 1
      ].sclassName._id.toString();
    const studentSessionId = student.session?._id?.toString();

    // console.log(studentSclassId);

    if (!studentSclassId || !studentSessionId) {
      return res
        .status(400)
        .json({ message: "Invalid student class or session data." });
    }

    const studentFees = await Fee.find({
      sclass: studentSclassId,
      session: studentSessionId,
    })
      .populate("session")
      .populate("sclass")
      .exec();
    studentFees?.forEach((fee) => {
      const existingHistory = student.feeHistory?.find(
        (history) =>
          history.sclassName?._id.toString() === fee.sclass?._id.toString() &&
          history.session?._id.toString() === fee.session?._id.toString()
      );

      if (existingHistory) {
        // Update fields and merge fee arrays using helper functions
        Object.assign(existingHistory, {
          totalFee: fee.totalFee || existingHistory.totalFee,
          discountFee: fee.discountFee || existingHistory.discountFee,
          discount: fee.discount || existingHistory.discount,
          remainingFee: fee.remainingFee || existingHistory.remainingFee,
          paidFee: fee.paidFee || existingHistory.paidFee,
        });

        mergeFees(existingHistory.paidFees, fee.paidFees);
        mergeFees(existingHistory.remainingFees, fee.remainingFees, true);
      } else {
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
        });
      }
    });

    function mergeFees(targetFees, sourceFees, replace = false) {
      sourceFees?.forEach((fee) => {
        const existingFee = targetFees.find((f) => f.feeType === fee.feeType);
        if (existingFee) {
          existingFee.amount = replace
            ? fee.amount
            : existingFee.amount + fee.amount;
        } else {
          targetFees.push(fee);
        }
      });
    }

    student.password = undefined;
    return res.status(200).json(student);
  } catch (err) {
    console.error("Error in getStudentDetail:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
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

const updateStudentClass = async (req, res) => {
  try {
    const { sclassName } = req.body;
    const discount = 0; // Adjust the discount value as needed

    if (!sclassName) {
      return res.status(400).json({ message: "sclassName is required" });
    }

    // Fetch the student document by ID and populate related fields
    let student = await Student.findById(req.params.id)
      .populate("sclassName")
      .populate("session");

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the student's class
    student.sclassName = sclassName;
    console.log("Updated class name:", student.sclassName);

    // Check if the previous class fee is cleared
    const lastFeeHistory = student.feeHistory[student.feeHistory.length - 1];
    if (lastFeeHistory && lastFeeHistory.remainingFee !== 0) {
      return res
        .status(400)
        .json({ error: "Please submit the previous class fee" });
    }

    // Re-fetch the updated student with populated sclassName
    student = await student.populate("sclassName");

    // Fetch fee details based on the new class and session
    const feeDetails = await Fee.findOne({
      sclass: student.sclassName,
      session: student.session._id,
    });

    if (!feeDetails) {
      return res.status(404).json({ error: "Fee details not found" });
    }

    const feeValues = feeDetails.toObject();
    let totalFee = 0;
    const remainingFees = [];

    // Calculate fees and handle discount on tuition fee
    Object.keys(feeValues).forEach((key) => {
      if (
        key !== "_id" &&
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "__v" &&
        key !== "session" &&
        key !== "sclass"
      ) {
        let fee = parseFloat(feeValues[key]) || 0;

        // Apply discount to tuitionFee if applicable
        if (key === "tuitionFee") {
          const discountPercent = parseFloat(discount) || 0;
          const discountAmount = (fee * discountPercent) / 100;
          fee -= discountAmount; // Apply discount
          student.discountFee = discountAmount.toString();
        }

        if (fee > 0) {
          // Store only non-zero fees
          remainingFees.push({ feeType: key, amount: fee, date: new Date() });
          totalFee += fee; // Calculate total fee
        }
      }
    });

    // Calculate the remaining fee
    const remainingFee = totalFee;

    // Add the new fee history entry
    student.feeHistory.push({
      sclassName: student.sclassName,
      session: student.session,
      totalFee,
      discountFee: student.discountFee,
      remainingFee,
      paidFee: 0,
      remainingFees,
      year: new Date().getFullYear().toString(),
    });
    console.log(student);

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
