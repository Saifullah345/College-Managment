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
  const [cnic, setCnic] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [religion, setReligion] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [qualification, setQualification] = useState("");
  const [concernedBoard, setConcernedBoard] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [studentPhoto, setStudentPhoto] = useState(null);
  const [stepper, setStepper] = useState(1);
  const [educationalDocument, setEducationalDocument] = useState(null);
  const [MatricResult, setMatricResult] = useState(""); // State variable for Matric result
  const [fscResult, setFscResult] = useState(""); // State variable for FSC result
  const [fscDocument, setFscDocument] = useState(null); // State variable for FSC document
  const [MatricDocument, setMatricDocument] = useState(null); // State variable for Matric document

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
    cnic,
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
          ) : (
            <>
              <span className="registerTitle">Academic Details</span>
              <div className="flex justify-between">
                <div className="formGroup">
                  <label>Tehsil *</label>
                  <select
                    className="registerInput"
                    value={tehsil}
                    onChange={(event) => setTehsil(event.target.value)}
                    required
                  >
                    <option value="">Select Tehsil</option>
                    <option value="Depalpur">Depalpur</option>
                    {/* Add more tehsil options as needed */}
                  </select>
                </div>
                <div className="formGroup">
                  <div className="formGroup">
                    <label>District *</label>

                    <select
                      className="registerInput"
                      value={district}
                      onChange={(event) => setDistrict(event.target.value)}
                      required
                    >
                      <option value="">Select District</option>
                      <option value="Abbottabad">Abbottabad</option>
                      <option value="Bahawalpur">Bahawalpur</option>
                      <option value="Bannu">Bannu</option>
                      <option value="Bhakkar">Bhakkar</option>
                      <option value="Chakwal">Chakwal</option>
                      <option value="Charsadda">Charsadda</option>
                      <option value="Chiniot">Chiniot</option>
                      <option value="Dadu">Dadu</option>
                      <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Ghotki">Ghotki</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Gujrat">Gujrat</option>
                      <option value="Hafizabad">Hafizabad</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Jacobabad">Jacobabad</option>
                      <option value="Jhang">Jhang</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Kasur">Kasur</option>
                      <option value="Khairpur">Khairpur</option>
                      <option value="Khanewal">Khanewal</option>
                      <option value="Khushab">Khushab</option>
                      <option value="Kohat">Kohat</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Larkana">Larkana</option>
                      <option value="Lodhran">Lodhran</option>
                      <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                      <option value="Mansehra">Mansehra</option>
                      <option value="Mardan">Mardan</option>
                      <option value="Mianwali">Mianwali</option>
                      <option value="Multan">Multan</option>
                      <option value="Muzaffargarh">Muzaffargarh</option>
                      <option value="Narowal">Narowal</option>
                      <option value="Nawabshah">Nawabshah</option>
                      <option value="Nowshera">Nowshera</option>
                      <option value="Okara">Okara</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                      <option value="Rajanpur">Rajanpur</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Sahiwal">Sahiwal</option>
                      <option value="Sargodha">Sargodha</option>
                      <option value="Sheikhupura">Sheikhupura</option>
                      <option value="Shikarpur">Shikarpur</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Sukkur">Sukkur</option>
                      <option value="Swabi">Swabi</option>
                      <option value="Swat">Swat</option>
                      <option value="Toba Tek Singh">Toba Tek Singh</option>
                      <option value="Vehari">Vehari</option>
                      {/* Add more districts as needed */}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="formGroup">
                  <label>Candidate Permanent Address *</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter Permanent Address..."
                    value={permanentAddress}
                    onChange={(event) =>
                      setPermanentAddress(event.target.value)
                    }
                    autoComplete="permanent-address"
                    required
                  />
                  
                  </div>


                 

                  <div className="formGroup">
                
                
                </div>
                <div className="formGroup">
                  <label>Candidate Postal Address *</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter Postal Address..."
                    value={postalAddress}
                    onChange={(event) => setPostalAddress(event.target.value)}
                    autoComplete="postal-address"
                    required
                  />
                </div>
              </div>
            </>
          )}
          {/* Additional input fields */}

          <div className="formGroup">
            {stepper === 3 && (
              <button
                className="registerButton"
                onClick={() => setStepper(stepper - 1)}
              >
                Previous Step
              </button>
            )}

            {stepper === 3 && (
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
