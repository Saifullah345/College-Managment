import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import Popup from "../../../../components/Popup";

const FeeCollection = () => {
  const [student, setStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showStudent, setShowStudent] = useState(false);
  const [fee, setFee] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const ViewAllStudent = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/Students`
      );
      setStudents(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateFee = async () => {
    setLoading(true);
    console.log("Update");
    console.log(filteredStudents[0].remainingFee - fee);

    try {
      const studentId = filteredStudents[0]._id;
      console.log(studentId);
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/Student/${studentId}`,
        {
          paidFee: fee,
          remainingFee: filteredStudents[0].remainingFee - fee,
        }
      );

      console.log(result);
      if (result.data) {
        setLoading(false);
        console.log(result);
        setShowPopup(true);
        setMessage("Done Successfully");
        ViewAllStudent();
      }
    } catch (error) {
      setShowPopup(true);
      setLoading(false);
      setMessage(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    ViewAllStudent();
  }, []);

  useEffect(() => {
    setFilteredStudents(
      students.filter((studentItem) =>
        studentItem.name.toLowerCase().includes(student.toLowerCase())
      )
    );
  }, [student, students]);

  return (
    <div>
      <Box width={"50%"}>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter Student..."
          value={student}
          onChange={(event) => setStudent(event.target.value)}
          required
        />
        {!showStudent && student && (
          <ul className="dropdown">
            {filteredStudents.map((studentItem) => (
              <li
                key={studentItem.id}
                onClick={() => {
                  setShowStudent(true);
                }}
                className="dropdown-item"
              >
                {studentItem.name}
              </li>
            ))}
          </ul>
        )}
      </Box>
      {showStudent && (
        <Box marginTop={"10px"}>
          <Typography variant="h4" textAlign={"center"}>
            Fee Collection
          </Typography>
          <Divider margin={"10px"} padding={"10px"} />
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              marginTop={"15px"}
              className="flex flex-col"
              justifyContent={"center"}
              alignItems={"center"}
              border={"1px solid black"}
              borderRadius={"10px"}
              width={"fit-content"}
              padding={"10px"}
            >
              <Box className="flex" width="100%" justifyContent="space-between">
                <Typography align="left" textAlign="left">
                  Name
                </Typography>
                <Typography fontWeight={600}>
                  {filteredStudents[0]?.name}
                </Typography>
              </Box>
              <Box className="flex" width="100%" justifyContent="space-between">
                <Typography align="left" textAlign="left">
                  Class
                </Typography>
                <Typography fontWeight={600}>
                  {filteredStudents[0]?.sclassName.sclassName}
                </Typography>
              </Box>
              <Box className="flex" width="100%" justifyContent="space-between">
                <Typography align="left" textAlign="left">
                  Session
                </Typography>
                <Typography fontWeight={600}>
                  {filteredStudents[0]?.session.session}
                </Typography>
              </Box>
              <Box className="flex" width="100%" justifyContent="space-between">
                <Typography align="left" textAlign="left">
                  Discount Fee
                </Typography>
                <Typography fontWeight={600}>
                  {filteredStudents[0]?.discountFee}
                </Typography>
              </Box>
              <Box className="flex" width="100%" justifyContent="space-between">
                <Typography align="left" textAlign="left">
                  Paid Fee
                </Typography>
                <Typography fontWeight={600}>
                  {filteredStudents[0]?.paidFee}
                </Typography>
              </Box>
              <Box className="flex" width="100%" justifyContent="space-between">
                <Typography align="left" textAlign="left">
                  Remaining Fee
                </Typography>
                <Typography fontWeight={600}>
                  {filteredStudents[0]?.remainingFee}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {showStudent && (
        <>
          <Box width={"50%"} marginTop={"10px"}>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter Deposit Fee..."
              value={fee}
              onChange={(event) => setFee(event.target.value)}
              required
            />
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              UpdateFee();
            }}
            sx={{ mt: 2, width: "50%" }}
            disabled={filteredStudents[0].remainingFee === "0"}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default FeeCollection;
