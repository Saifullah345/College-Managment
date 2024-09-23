import { Box, Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

const StudentDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [data, setData] = useState({});
  const { id } = useParams();
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    // Retrieve the student IDs array from the location state
    if (location.state && location.state.selectedIds) {
      setSelectedStudentIds(location.state.selectedIds);
      const index = location.state.selectedIds.indexOf(id);
      setCurrentIndex(index);
    }
    viewStudentDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location.state]);

  const viewStudentDetail = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/Student/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.status === 200) {
        setData(result.data);
        localStorage.setItem("studentName", result.data.name);
        localStorage.setItem("classID", result.data.sclassName._id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextStudent = () => {
    if (currentIndex < selectedStudentIds.length - 1) {
      const nextStudentId = selectedStudentIds[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      navigate(`/Admin/students/student/${nextStudentId}`, {
        state: { selectedIds: selectedStudentIds },
      });
    }
  };

  const handlePreviousStudent = () => {
    if (currentIndex > 0) {
      const prevStudentId = selectedStudentIds[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      navigate(`/Admin/students/student/${prevStudentId}`, {
        state: { selectedIds: selectedStudentIds },
      });
    }
  };

  useEffect(() => {
    viewStudentDetail();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="register-form">
      <Box display={"flex"} justifyContent={"end"}>
        <Box display={"flex"} gap={"10px"}>
          <IconButton
            onClick={handlePreviousStudent}
            disabled={currentIndex === 0}
          >
            <ArrowBackIosOutlinedIcon />
          </IconButton>

          <IconButton
            onClick={handleNextStudent}
            disabled={currentIndex === selectedStudentIds.length - 1}
          >
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography
          component="h1"
          // marginBottom={"10px"}
          variant="h6"
          color="inherit"
          noWrap
          // sx={{ flexGrow: 1 }}
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
    </div>
  );
};

export default StudentDetail;
