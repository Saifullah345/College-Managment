import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Institute = ({ setShowPopup, setMessage }) => {
  const [id, setId] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [data, setData] = useState({
    file: "",
    instituteName: "",
    phoneNo: "",
    websiteUrl: "",
    targetLine: "",
    address: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  const Update = async () => {
    setLoading(true);
    const formDataElement = new FormData();
    for (const key in data) {
      formDataElement.append(key, data[key]);
    }

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/updateInstitute/${id}`,
        formDataElement
      );
      console.log(result);
      if (result.data) {
        setLoading(false);
        setShowPopup(true);
        sessionStorage.setItem("loader", !sessionStorage.getItem("loader"));
        setMessage("Done Successfully");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowPopup(true);
      setMessage(error?.response?.data?.error);
    }
  };

  const ViewInstitute = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allInstitute`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.data) {
        setId(result.data._id);
        setData({
          file: result.data.instituteProfile || "",
          instituteName: result.data.instituteName || "",
          phoneNo: result.data.phoneNo || "",
          websiteUrl: result.data.websiteUrl || "",
          targetLine: result.data.targetLine || "",
          address: result.data.address || "",
          country: result.data.country || "",
        });
        setFilePreview(result.data.instituteProfile);
        console.log(result.data.instituteProfile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFilePreview(fileURL);
      setData((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  useEffect(() => {
    ViewInstitute();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update Institute
        </Typography>
        {/* <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          <span style={{ color: "red" }}>*</span> Required{" "}
          <span style={{ marginLeft: 16 }}>Optional</span>
        </Typography> */}

        <Grid container spacing={3}>
          {/* Left Section */}
          <Grid item xs={12} md={7}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Institute Logo */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: 2,
                }}
              >
                <Avatar
                  alt="Institute Logo"
                  src={filePreview || "/static/images/avatar/1.jpg"} // Replace with your logo path
                  sx={{ width: 80, height: 80 }}
                />
                <Button variant="contained" color="primary" component="label">
                  Change Logo
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              </Box>

              {/* Name of Institute */}
              <TextField
                label="Name of Institute"
                variant="outlined"
                required
                fullWidth
                name="instituteName"
                value={data.instituteName}
                onChange={handleChange}
              />

              {/* Target Line */}
              <TextField
                label="Target Line"
                variant="outlined"
                required
                fullWidth
                name="targetLine"
                value={data.targetLine}
                onChange={handleChange}
              />

              {/* Phone Number */}
              <TextField
                label="Phone Number"
                variant="outlined"
                required
                fullWidth
                name="phoneNo"
                value={data.phoneNo}
                onChange={handleChange}
              />

              {/* Website */}
              <TextField
                label="Website"
                variant="outlined"
                fullWidth
                name="websiteUrl"
                value={data.websiteUrl}
                onChange={handleChange}
              />

              {/* Address */}
              <TextField
                label="Address"
                variant="outlined"
                required
                fullWidth
                name="address"
                value={data.address}
                onChange={handleChange}
              />

              {/* Country */}
              <FormControl fullWidth variant="outlined">
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={data.country}
                  onChange={handleChange}
                >
                  <MenuItem value="Pakistan">Pakistan</MenuItem>
                </Select>
              </FormControl>

              {/* Update Profile Button */}
              <Button
                variant="contained"
                color="warning"
                fullWidth
                onClick={Update}
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Profile View
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Avatar
                    alt="Institute Logo"
                    src={
                      "https://drive.google.com/uc?export=view&id=1Swqs5bRXacp1YlZjgnrT0m3fuZKTpFeT" ||
                      "/static/images/avatar/1.jpg"
                    }
                    sx={{ width: 120, height: 120, margin: "0 auto" }}
                  />

                  <Typography variant="h6" align="center">
                    {data.instituteName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Phone No:</strong> {data.phoneNo}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> murad.hadi@gmail.com
                  </Typography>
                  <Typography variant="body2">
                    <strong>Website:</strong> {data.websiteUrl || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Address:</strong> {data.address}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Country:</strong> {data.country}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
