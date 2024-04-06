import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { underControl } from "../../../redux/userRelated/userSlice";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { CircularProgress } from "@mui/material";
import { Stepper } from "./Stepper";

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser, status, response, error } = useSelector(
    (state) => state.user
  );
  const { sclassesList } = useSelector((state) => state.sclass);

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
      <Stepper setStepper={setStepper} stepper={stepper} />
      <div className="register-form">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Student</span>
          {stepper === 1 ? (
            <>
              <div className="flex justify-between">
                <div className="formGroup">
                  <label>Full Name *</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter full name..."
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="formGroup">
                  <label>Father Name *</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter father's name..."
                    value={fatherName}
                    onChange={(event) => setFatherName(event.target.value)}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label>Citizenship *</label>
                  <select
                    className="registerInput"
                    value={citizenship}
                    onChange={(event) => setCitizenship(event.target.value)}
                    required
                  >
                    <option value="">Select Country of Citizenship</option>
                    <option value="US">Country: United States</option>
                    <option value="UK">Country: United Kingdom</option>
                    <option value="CA">Country: Canada</option>
                    <option value="PK">Country: Pakistan</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="formGroup">
                  <label>CNIC *</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter CNIC..."
                    value={cnic}
                    onChange={(event) => setCnic(event.target.value)}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label>Contact No *</label>
                  <input
                    className="registerInput"
                    type="tel"
                    placeholder="Enter contact number..."
                    value={contactNo}
                    onChange={(event) => setContactNo(event.target.value)}
                    pattern="[0-9]{4}-[0-9]{7}"
                    required
                  />
                </div>
                <div className="formGroup">
                  <label>Religion</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter religion..."
                    value={religion}
                    onChange={(event) => setReligion(event.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="formGroup">
                  <label>Gender *</label>
                  <select
                    className="registerInput"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    required
                  >
                    <option value="">Select a gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                <div className="formGroup">
                  <label>Date of Birth *</label>
                  <input
                    className="registerInput"
                    type="date"
                    value={dob}
                    onChange={(event) => setDob(event.target.value)}
                    required
                  />
                </div>

                <div className="formGroup">
                  <label>Qualification *</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter qualification..."
                    value={qualification}
                    onChange={(event) => setQualification(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="formGroup">
                <label>Concerned Board *</label>
                <select
                  className="registerInput"
                  value={concernedBoard}
                  onChange={(event) => setConcernedBoard(event.target.value)}
                  required
                >
                  <option value="">Select Concerned Board</option>
                  <option value="Federal Board of Intermediate and Secondary Education">
                    Federal Board of Intermediate and Secondary Education
                  </option>
                  <option value="Lahore Board of Intermediate and Secondary Education">
                    Lahore Board of Intermediate and Secondary Education
                  </option>
                  <option value="Punjab Board of Technical Education">
                    Punjab Board of Technical Education
                  </option>
                  {/* Add more board options as needed */}
                </select>
              </div>

              <div className="flex justify-between">
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
              </div>
              <div className="flex justify-between">
                <div className="formGroup">
                  <label>Student Profile Photo *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoUpload}
                    required
                  />
                </div>

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
                <div className="formGroup">
                  <label>Date of Admission *</label>
                  <input
                    className="registerInput"
                    type="date"
                    value={admissionDate}
                    onChange={(event) => setAdmissionDate(event.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          ) : stepper === 2 ? (
            <div className="formGroup">
              <label>Uploaded Document *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoUpload}
                required
              />
            </div>
          ) : (
            <span className="registerTitle">Confirm ?</span>
          )}
          {/* Additional input fields */}

          <div className="formGroup">
            <button className="registerButton" type="submit" disabled={loader}>
              {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
            </button>
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
