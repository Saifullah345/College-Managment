const router = require("express").Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const {
  adminRegister,
  adminLogIn,
  getAdminDetail,
} = require("../controllers/admin-controller.js");
const {
  boardCreate,
  allBoard,
  sessionCreate,
  allSession,
  deleteBoard,
  deleteSession,
} = require("../controllers/board-controller.js");

const {
  sclassCreate,
  sclassList,
  deleteSclass,
  deleteSclasses,
  getSclassDetail,
  getSclassStudents,
} = require("../controllers/class-controller.js");
const {
  complainCreate,
  complainList,
} = require("../controllers/complain-controller.js");
const {
  districtCreate,
  allDistrict,
} = require("../controllers/district-controller.js");
const {
  AddFee,
  getAllFee,
  EditFee,
  getFeeDetails,
} = require("../controllers/fee-controller.js");
const {
  AddInstitute,
  getAllInstitute,
  updateInstitute,
} = require("../controllers/institute-controller.js");

const {
  noticeCreate,
  noticeList,
  deleteNotices,
  deleteNotice,
  updateNotice,
} = require("../controllers/notice-controller.js");
const {
  programCreate,
  allPrograms,
  deleteProgram,
} = require("../controllers/program-controller.js");
const {
  provincesCreate,
  allProvinces,
} = require("../controllers/province-controller.js");
const {
  rolesCreate,
  allRoles,
  deleteRoles,
} = require("../controllers/roles-controller.js");
const {
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
  clearAllStudentsAttendanceBySubject,
  clearAllStudentsAttendance,
  removeStudentAttendanceBySubject,
  removeStudentAttendance,
  updateStudentClass,
  updateStudentFee,
} = require("../controllers/student_controller.js");
const {
  subjectCreate,
  classSubjects,
  deleteSubjectsByClass,
  getSubjectDetail,
  deleteSubject,
  freeSubjectList,
  allSubjects,
  deleteSubjects,
} = require("../controllers/subject-controller.js");
const {
  teacherRegister,
  teacherLogIn,
  getTeachers,
  getTeacherDetail,
  deleteTeachers,
  deleteTeachersByClass,
  deleteTeacher,
  updateTeacherSubject,
  teacherAttendance,
} = require("../controllers/teacher-controller.js");
const {
  tehsilCreate,
  allTehsil,
  deleteTehsil,
} = require("../controllers/tehsil-controller.js");
const {
  createUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/user-controller.js");

// Admin
router.post("/AdminReg", adminRegister);
router.post("/AdminLogin", adminLogIn);

router.get("/Admin/:id", getAdminDetail);
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post("/StudentReg", studentRegister);
router.post("/StudentLogin", studentLogIn);

router.get("/Students", getStudents);
router.get("/Student/:id", getStudentDetail);

router.delete("/Students/:id", deleteStudents);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);

router.put("/Student/:id", updateStudent);
router.put("/studentClass/:id", updateStudentClass);
router.put("/studentFee/:id", updateStudentFee);

router.put("/UpdateExamResult/:id", updateExamResult);

router.put("/StudentAttendance/:id", studentAttendance);

router.put(
  "/RemoveAllStudentsSubAtten/:id",
  clearAllStudentsAttendanceBySubject
);
router.put("/RemoveAllStudentsAtten/:id", clearAllStudentsAttendance);

router.put("/RemoveStudentSubAtten/:id", removeStudentAttendanceBySubject);
router.put("/RemoveStudentAtten/:id", removeStudentAttendance);

// Teacher

router.post("/TeacherReg", teacherRegister);
router.post("/TeacherLogin", teacherLogIn);

router.get("/Teachers/:id", getTeachers);
router.get("/Teacher/:id", getTeacherDetail);

router.delete("/Teachers/:id", deleteTeachers);
router.delete("/TeachersClass/:id", deleteTeachersByClass);
router.delete("/Teacher/:id", deleteTeacher);

router.put("/TeacherSubject", updateTeacherSubject);

router.post("/TeacherAttendance/:id", teacherAttendance);

// Notice

router.post("/NoticeCreate", noticeCreate);

router.get("/NoticeList/:id", noticeList);

router.delete("/Notices/:id", deleteNotices);
router.delete("/Notice/:id", deleteNotice);

router.put("/Notice/:id", updateNotice);

// Complain

router.post("/ComplainCreate", complainCreate);

router.get("/ComplainList/:id", complainList);

// Sclass

router.post("/SclassCreate", sclassCreate);

router.get("/SclassList", sclassList);
router.get("/Sclass/:id", getSclassDetail);

router.get("/Sclass/Students/:id", getSclassStudents);

router.delete("/Sclasses/:id", deleteSclasses);
router.delete("/Sclass/:id", deleteSclass);

// Subject

router.post("/SubjectCreate", subjectCreate);

router.get("/AllSubjects/:id", allSubjects);
router.get("/ClassSubjects/:id", classSubjects);
router.get("/FreeSubjectList/:id", freeSubjectList);
router.get("/Subject/:id", getSubjectDetail);

router.delete("/Subject/:id", deleteSubject);
router.delete("/Subjects/:id", deleteSubjects);
router.delete("/SubjectsClass/:id", deleteSubjectsByClass);

//General Setting
router.post("/provincesCreate", provincesCreate);
router.get("/allProvinces", allProvinces);
router.post("/districtCreate", districtCreate);
router.get("/allDistrict", allDistrict);
//
router.post("/tehsilCreate", tehsilCreate);
router.get("/allTehsil", allTehsil);
router.delete("/deleteTehsil/:id", deleteTehsil);
//
router.get("/allBoard", allBoard);
router.post("/boardCreate", boardCreate);
router.delete("/deleteBoard/:id", deleteBoard);
//
router.post("/sessionCreate", sessionCreate);
router.get("/allSession", allSession);
router.delete("/deleteSession/:id", deleteSession);
//
router.post("/programCreate", programCreate);
router.get("/allProgram", allPrograms);
router.delete("/deleteProgram/:id", deleteProgram);
//
router.post("/roleCreate", rolesCreate);
router.get("/allRoles", allRoles);
router.delete("/deleteRole/:id", deleteRoles);
//
router.post("/userCreate", createUser);
router.get("/allUser", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);

router.post("/addFee", AddFee);
router.put("/editFee/:id", EditFee);
router.get("/allFee/:id", getAllFee);
router.get("/fee/:id", getFeeDetails);

router.post("/addInstitute", AddInstitute);
router.get("/allInstitute", getAllInstitute);
router.post("/updateInstitute/:id", updateInstitute);

module.exports = router;
