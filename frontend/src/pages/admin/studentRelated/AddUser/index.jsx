import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const AddUser = ({ setMessage, setShowPopup }) => {
  const [data, setData] = useState({
    user: "",
    role: "",
  });
  const [viewRoles, setViewRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const Add = async () => {
    console.log(data, "User");
    if (!data.user) {
      setMessage("User is required");
      return;
    } else if (!data.role) {
      setMessage("Role is required");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/userCreate`,
        { user: data.user, role: data.role },
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
  const ViewRoles = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allRoles`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        setData((prev) => ({
          ...prev,
          role: result.data[0]?._id,
        }));
        setViewRoles(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ViewRoles();
  }, []);

  return (
    <div>
      {" "}
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <h2>User</h2>
        <Box display={"flex"} width={"50%"} alignItems="center" gap={2}>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter User Name"
            value={data.user}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                user: e.target.value,
              }));
            }}
            required
          />
        </Box>
        <Box width={"50%"} sx={{ margin: "auto 0" }}>
          <label>Role *</label>
          <select
            className="registerInput"
            value={data.role}
            onChange={(event) => {
              setData((prev) => ({
                ...prev,
                role: event.target.value,
              }));
            }}
            required
          >
            <option disabled>Select Role</option>
            {viewRoles.length > 0 &&
              viewRoles?.map((val) => (
                <option value={val._id}>{val.role}</option>
              ))}
          </select>
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
