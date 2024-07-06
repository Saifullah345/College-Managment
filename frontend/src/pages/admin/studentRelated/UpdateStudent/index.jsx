import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../../../../components/Popup";
import { useNavigate, useParams } from "react-router-dom";
import UpdateStudentForm from "./UpdateStudent";

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
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

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

  useEffect(() => {
    viewStudentDetail();
  }, [id]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="register-form">
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
