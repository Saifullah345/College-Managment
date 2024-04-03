import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { underControl } from "../../../redux/userRelated/userSlice";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { CircularProgress } from "@mui/material";

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser, status, response, error } = useSelector((state) => state.user);
  const { sclassesList } = useSelector((state) => state.sclass);

  // State variables
  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [password, setPassword] = useState("");
  const [provinces, setProvinces] = useState("");
  const [address, setAddress] = useState("");
  const [className, setClassName] = useState("");
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

  // Handler for changing class
  const changeHandler = (event) => {
    if (event.target.value === "Select Class") {
      setClassName("Select Class");
      setSclassName("");
    } else {
      const selectedClass = sclassesList.find((classItem) => classItem.sclassName === event.target.value);
      setClassName(selectedClass.sclassName);
      setSclassName(selectedClass._id);
    }
  };

  // Fields object for registerUser dispatch
  const fields = {
    name,
    rollNum,
    password,
    sclassName,
    provinces,
    address,
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
    <div className="container">
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Student</span>
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
              <option value="">Select Citizenship</option>
              {/* Add citizenship options */}
            </select>
          </div>
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
          <div className="formGroup">
            <label>Gender *</label>
            <select
              className="registerInput"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              required
            >
              <option value="">Select a gender</option>
              {/* Add gender options */}
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
          <div className="formGroup">
            <label>Concerned Board *</label>
            <select
              className="registerInput"
              value={concernedBoard}
              onChange={(event) => setConcernedBoard(event.target.value)}
              required
            >
              <option value="">Select Concerned Board</option>
              {/* Add concerned board options */}
            </select>
          </div>

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
    </div>
  );
};

export default AddStudent;
