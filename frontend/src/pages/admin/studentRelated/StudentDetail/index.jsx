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
          <Grid item lg={4} xs={15} columnGap={10} rowGap={3}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              backgroundColor="#1976D3"
              border={"1px solid #ccc"}
              borderRadius={"10px"}
              padding={5}
              boxShadow={1}
              marginTop={"20px"}
            >
              <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginBottom={2}>
                <img
                  src={"https://eskooly.com/bb/uploads/students/no-image.png"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "100%" }}
                  alt="reload"
                />
              </Box>
              <h1 style={{ textAlign: 'center', color: '#fff' }}>Sadia Naz</h1>
              <p style={{ textAlign: 'center', color: '#fff' }}>F20-0255</p>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                gap={3}
                marginTop={"5px"}
              >
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} style={{ paddingBottom: '8px' }} gap={3}>
                <p style={{ color: '#FFFFFF' }}>Mobile No</p>
                <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                  <p style={{ color: '#FFFFFF' }}>03412334445</p>
                </Box>
              </Box>

              <Box display={"flex"} justifyContent={"space-between"} style={{ paddingBottom: '8px' }} gap={3}>
                <p style={{ color: '#FFFFFF' }}>Father Name</p>
                <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                  <p style={{ color: '#FFFFFF' }}>Sanjay</p>
                </Box>
              </Box>

              <Box display={"flex"} justifyContent={"space-between"} style={{ paddingBottom: '8px' }} gap={3}>
                <p style={{ color: '#FFFFFF' }}>CNIC</p>
                <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                  <p style={{ color: '#FFFFFF' }}>12345-678901-2</p>
                </Box>
              </Box>

              <Box display={"flex"} justifyContent={"space-between"} style={{ paddingBottom: '8px' }} gap={3}>
                <p style={{ color: '#FFFFFF' }}>Date of Admission</p>
                <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                  <p style={{ color: '#FFFFFF' }}>12/6/2022</p>
                </Box>
              </Box>

              <Box display={"flex"} justifyContent={"space-between"} style={{ paddingBottom: '8px' }} gap={3}>
                <p style={{ color: '#FFFFFF' }}>DOS</p>
                <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                  <p style={{ color: '#FFFFFF' }}>8/6/2002</p>
                </Box>
              </Box>

              <Box display={"flex"} justifyContent={"space-between"} style={{ paddingBottom: '8px' }} gap={3}>
                <p style={{ color: '#FFFFFF' }}>Discount Free</p>
                <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                  <p style={{ color: '#FFFFFF' }}>1234</p>
                </Box>
              </Box>

              <Box display={"flex"} justifyContent={"space-between"} style={{ paddingBottom: '8px' }} gap={3}>
                <p style={{ color: '#FFFFFF' }}>Gender</p>
                <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                  <p style={{ color: '#FFFFFF' }}>Female</p>
                </Box>
              </Box>

              <Box display={"flex"} justifyContent={"space-between"} style={{ paddingBottom: '8px' }} gap={3}>
                <p style={{ color: '#FFFFFF' }}>Province</p>
                <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                  <p style={{ color: '#FFFFFF' }}>KpK</p>
                </Box>
              </Box>

              <Box display={"flex"} justifyContent={"space-between"} style={{ paddingBottom: '8px' }} gap={3}>
                <p style={{ color: '#FFFFFF' }}>Session</p>
                <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                  <p style={{ color: '#FFFFFF' }}>2024</p>
                </Box>
              </Box>

              <Box display={"flex"} justifyContent={"space-between"} style={{ paddingBottom: '8px' }} gap={3}>
                <p style={{ color: '#FFFFFF' }}>Board</p>
                <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                  <p style={{ color: '#FFFFFF' }}>Abbatabad Board</p>
                </Box>
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
              <Box textAlign={"center"} gap={3}>
                <h1 style={{ color: '#1976D3' }}>Upload ID card Front Image</h1>
                <p>PNG,JPG,GIF up to 5 MB</p>
                <button style={{ padding: '7px 12px', background: '#1976D3', color: '#fff', border: 'none' }}>Upload Image</button>

              </Box>

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

              <Box
                display={"flex"}
                flexDirection={"column"}
                border={"1px solid #ccc"}
                borderRadius={"10px"}
                padding={3}
                boxShadow={1}
                marginTop={"20px"}
              >
                <Box textAlign={"center"} gap={3}>
                  <h1 style={{ color: '#1976D3' }}>Upload ID card Front Image</h1>
                  <p>PNG,JPG,GIF up to 5 MB</p>
                  <button style={{ padding: '7px 12px', background: '#1976D3', color: '#fff', border: 'none' }}>Upload Image</button>

                </Box>
              </Box>
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
              <Box textAlign={"center"} padding={'10px'} gap={3}>
                <h1 style={{ color: '#1976D3' }}>Upload ID card Front Image</h1>
                <p>PNG,JPG,GIF up to 5 MB</p>
                <button style={{ padding: '7px 12px', background: '#1976D3', color: '#fff', border: 'none' }}>Upload Image</button>

              </Box>
            </Box>

          </Grid>

        </Grid>
      )}
    </div>
  );
};

export default StudentDetail;
