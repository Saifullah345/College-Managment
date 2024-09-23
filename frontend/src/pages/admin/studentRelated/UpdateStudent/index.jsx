import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../../../../components/Popup";
import { useNavigate, useParams } from "react-router-dom";
import UpdateStudentForm from "./UpdateStudent";
import { Box } from "@mui/material";

export const UpdateStudent = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
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
  const [admissionStatus, setAdmissionStatus] = useState("");

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  const viewStudentDetail = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/Student/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.status === 200) {
        console.log(result);
        setFormData(result.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/Student/${id}`, // Change POST to PUT for updating
        formData
      );
      if (result.data) {
        setLoader(false);
        sessionStorage.setItem("loader", true);
        setShowPopup(true);
        setMessage("Done Successfully");
        setTimeout(() => {
          navigate("/Admin/students");
        }, 1000);
      }
    } catch (error) {
      console.error(error.response);
      setShowPopup(true);
      setLoader(false);
      setMessage(error?.response?.data?.error);
    }
  };
  const Update = async () => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/Student/${id}`,
        {
          admissionStatus,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(result);
      if (result.data) {
        setShowPopup(true);
        sessionStorage.setItem("loader", !sessionStorage.getItem("loader"));
        setMessage("Done Successfully");
        setLoading(true);
        setAdmissionStatus("");
        viewStudentDetail();
      }
    } catch (error) {
      setShowPopup(true);
      setMessage(error?.response?.data?.error);
      setAdmissionStatus("");
    }
  };
  useEffect(() => {
    viewStudentDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (admissionStatus !== "") Update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admissionStatus]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="register-form">
          <Box width={"100%"} justifyContent={"end"} display={"flex"}>
            <Box
              justifyContent={"end"}
              display={"flex"}
              flexDirection={"column"}
              border={"1px solid #ccc"}
              borderRadius={"10px"}
              padding={3}
              boxShadow={1}
              marginTop={"20px"}
            >
              <Box
                display={"flex"}
                gap={"20px"}
                justifyContent={"space-between"}
              >
                <h4>Admission Status</h4>
                <h4 style={{ color: "red", textTransform: "capitalize" }}>
                  {formData.admissionStatus}
                </h4>
              </Box>
              <div className="formGroup">
                <select
                  defaultValue={formData.admissionStatus}
                  className="registerInput"
                  value={admissionStatus}
                  onChange={(e) => {
                    setAdmissionStatus(e.target.value);
                  }}
                  required
                >
                  <option value="">Select Admission Status</option>
                  <option value="pending">Pending</option>
                  <option value="continue">Continue</option>
                  <option value="dropout">Dropout</option>
                </select>
              </div>
            </Box>
          </Box>
          <form className="registerForm" onSubmit={submitHandler}>
            <UpdateStudentForm
              formData={formData}
              setFormData={setFormData}
              loader={loader}
            />
          </form>
        </div>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};
