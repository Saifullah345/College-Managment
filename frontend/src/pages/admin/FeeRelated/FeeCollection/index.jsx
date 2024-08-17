/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import Popup from "../../../../components/Popup";
import PrintButton from "./printButton";
import FeeSlip from "./feeSlip";

export const initialFeeState = {
  admissionFee: "",
  tuitionFee: "",
  cardFee: "",
  libraryFee: "",
  examinationFee: "",
  welfareFee: "",
  hospitalFee: "",
  enrollmentFee: "",
  verificationFee: "",
  specialFee: "",
};

const FeeCollection = () => {
  const [student, setStudent] = useState(
    localStorage.getItem("studentName") || ""
  );
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(
    localStorage.getItem("classID") || ""
  );
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showStudent, setShowStudent] = useState(false);
  const [fee, setFee] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const contentRef = useRef();
  const [viewFee, setViewFee] = useState([]);
  const [viewClass, setViewClass] = useState([]);
  const [selectedFeeType, setSelectedFeeType] = useState(
    localStorage.getItem("feeType") || ""
  );

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

    try {
      const studentId = filteredStudents[0]._id;
      const existingFee = filteredStudents[0]?.feeHistory?.find(
        (val) => val.sclassName === formData
      );

      // Check if the fee type has already been paid
      if (
        existingFee &&
        existingFee.paidFees &&
        existingFee.paidFees[selectedFeeType]
      ) {
        setShowPopup(true);
        setLoading(false);
        setMessage("Fee already paid for the selected fee type.");
        return;
      }
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/studentFee/${studentId}`,
        {
          paidFee: fee,
          remainingFee:
            filteredStudents[0]?.feeHistory?.find(
              (val) => val.sclassName === formData
            )?.remainingFee - fee || 0,
          classId: formData,
          feeType: selectedFeeType,
        }
      );

      if (result.data) {
        setLoading(false);
        setShowPopup(true);
        setMessage("Done Successfully");
        setFee("");
        setSelectedFeeType("");
        ViewAllStudent();
      }
    } catch (error) {
      setShowPopup(true);
      setLoading(false);
      setMessage(error?.response?.data?.error);
    }
  };

  const ViewFees = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allFee/664852fb9a9731f208836537`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        setViewFee(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ViewClass = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/SclassList`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        setViewClass(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ViewFees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("loader")]);

  useEffect(() => {
    ViewAllStudent();
    ViewClass();
  }, []);
  const getSelectedFeeDetails = () => {
    const fee = viewFee.find((val) => val.sclass._id === formData);
    return fee ? (fee[selectedFeeType] === "" ? 0 : fee[selectedFeeType]) : 0;
  };

  useEffect(() => {
    if (student && formData) {
      setFilteredStudents(
        students?.filter(
          (studentItem) =>
            studentItem.name.toLowerCase().includes(student.toLowerCase()) &&
            (!formData || studentItem.sclassName._id === formData)
        )
      );
    }
  }, [student, students, formData]);

  useEffect(() => {
    if (localStorage.getItem("classID")) {
      setFormData(localStorage.getItem("classID"));
    } else if (localStorage.getItem("feeType")) {
      setSelectedFeeType(localStorage.getItem("feeType"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("classID") || localStorage.getItem("feeType")]);
  useEffect(() => {
    if (localStorage.getItem("studentName")) {
      setStudent(localStorage.getItem("studentName"));
      setShowStudent(true);
    }
  }, [localStorage.getItem("studentName")]);

  return (
    <div>
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"50%"}
        justifyContent={"space-between"}
        gap={"10px"}
      >
        <div className="formGroup">
          <select
            className="registerInput"
            value={formData}
            onChange={(e) => {
              setFormData(e.target.value);
            }}
          >
            <option value="">Select Class</option>
            {viewClass?.map((val) => (
              <option key={val?._id} value={val?._id}>
                {val?.sclassName}
              </option>
            ))}
          </select>
        </div>
        <div className="formGroup">
          <select
            className="registerInput"
            value={selectedFeeType}
            onChange={(e) => {
              setSelectedFeeType(e.target.value);
            }}
          >
            <option value="">Select Fee Type</option>
            {Object.keys(initialFeeState).map((feeType) => (
              <option key={feeType} value={feeType}>
                {feeType}
              </option>
            ))}
          </select>
        </div>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter Student..."
          value={student}
          onChange={(event) => setStudent(event.target.value)}
          required
        />
      </Box>
      <Box width={"50%"}>
        {!showStudent && student !== "" && (
          <ul className="dropdown">
            {filteredStudents?.map((studentItem) => (
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
                  {filteredStudents[0]?.sclassName?.sclassName}
                </Typography>
              </Box>
              {selectedFeeType && (
                <Box
                  className="flex"
                  width="100%"
                  justifyContent="space-between"
                >
                  <Typography
                    align="left"
                    textTransform="capitalize"
                    textAlign="left"
                  >
                    {selectedFeeType}
                  </Typography>
                  <Typography fontWeight={600}>
                    {getSelectedFeeDetails()}
                  </Typography>
                </Box>
              )}
              <Box className="flex" width="100%" justifyContent="space-between">
                <Typography align="left" textAlign="left">
                  Session
                </Typography>
                <Typography fontWeight={600}>
                  {filteredStudents[0]?.session?.session}
                </Typography>
              </Box>
              <Box className="flex" width="100%" justifyContent="space-between">
                <Typography align="left" textAlign="left">
                  Discount Fee
                </Typography>
                <Typography fontWeight={600}>
                  {
                    filteredStudents[0]?.feeHistory?.find(
                      (val) => val.sclassName === formData
                    )?.discountFee
                  }
                </Typography>
              </Box>
              <Box className="flex" width="100%" justifyContent="space-between">
                <Typography align="left" textAlign="left">
                  Paid Fee
                </Typography>
                <Typography fontWeight={600}>
                  {
                    filteredStudents[0]?.feeHistory?.find(
                      (val) => val.sclassName === formData
                    )?.paidFee
                  }
                </Typography>
              </Box>
              <Box className="flex" width="100%" justifyContent="space-between">
                <Typography align="left" textAlign="left">
                  Remaining Fee
                </Typography>
                <Typography fontWeight={600}>
                  {filteredStudents[0]?.feeHistory?.find(
                    (val) => val.sclassName === formData
                  )?.remainingFee || 0}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {filteredStudents[0]?.feeHistory?.find(
        (val) => val.sclassName === formData
      )?.remainingFee !== 0 &&
        filteredStudents[0]?.feeHistory?.find(
          (val) => val.sclassName === formData
        )?.remainingFee !== undefined &&
        showStudent && (
          <>
            <Box
              width={"50%"}
              display={"flex"}
              flexDirection={"column"}
              gap={"10px"}
              marginTop={"10px"}
            >
              <input
                className="registerInput"
                type="text"
                placeholder="Enter Deposit Fee..."
                value={fee}
                onChange={(event) => setFee(event.target.value)}
                required
              />
              <input
                className="registerInput"
                type="text"
                placeholder="Remaining Fee"
                value={
                  filteredStudents[0]?.remainingFee - fee > 0
                    ? filteredStudents[0]?.remainingFee - fee
                    : 0
                }
                disabled
              />
              <Button
                type="button"
                variant="contained"
                className="registerButton"
                onClick={UpdateFee}
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>

              <PrintButton contentRef={contentRef} />
            </Box>
            <Box display={"none"}>
              <FeeSlip
                ref={contentRef}
                data={filteredStudents}
                viewFee={viewFee}
              />
            </Box>
          </>
        )}
      <Popup
        message={message}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </div>
  );
};

export default FeeCollection;
