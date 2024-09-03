// StudentTable.js
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import { Paper, Box } from "@mui/material";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Button from "@mui/material/Button";
import { Edit, Visibility } from "@mui/icons-material";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { GreenButton } from "../../../components/buttonStyles";

export const StudentsTable = ({ activeClass }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedStudentIds, setSelectedStudentIds] = React.useState([]);
  const { studentsList, loading, error, response } = useSelector(
    (state) => state.student
  );

  // const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllSclasses("Sclass"));
  }, [dispatch]);

  if (error) {
  }

  const handleViewStudent = (id) => {
    // Get the index of the selected student
    const currentIndex = studentsList.findIndex(
      (student) => student._id === id
    );

    // Create an array of the previous 10, current, and next 10 student IDs
    const selectedIds = studentsList
      .slice(Math.max(currentIndex - 10, 0), currentIndex + 11)
      .map((student) => student._id);

    // Set the selected student IDs state
    setSelectedStudentIds(selectedIds);

    // Navigate to the StudentDetail component with the array of IDs
    navigate(`/Admin/students/student/${id}`, { state: { selectedIds } });
  };

  const filterStudents = (students) => {
    if (activeClass === "All") {
      return students;
    }
    return students.filter(
      (student) => student.sclassName.sclassName === activeClass
    );
  };

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "fatherName", label: "Father Name", minWidth: 170 },
    { id: "enrollmentNo", label: "Enrollment No", minWidth: 100 },
    { id: "sclassName", label: "Class", minWidth: 170 },
    { id: "mobileNumber", label: "Mobile No", minWidth: 170 },
    { id: "remainingFee", label: "Remaining Fee", minWidth: 170 },
    { id: "actions", label: "Actions", minWidth: 170 },
  ];
  const studentRows =
    studentsList &&
    studentsList.length > 0 &&
    filterStudents(studentsList).map((student) => {
      return {
        name: student.name,
        fatherName: student.fatherName,
        enrollmentNo: student.enrollmentNo,
        sclassName: student.sclassName.sclassName,
        remainingFee:
          student.feeHistory.find(
            (val) => val.sclassName === student.sclassName._id
          ).remainingFee || 0,
        id: student._id,
        mobileNumber: student.mobileNumber,
        actions: (
          <>
            <Button
              width="10px"
              padding="0px"
              onClick={() => handleViewStudent(student._id)}
            >
              <Visibility />
            </Button>
            <Button
              width="10px"
              padding="0px"
              onClick={() => navigate(`/Admin/Updatestudent/${student._id}`)}
            >
              <Edit />
            </Button>
          </>
        ),
      };
    });

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Student",
      action: () => navigate("/Admin/addstudents"),
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <GreenButton
                variant="contained"
                onClick={() => navigate("/Admin/addstudents")}
              >
                Add Students
              </GreenButton>
              <SpeedDialTemplate actions={actions} />
            </Box>
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              {Array.isArray(studentsList) && studentsList.length > 0 && (
                <TableTemplate
                  columns={studentColumns}
                  rows={studentRows}
                  showAction={false}
                  header="Class"
                />
              )}
              <SpeedDialTemplate actions={actions} />
            </Paper>
          )}
        </>
      )}
    </>
  );
};
