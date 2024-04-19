import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
// import { Stepper } from "./Stepper";
// import { PersonalInfo } from "./PersonalInfo";
// import { EducationInfo } from "./EducationInfo";

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser, status, response } = useSelector((state) => state.user);
  // const { sclassesList } = useSelector((state) => state.sclass);

  // State variables
  const [name, setName] = useState("");
  // const [rollNum, setRollNum] = useState("");
  // const [password, setPassword] = useState("");
  // const [provinces, setProvinces] = useState("");
  // const [address, setAddress] = useState("");
  // const [className, setClassName] = useState("");
  const [sclassName, setSclassName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  // const [cnic, setCnic] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [religion, setReligion] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [qualification, setQualification] = useState("");
  const [concernedBoard, setConcernedBoard] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  // const [permanentAddress, setPermanentAddress] = useState("");
  // const [admissionDate, setAdmissionDate] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [studentPhoto, setStudentPhoto] = useState(null);
  const [stepper, setStepper] = useState(1);
  const [educationalDocument, setEducationalDocument] = useState(null);
  const [MatricResult, setMatricResult] = useState(""); // State variable for Matric result
  const [fscResult, setFscResult] = useState(""); // State variable for FSC result
  const [fscDocument, setFscDocument] = useState(null); // State variable for FSC document
  const [MatricDocument, setMatricDocument] = useState(null); // State variable for Matric document
  // const [name, setName] = useState('');
  // const [fatherName, setFatherName] = useState('');
  const [cnic, setCnic] = useState("");
  // const [citizenship, setCitizenship] = useState('');
  // const [dob, setDob] = useState('');
  // const [religion, setReligion] = useState('');
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [fullName, setFullName] = useState("");

  // Handler for educational document upload
  const handleEducationalDocumentUpload = (event) => {
    const file = event.target.files[0];
    setEducationalDocument(file);
  };

  // Handler for FSC document upload
  const handleFscDocumentUpload = (event) => {
    const file = event.target.files[0];
    setFscDocument(file);
  };

  // Handler for Matric document upload
  const handleMatricDocumentUpload = (event) => {
    const file = event.target.files[0];
    setMatricDocument(file);
  };
  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0];
    // You can perform validation here if needed

    // Now, you can upload the file to your server or store it in state
    // For example, you can store it in state like this:
    setProfilePhoto(file);
  };

  // Effect for setting sclassName based on situation
  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  // Effect for getting all sclasses when currentUser ID changes
  useEffect(() => {
    dispatch(getAllSclasses(currentUser._id, "Sclass"));
  }, [currentUser._id, dispatch]);

  // // Handler for changing class
  // const changeHandler = (event) => {
  //   if (event.target.value === "Select Class") {
  //     // setClassName("Select Class");
  //     setSclassName("");
  //   } else {
  //     const selectedClass = sclassesList.find(
  //       (classItem) => classItem.sclassName === event.target.value
  //     );
  //     // setClassName(selectedClass.sclassName);
  //     setSclassName(selectedClass._id);
  //   }
  // };

  // Fields object for registerUser dispatch
  const fields = {
    name,
    // rollNum,
    // password,
    sclassName,
    // provinces,
    // address,
    adminID: currentUser._id,
    role: "Student",
    attendance: [],
    // cnic,
    contactNo,
    religion,
    gender,
    dob,
    qualification,
    concernedBoard,
    fatherName,
    citizenship,
    studentPhoto,
    educationalDocument,
    MatricResult, // Include Matric result in the fields
    fscResult, // Include FSC result in the fields
  };

  // Handler for form submission
  const submitHandler = (event) => {
    event.preventDefault();
    if (sclassName === "") {
      setMessage("Please select a classname");
      setShowPopup(true);
    } else {
      setLoader(true);
      dispatch(registerUser(fields));
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
            <PersonalInfo setStepper={setStepper} />
          ) : stepper === 2 ? (
            <EducationInfo setStepper={setStepper} />
          ) : stepper === 3 ? (
            <RelationInfo setStepper={setStepper} />
          ) : (
            <AcademicDetail />
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
