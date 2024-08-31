import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../../../../components/Popup";

const StudentDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const [admissionStatus, setAdmissionStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const viewStudentDetail = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/Student/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.status === 200) {
        setData(result.data);
        console.log(result?.data?.sclassName?._id);
        localStorage.setItem("studentName", result.data.name);
        localStorage.setItem("classID", result?.data?.sclassName?._id);

        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  const Update = async () => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/Student/${id}`,
        {
          admissionStatus,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(result);
      if (result.data) {
        setShowPopup(true);
        sessionStorage.setItem("loader", !sessionStorage.getItem("loader"));
        setMessage("Done Successfully");
        setLoading(true);
        setAdmissionStatus("");
        viewStudentDetail();
      }
    } catch (error) {
      setShowPopup(true);
      setMessage(error?.response?.data?.error);
      setAdmissionStatus("");
    }
  };
  useEffect(() => {
    viewStudentDetail();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (admissionStatus !== "") Update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admissionStatus]);

  return (
    <div className="register-form">
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography
          component="h1"
          marginBottom={"10px"}
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Student Detail
        </Typography>
        <button
          className="registerButton"
          onClick={() => {
            navigate(`/Admin/students/feeDetail/${id}`);
          }}
          type="submit"
        >
          Fee Detail
        </button>
      </Box>
      {loading ? (
        "Loading..."
      ) : (
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12} columnGap={10} rowGap={3}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              border={"1px solid #ccc"}
              borderRadius={"10px"}
              padding={3}
              boxShadow={1}
              marginTop={"20px"}
            >
              <img
                src={"https://eskooly.com/bb/uploads/students/no-image.png"}
                height={100}
                style={{ borderRadius: "100%" }}
                width={100}
                alt="reload"
              />
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                gap={3}
                marginTop={"5px"}
              >
                <p>Name </p>
                <h4>{data.name}</h4>
              </Box>{" "}
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Registration No</p>
                <h4>{data.enrollmentNo}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Mobile No</p>
                <h4>{data.mobileNumber}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Father Name</p>
                <h4>{data.fatherName}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>CNIC</p>
                <h4>{data.cnic}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Date of Admission</p>
                <h4>N/A</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Class</p>
                <h4>{data?.sclassName?.sclassName}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>DOB</p>
                <h4>{data.dob}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Discount Fee</p>
                <h4>{data.discountFee}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Gender</p>
                <h4>{data.gender}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Religion</p>
                <h4>{data.religion}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Board</p>
                <h4>{data.board}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Session</p>
                <h4>{data.session?.session}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Province</p>
                <h4>{data.provinces}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>District</p>
                <h4>{data.district}</h4>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                <p>Tehsil</p>
                <h4>{data.tehsil}</h4>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6} gap={3}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              border={"1px solid #ccc"}
              borderRadius={"10px"}
              padding={3}
              boxShadow={1}
              marginTop={"20px"}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <h4>Admission Status</h4>
                <h4 style={{ color: "red", textTransform: "capitalize" }}>
                  {data.admissionStatus}
                </h4>
              </Box>
              <div className="formGroup">
                <select
                  defaultValue={data.admissionStatus}
                  className="registerInput"
                  value={admissionStatus}
                  onChange={(e) => {
                    setAdmissionStatus(e.target.value);
                  }}
                  required
                >
                  <option value="">Select Admission Status</option>
                  <option value="pending">Pending</option>
                  <option value="continue">Continue</option>
                  <option value="dropout">Dropout</option>
                </select>
              </div>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              border={"1px solid #ccc"}
              borderRadius={"10px"}
              padding={3}
              boxShadow={1}
              marginTop={"20px"}
            >
              <h4>Attachment</h4>
              <Box display={"flex"} gap={3}>
                <p>ID Card Front Photo</p>
                <a
                  style={{ color: "blue" }}
                  target="_blank"
                  href={data.idCardFront}
                  rel="noreferrer"
                >
                  {data.idCardFront?.slice(0, 30)}
                </a>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>ID Card Back Photo</p>
                <a
                  style={{ color: "blue" }}
                  target="_blank"
                  href={data.idCardBack}
                  rel="noreferrer"
                >
                  {data.idCardBack?.slice(0, 30)}
                </a>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Metric Certificate</p>
                <a
                  style={{ color: "blue" }}
                  target="_blank"
                  href={data.MetricDMC}
                  rel="noreferrer"
                >
                  {data.MetricDMC?.slice(0, 30)}
                </a>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default StudentDetail;
