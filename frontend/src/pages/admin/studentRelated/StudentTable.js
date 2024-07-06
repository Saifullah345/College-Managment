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

export const StudentsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList, loading, error, response } = useSelector(
    (state) => state.student
  );

  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
  }, [currentUser._id, dispatch]);

  useEffect(() => {
    dispatch(getAllSclasses("Sclass"));
  }, [dispatch]);

  if (error) {
    console.log(error);
  }

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "fatherName", label: "Father Name", minWidth: 170 },
    { id: "enrollmentNo", label: "Enrollment Number", minWidth: 100 },
    { id: "sclassName", label: "Class", minWidth: 170 },
    { id: "mobileNumber", label: "Mobile Number", minWidth: 170 },
    { id: "actions", label: "Actions", minWidth: 170 },
  ];

  const studentRows =
    studentsList &&
    studentsList.length > 0 &&
    studentsList.map((student) => {
      return {
        name: student.name,
        fatherName: student.fatherName,
        enrollmentNo: student.enrollmentNo,
        sclassName: student.sclassName.sclassName,
        id: student._id,
        mobileNumber: student.mobileNumber,
        actions: (
          <>
            <Button
              onClick={() => navigate(`/Admin/students/student/${student._id}`)}
            >
              <Visibility />
            </Button>
            <Button
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
