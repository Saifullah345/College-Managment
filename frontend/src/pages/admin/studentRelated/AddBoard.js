import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export const AddBoard = ({ setMessage, setShowPopup }) => {
  const [data, setData] = useState({
    name: "",
    address: "",
  });
  const [loading, setloading] = useState(false);
  const Add = async () => {
    setloading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/boardCreate`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(result);
      if (result.data) {
        setloading(false);
        console.log(result);
        setShowPopup(true);
        sessionStorage.setItem("loader", true);
        setMessage("Done Successfully");
      }
    } catch (error) {
      setloading(false);
      setShowPopup(true);
      setMessage(error?.response?.data?.error);
    }
  };
  return (
    <div>
      {" "}
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <h2>Board</h2>
        <Box display={"flex"} alignItems="center" gap={2}>
          <input
            className="registerInput"
            type="text"
            placeholder="Add Board Name"
            value={data.name}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            required
          />
          <input
            className="registerInput"
            type="text"
            placeholder="Add Board Address"
            value={data.address}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
            required
          />
        </Box>

        <Button
          variant="contained"
          onClick={Add}
          sx={{
            mt: 2,
            width: "20%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {loading ? "Loading..." : "Add"}
        </Button>
      </Box>
    </div>
  );
};
