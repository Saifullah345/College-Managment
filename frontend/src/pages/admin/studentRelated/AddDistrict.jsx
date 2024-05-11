import { Box, Modal, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { style } from "./constant";
import axios from "axios";
import Popup from "../../../components/Popup";

export const AddDistrict = ({ open, setOpen }) => {
  const [provinces, setProvinces] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false);
  const [district, setDistrict] = useState("");
  const [provinceId, setProvinceId] = useState("");

  const Add = async () => {
    console.log(provinceId);
    setloading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/districtCreate`,
        {
          district,
          provinceId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.data) {
        setloading(false);
        // console.log(result);
        sessionStorage.setItem("loader", !sessionStorage.getItem("loader"));
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
  const ViewProvinces = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allProvinces`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.data) {
        console.log(result);
        setProvinces(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ViewProvinces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("loader")]);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <label
            style={{
              fontSize: "20px",
              marginBottom: "10px",
              whiteSpace: "nowrap",
            }}
          >
            Add District
          </label>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
            sx={{ margin: "10px 0" }}
          >
            <select
              className="registerInput"
              value={provinceId}
              onChange={(event) => setProvinceId(event.target.value)}
              required
            >
              <option value="">Select Provinces</option>
              {provinces.map((val) => (
                <option value={val._id}>{val.province}</option>
              ))}
            </select>

            <input
              className="registerInput"
              type="text"
              placeholder="Enter District..."
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              required
            />
          </Box>
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
      </Modal>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};
