import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export const AddSession = ({ setMessage, setShowPopup }) => {
  const [data, setData] = useState({
    session: "",
  });
  const [loading, setLoading] = useState(false);
  const Add = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/sessionCreate`,
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
      }
    } catch (error) {
      setLoading(false);
      setShowPopup(true);
      setMessage(error?.response?.data?.error);
    }
  };
  return (
    <div>
      {" "}
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <h2>Session</h2>
        <Box display={"flex"} width={"50%"} alignItems="center" gap={2}>
          <input
            className="registerInput"
            type="text"
            placeholder="Add session"
            value={data.session}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                session: e.target.value,
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
