const Sclass = require("../models/sclassSchema.js");
const Student = require("../models/studentSchema.js");
const Subject = require("../models/subjectSchema.js");
const Teacher = require("../models/teacherSchema.js");

const sclassCreate = async (req, res) => {
  try {
    const sclass = new Sclass({
      sclassName: req.body.sclassName,
      sclassNameUrdu: req.body.sclassNameUrdu,
      school: req.body.adminID,
    });

    const existingSclassByName = await Sclass.findOne({
      sclassName: req.body.sclassName,
      school: req.body.adminID,
      sclassNameUrdu: req.body.sclassNameUrdu,
    });

    if (existingSclassByName) {
      res.send({ message: "Sorry this class name already exists" });
    } else {
      const result = await sclass.save();
      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log("Error", err);
  }
};

const sclassList = async (req, res) => {
  try {
    // Fetch all sclasses
    let sclasses = await Sclass.find();
    const totalClasses = sclasses.length;

    // If no sclasses found, return an appropriate message
    if (totalClasses === 0) {
      return res.send({ message: "No sclasses found" });
    }

    // Aggregate student data by class
    const classData = await Student.aggregate([
      { $match: { sclassName: { $in: sclasses.map((sclass) => sclass._id) } } },
      {
        $group: {
          _id: "$sclassName",
          totalStudents: { $sum: 1 },
          totalFemale: {
            $sum: { $cond: [{ $eq: ["$gender", "female"] }, 1, 0] },
          },
          totalMale: {
            $sum: { $cond: [{ $eq: ["$gender", "male"] }, 1, 0] },
          },
        },
      },
    ]);

    // Calculate total students across all classes
    const totalStudentsAcrossClasses = classData.reduce(
      (sum, item) => sum + item.totalStudents,
      0
    );

    // Add student data to each sclass
    const detailedClassData = sclasses.map((sclass) => {
      const data = classData.find(
        (item) => item._id.toString() === sclass._id.toString()
      ) || {
        totalStudents: 0,
        totalFemale: 0,
        totalMale: 0,
      };

      // Avoid division by zero
      const averageFemale =
        totalStudentsAcrossClasses > 0
          ? (data.totalFemale / totalStudentsAcrossClasses) * 100
          : 0;
      const averageMale =
        totalStudentsAcrossClasses > 0
          ? (data.totalMale / totalStudentsAcrossClasses) * 100
          : 0;

      return {
        ...sclass.toObject(),
        totalStudents: Math.round(data.totalStudents),
        averageFemale: Math.round(averageFemale),
        averageMale: Math.round(averageMale),
      };
    });

    // Send the response
    res.send(detailedClassData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSclassDetail = async (req, res) => {
  try {
    let sclass = await Sclass.findById(req.params.id);
    if (sclass) {
      sclass = await sclass.populate("school", "schoolName");
      res.send(sclass);
    } else {
      res.send({ message: "No class found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSclassStudents = async (req, res) => {
  try {
    let students = await Student.find({ sclassName: req.params.id });
    if (students.length > 0) {
      let modifiedStudents = students.map((student) => {
        return { ...student._doc, password: undefined };
      });
      res.send(modifiedStudents);
    } else {
      res.send({ message: "No students found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteSclass = async (req, res) => {
  try {
    const deletedClass = await Sclass.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.send({ message: "Class not found" });
    }
    const deletedStudents = await Student.deleteMany({
      sclassName: req.params.id,
    });
    const deletedSubjects = await Subject.deleteMany({
      sclassName: req.params.id,
    });
    const deletedTeachers = await Teacher.deleteMany({
      teachSclass: req.params.id,
    });
    res.send(deletedClass);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSclasses = async (req, res) => {
  try {
    const deletedClasses = await Sclass.deleteMany({ school: req.params.id });
    if (deletedClasses.deletedCount === 0) {
      return res.send({ message: "No classes found to delete" });
    }
    const deletedStudents = await Student.deleteMany({ school: req.params.id });
    const deletedSubjects = await Subject.deleteMany({ school: req.params.id });
    const deletedTeachers = await Teacher.deleteMany({ school: req.params.id });
    res.send(deletedClasses);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  sclassCreate,
  sclassList,
  deleteSclass,
  deleteSclasses,
  getSclassDetail,
  getSclassStudents,
};
