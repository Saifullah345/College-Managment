import React, { useEffect } from "react";
import { useState } from "react";
import { initialFeeState } from "./constant";
import axios from "axios";
import { useSelector } from "react-redux";
import Popup from "../../../../components/Popup";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AddFee = () => {
  const [addFee, setAddFee] = useState(initialFeeState);
  const [viewSession, setViewSession] = useState([]);
  const [viewClasses, setViewClasses] = useState([]);
  const [session, setSession] = useState("");
  const [classes, setClasses] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const adminID = currentUser._id;
  const navigate = useNavigate();

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setAddFee((prevFee) => ({
      ...prevFee,
      [name]: value,
    }));
  };
  const feeInputs = Object.keys(initialFeeState).map((fee) => (
    <div className="flex justify-between" key={fee}>
      <input
        className="registerInput"
        type="text"
        name={fee}
        placeholder={fee.charAt(0).toUpperCase() + fee.slice(1)}
        value={addFee[fee]}
        onChange={handleFeeChange}
      />
    </div>
  ));
  const ViewSession = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allSession`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.data) {
        console.log(result);
        setViewSession(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ViewClasses = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/SclassList/${adminID}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.data) {
        console.log(result);
        setViewClasses(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Add = async () => {
    setLoading(true);
    const data = {
      session,
      sclass: classes,
      ...addFee,
    };
    console.log(data);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addFee`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.data) {
        setLoading(false);
        console.log(result);
        setShowPopup(true);
        sessionStorage.setItem("loader", !sessionStorage.getItem("loader"));
        setMessage("Done Successfully");
        setTimeout(() => {
          navigate("Admin/fee");
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      setShowPopup(true);
      setMessage(error?.response?.data?.error);
    }
  };
  useEffect(() => {
    ViewSession();
    ViewClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("loader")]);

  return (
    <div className="register-form">
      <span className="registerTitle">Add Fee</span>
      <Box
        width={"50%"}
        // display={"flex"}
        // justifyContent={"center"}
        // margin={"auto"}
      >
        <form className="registerForm">
          <div className="formGroup">
            <select
              className="registerInput"
              value={session}
              onChange={(e) => {
                setSession(e.target.value);
              }}
              required
            >
              <option value="">Select Session</option>
              {viewSession.map((val) => (
                <option key={val.session} value={val._id}>
                  {val.session}
                </option>
              ))}

              {/* Add more options as needed */}
            </select>
          </div>
          <div className="formGroup">
            <select
              className="registerInput"
              value={classes}
              onChange={(e) => {
                setClasses(e.target.value);
              }}
              required
            >
              <option value="">Select Class</option>
              {viewClasses.map((val) => (
                <option key={val.sclassName} value={val._id}>
                  {val.sclassName}
                </option>
              ))}

              {/* Add more options as needed */}
            </select>
          </div>

          {feeInputs}
        </form>
      </Box>

      <Box display={"flex"} justifyContent={"center"}>
        <Button variant="contained" onClick={Add} sx={{ mt: 4, width: "20%" }}>
          {loading ? "Loading..." : "Add"}
        </Button>
      </Box>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};
