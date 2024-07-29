const bcrypt = require("bcrypt");
const Student = require("../models/studentSchema.js");
const Subject = require("../models/subjectSchema.js");
const driveHandlers = require("../utilits/drive_handlers.js");
const multer = require("multer");
const Fee = require("../models/feeSchema");

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
          year: student.year, // Maintain the year field if necessary
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

    // Find the student by ID
    let student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Find the fee history for the specific class
    let feeHistory = student.feeHistory.find(
      (history) => history.sclassName.toString() === classId
    );

    if (!feeHistory) {
      return res.status(404).json({ error: "Class fee history not found" });
    }

    // Update the paid fee and remaining fee for the specified class
    if (paidFee !== undefined) {
      feeHistory.paidFee = paidFee;
    }
    if (remainingFee !== undefined) {
      feeHistory.remainingFee = remainingFee;
    }

    // Ensure feeType is valid and not empty before setting it in the map
    if (feeType !== undefined && feeType.trim() !== "") {
      feeHistory.paidFees.set(feeType, true);
    } else {
      return res.status(400).json({ error: "Invalid fee type" });
    }

    // Save the student document with updated fee history
    await student.save();

    return res.status(200).json({
      code: 200,
      message: "Fee details updated successfully",
      updatedFeeHistory: feeHistory, // Return the updated fee history for verification
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
    let students = await Student.find()
      .populate("sclassName")
      .populate("session");
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
      });
    if (student) {
      student.password = undefined;
      res.send(student);
    } else {
      res.send({ message: "No student found" });
    }
  } catch (err) {
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

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update the sclassName field
    student.sclassName = sclassName;

    // Find the fee details for the new class and session
    const feeDetails = await Fee.findOne({
      sclass: student.sclassName,
      session: student.session._id,
    });

    if (!feeDetails) {
      return res.status(404).json({ message: "Fee details not found" });
    }

    // Calculate the fee details
    const tuitionFee = parseFloat(feeDetails.tuitionFee) || 0;
    const discountPercent = parseFloat(student.discount) || 0;
    const discountAmount = (tuitionFee * discountPercent) / 100;
    const remainingFee = tuitionFee - discountAmount;

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
