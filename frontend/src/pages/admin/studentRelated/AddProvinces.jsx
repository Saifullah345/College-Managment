import { Box, Modal, Button } from "@mui/material";
import React, { useState } from "react";
import { style } from "./constant";
import axios from "axios";
import Popup from "../../../components/Popup";

export const AddProvinces = ({ open, setOpen }) => {
  const [province, setProvince] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false);

  const Add = async () => {
    setloading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/provincesCreate`,
        {
          province,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.data) {
        setloading(false);
        console.log(result);
        sessionStorage.setItem("loader", true);
        setShowPopup(true);
        setMessage("Done Successfully");
        setOpen(false);
      }
    } catch (error) {
      console.log(error.response);
      setShowPopup(true);
      setloading(false);
      setMessage(error?.response?.data?.error);
    }
  };
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={"3"}
            sx={{ margin: "auto 0" }}
          >
            <label style={{ fontSize: "20px", marginBottom: "10px" }}>
              Add Provinces
            </label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter Provinces..."
              value={province}
              onChange={(event) => setProvince(event.target.value)}
              required
            />
            <Box display={"flex"} justifyContent={"end"}>
              <Button
                variant="contained"
                onClick={Add}
                sx={{ mt: 2, width: "50%" }}
              >
                {loading ? "Loading..." : "Add"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};
