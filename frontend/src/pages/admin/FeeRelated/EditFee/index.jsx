import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "../../../../components/Popup";
import { Box, Button } from "@mui/material";
import { initialFeeState } from "../AddFee/constant";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const EditFee = () => {
  const [fees, setFees] = useState(initialFeeState);
  //   const [viewSession, setViewSession] = useState([]);
  //   const [viewClasses, setViewClasses] = useState([]);
  const [session, setSession] = useState("");
  const [classes, setClasses] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch fee data when component mounts
    const fetchFeeData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/fee/${id}`
        );
        if (result.data) {
          console.log(result);
          setFees(result.data);
          setSession(result.data.session);
          setClasses(result.data.sclass);
        }
      } catch (error) {
        console.error("Error fetching fee data:", error);
        setShowPopup(true);
        setMessage("Error fetching fee data.");
      }
    };

    fetchFeeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setFees((prevFee) => ({
      ...prevFee,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/editFee/${id}`,
        { session, sclass: classes, ...fees },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        setLoading(false);
        setShowPopup(true);
        setMessage("Done Successfully");
        setTimeout(() => {
          localStorage.setItem("active", "Fee Particulars");
          navigate("/Admin/fee");
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      setShowPopup(true);
      setMessage(error?.response?.data?.error || "Error updating fee");
    }
  };

  return (
    <div className="register-form">
      <Box display={"flex"} justifyContent={"space-between"}>
        <ArrowBackIosIcon
          onClick={() => {
            localStorage.setItem("active", "Fee Particulars");
            navigate(-1);
          }}
          sx={{ cursor: "pointer" }}
        />
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{ mt: 4, width: "20%" }}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
      </Box>

      <span className="registerTitle">Edit Fee</span>
      <Box width={"50%"} marginTop={"10px"}>
        <form className="registerForm">
          {Object.keys(initialFeeState).map((fee) => (
            <div className="flex justify-between" key={fee}>
              <input
                className="registerInput"
                type="text"
                name={fee}
                placeholder={fee.charAt(0).toUpperCase() + fee.slice(1)}
                value={fees[fee]}
                onChange={handleFeeChange}
              />
            </div>
          ))}
        </form>
      </Box>

      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};
