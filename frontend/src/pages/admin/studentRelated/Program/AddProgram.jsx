import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export const AddProgram = ({ setMessage, setShowPopup }) => {
  const [data, setData] = useState({
    program: "",
  });
  const [loading, setloading] = useState(false);
  const Add = async () => {
    setloading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/programCreate`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        setloading(false);
        console.log(result);
        setShowPopup(true);
        sessionStorage.setItem("loader", !sessionStorage.getItem("loader"));
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
        <h2>Program</h2>
        <Box display={"flex"} width={"50%"} alignItems="center" gap={2}>
          <input
            className="registerInput"
            type="text"
            placeholder="Add program"
            value={data.program}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                program: e.target.value,
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
