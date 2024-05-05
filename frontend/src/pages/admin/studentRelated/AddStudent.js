import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { underControl } from "../../../redux/userRelated/userSlice";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { CircularProgress } from "@mui/material";
import { PersonalInfo } from "./PersonalInfo";
import { EducationInfo } from "./EducationInfo";
import { AcademicDetail } from "./AcademicDetail";
import { RelationInfo } from "./RelationInfo";
import axios from "axios";

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const params = useParams();
  const { currentUser, status, response } = useSelector((state) => state.user);

  // State variables
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    cnic: "",
    dob: "",
    religion: "",
    mobileNumber: "",
    whatsAppNumber: "",
    program: "",
    board: "",
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
  });

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [stepper, setStepper] = useState(1);

  // Effect for getting all sclasses when currentUser ID changes
  useEffect(() => {
    dispatch(getAllSclasses(currentUser._id, "Sclass"));
  }, [currentUser._id, dispatch]);

  // Fields object for registerUser dispatch
  // Handler for form submission
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
          navigate("/Admin/students");
        }, 1000);
      }
    } catch (error) {
      console.log(error.response);
      setShowPopup(true);
      setLoader(false);
      setMessage(error?.response?.data?.error);
    }
  };

  // Effect for handling different status scenarios
  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate(-1);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, response, dispatch]);

  return (
    <>
      {/* <Stepper setStepper={setStepper} stepper={stepper} /> */}
      <div className="register-form">
        <form className="registerForm" onSubmit={submitHandler}>
          {stepper === 1 ? (
            <PersonalInfo
              setStepper={setStepper}
              formData={formData}
              setFormData={setFormData}
            />
          ) : stepper === 2 ? (
            <EducationInfo
              setStepper={setStepper}
              formData={formData}
              setFormData={setFormData}
            />
          ) : stepper === 3 ? (
            <RelationInfo
              setStepper={setStepper}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <AcademicDetail formData={formData} setFormData={setFormData} />
          )}
          {/* Additional input fields */}

          <div className="flex justify-between">
            {stepper === 4 && (
              <button
                className="registerButton"
                onClick={() => setStepper(stepper - 1)}
              >
                Previous Step
              </button>
            )}

            {stepper === 4 && (
              <button
                className="registerButton"
                type="submit"
                disabled={loader}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit"
                )}
              </button>
            )}
          </div>
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

export default AddStudent;
