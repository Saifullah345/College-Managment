import { Box, Button, Container, Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
        console.log(result);
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
        console.log(result);
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
        console.log(result);
        setFilePreview(result.data.instituteProfile);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
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
  return (
    <div>
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <h2>Institute</h2>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={3}>
              <input
                id="ProfileUpload"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <StyledPaper>
                <label htmlFor="ProfileUpload">
                  {!filePreview ? (
                    <AccountCircleIcon
                      style={{ fontSize: 60, cursor: "pointer" }}
                    />
                  ) : (
                    <img
                      height={100}
                      width={100}
                      src={filePreview}
                      alt="reload"
                    />
                  )}
                </label>
              </StyledPaper>
            </Grid>
          </Grid>
        </Container>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
          gap={2}
        >
          <input
            className="registerInput"
            type="text"
            placeholder="Institute Name"
            value={data.instituteName}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                instituteName: e.target.value,
              }));
            }}
            required
          />
          <input
            className="registerInput"
            type="text"
            placeholder="Phone No"
            value={data.phoneNo}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                phoneNo: e.target.value,
              }));
            }}
            required
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
          gap={2}
        >
          <input
            className="registerInput"
            type="text"
            placeholder="Website URL"
            value={data.websiteUrl}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                websiteUrl: e.target.value,
              }));
            }}
            required
          />
          <input
            className="registerInput"
            type="text"
            placeholder="TargetLine"
            value={data.targetLine}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                targetLine: e.target.value,
              }));
            }}
            required
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
          gap={2}
        >
          <input
            className="registerInput"
            type="text"
            placeholder="Address"
            value={data.address}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
            required
          />
          <input
            className="registerInput"
            type="text"
            placeholder="country"
            value={data.country}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                country: e.target.value,
              }));
            }}
            required
          />
        </Box>

        <Button
          variant="contained"
          onClick={Update}
          sx={{
            mt: 2,
            width: "20%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
      </Box>
    </div>
  );
};
const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;
