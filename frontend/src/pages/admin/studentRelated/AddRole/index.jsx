import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export const AddRole = ({ setMessage, setShowPopup }) => {
  const [data, setData] = useState({
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const Add = async () => {
    if (!data.role) {
      setMessage("Role is required");
      return;
    }

    console.log("Sending role:", data.role);

    setLoading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/roleCreate`,
        { role: data.role },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        setLoading(false);
        setShowPopup(true);
        setMessage("Done Successfully");
        sessionStorage.setItem("loader", !sessionStorage.getItem("loader"));
        setData({ role: "" });
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
        <h2>Role</h2>
        <Box display={"flex"} width={"50%"} alignItems="center" gap={2}>
          <input
            className="registerInput"
            type="text"
            placeholder="Add Role"
            value={data.role}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                role: e.target.value,
              }));
            }}
            required
          />
        </Box>

        <Button
          variant="contained"
          onClick={() => Add()}
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
