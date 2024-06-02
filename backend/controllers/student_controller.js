const bcrypt = require("bcrypt");
const Student = require("../models/studentSchema.js");
const Subject = require("../models/subjectSchema.js");
const driveHandlers = require("../utilits/drive_handlers.js");
const multer = require("multer");

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
      // console.log(await driveHandlers.uploadImage(req.files["idCardFront"][0]));
      const student = new Student(req.body);
      student.idCardFront = await driveHandlers.uploadImage(
        req.files["idCardFront"][0]
      ).url;
      student.idCardBack = await driveHandlers.uploadImage(
        req.files["idCardBack"][0]
      ).url;
      student.MetricDMC = await driveHandlers.uploadImage(
        req.files["MetricDMC"][0]
      ).url;
      student.studentProfile = await driveHandlers.uploadImage(
        req.files["studentProfile"][0]
      ).url;
      await student.save();
      return res.status(201).send("Student data saved successfully");
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
    let students = await Student.find().populate("sclassName");
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
      .populate("school", "schoolName")
      .populate("sclassName", "sclassName")
      .populate("examResult.subName", "subName")
      .populate("attendance.subName", "subName sessions");
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

const updateStudent = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      res.body.password = await bcrypt.hash(res.body.password, salt);
    }
    let result = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    result.password = undefined;
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateStudentClass = async (req, res) => {
  try {
    const { sclassName } = req.body;

    // Ensure sclassName is provided in the request body
    if (!sclassName) {
      return res.status(400).json({ message: "sclassName is required" });
    }

    // Update only the sclassName field
    let result = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: { sclassName } },
      { new: true }
    ).populate("sclassName");
    // Exclude password from the response
    result.password = undefined;

    return res.send(result);
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
