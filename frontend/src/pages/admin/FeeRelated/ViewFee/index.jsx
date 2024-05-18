import React, { useEffect, useState } from "react";
import { FeeTable } from "./table";
import Popup from "../../../../components/Popup";
import axios from "axios";
import { GreenButton } from "../../../../components/buttonStyles";
import { useNavigate } from "react-router-dom";
import { Backdrop, Box, CircularProgress } from "@mui/material";

export const ViewFee = () => {
  const [viewFee, setViewFee] = useState([]);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [viewSession, setViewSession] = useState([]);
  const [session, setSession] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const ViewFees = async () => {
    setLoader(false);
    try {
      if (session) {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/allFee/${session}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(result);
        if (result.data) {
          setLoader(false);
          setViewFee(result.data);
        }
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
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
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ViewFees();
    ViewSession();
    setLoader(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("loader"), session]);
  console.log(viewFee);
  return (
    <div className="register-form">
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}
      >
        <GreenButton
          variant="contained"
          onClick={() => navigate("/Admin/addFee")}
        >
          Add Fees
        </GreenButton>
      </Box>
      <Box marginTop={"30px"}>
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
      </Box>
      <Box marginTop="30px">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
          Please Wait
        </Backdrop>
        {viewFee.length > 0 ? (
          <FeeTable
            session={viewFee}
            setShowPopup={setShowPopup}
            setMessage={setMessage}
          />
        ) : null}
      </Box>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};
