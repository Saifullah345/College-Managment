import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../../../../components/Popup";
import AddStudentForm from "./AddStudent";
import { Box } from "@mui/material";

export const AddStudent = ({ setActive }) => {
  const [viewProgram, setViewProgram] = useState([]);
  const [viewSession, setViewSession] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    cnic: "",
    enrollmentNo: "",
    dob: "",
    religion: "",
    mobileNumber: "",
    whatsAppNumber: "",
    program: "",
    board: "",
    gender: "",
    serialNumber: "",
    rollNumber: "",
    provinces: "",
    yearOfPassing: "",
    district: "",
    tehsil: "",
    postalAddress: "",
    permanentAddress: "",
    nameOfReference: "",
    numberOfReference: "",
    relationWithReference: "",
    otherDetailWithReference: "",
    studentProfile: "",
    idCardFront: "",
    idCardBack: "",
    MetricDMC: "",
    session: "",
    sclassName: "",
    discount: "",
  });
  console.log(formData);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);
    console.log(formData);
    try {
      const formDataElement = new FormData();
      for (const key in formData) {
        formDataElement.append(key, formData[key]);
      }

      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/StudentReg`,
        formDataElement
      );
      if (result.data) {
        setLoader(false);
        console.log(result);
        sessionStorage.setItem("loader", true);
        setShowPopup(true);
        setMessage("Done Successfully");
        setTimeout(() => {
          setActive("List of All Students");
        }, 1000);
      }
    } catch (error) {
      console.log(error.response);
      setShowPopup(true);
      setLoader(false);
      setMessage(error?.response?.data?.error);
    }
  };

  const ViewProgram = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allProgram`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        setViewProgram(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ViewSession = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allSession`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (result.data) {
        setViewSession(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ViewProgram();
    ViewSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("loader")]);

  return (
    <>
      <div className="register-form">
        <form className="registerForm" onSubmit={submitHandler}>
          {show ? (
            <AddStudentForm
              formData={formData}
              setFormData={setFormData}
              loader={loader}
            />
          ) : (
            <>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignContent={"center"}
                width={"50%"}
                gap={"15px"}
                margin={"auto"}
              >
                <div className="formGroup">
                  <label>Program *</label>
                  <select
                    className="registerInput"
                    value={formData.program}
                    onChange={(e) => {
                      setFormData((prevState) => ({
                        ...prevState,
                        program: e.target.value,
                      }));
                    }}
                    required
                  >
                    <option value="">Select Program</option>
                    {viewProgram.map((val) => (
                      <option key={val.program} value={val.program}>
                        {val.program}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formGroup">
                  <label>Session *</label>
                  <select
                    className="registerInput"
                    value={formData.session}
                    onChange={(e) => {
                      setFormData((prevState) => ({
                        ...prevState,
                        session: e.target.value,
                      }));
                    }}
                    required
                  >
                    <option value="">Select Session</option>
                    {viewSession.map((val) => (
                      <option key={val._id} value={val._id}>
                        {val.session}
                      </option>
                    ))}

                    {/* Add more options as needed */}
                  </select>
                </div>
                <button
                  className="registerButton"
                  onClick={() => setShow(true)}
                >
                  Submit
                </button>
              </Box>
            </>
          )}
        </form>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};
