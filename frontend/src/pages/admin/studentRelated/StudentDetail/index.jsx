import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentDetail = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const viewStudentDetail = async () => {
    setLoading(false);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/Student/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.status === 200) {
        setData(result.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    viewStudentDetail();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="register-form">
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
      {loading ? (
        "Loading..."
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              display={"flex"}
              border={"1px solid black"}
              flexDirection={"column"}
              gap={1}
              padding={5}
              borderRadius={"10px"}
              boxShadow={"3"}
            >
              <img
                src={"https://eskooly.com/bb/uploads/students/no-image.png"}
                height={100}
                style={{ borderRadius: "100%" }}
                width={100}
                alt="reload"
              />
              <Box display={"flex"} gap={3}>
                <p>Name </p>
                <h4>{data.name}</h4>
              </Box>{" "}
              <Box display={"flex"} gap={3}>
                <p>Registration No</p>
                <h4>{data.enrollmentNo}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Mobile No</p>
                <h4>{data.mobileNumber}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Father Name</p>
                <h4>{data.fatherName}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>CNIC</p>
                <h4>{data.cnic}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Date of Admission</p>
                <h4>N/A</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Class</p>
                <h4>{data.sclassName?.sclassName}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>DOB</p>
                <h4>{data.dob}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Discount Fee</p>
                <h4>{data.discountFee}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Gender</p>
                <h4>{data.gender}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Religion</p>
                <h4>{data.religion}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Board</p>
                <h4>{data.board}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Session</p>
                <h4>{data.session?.session}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Province</p>
                <h4>{data.provinces}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>District</p>
                <h4>{data.district}</h4>
              </Box>
              <Box display={"flex"} gap={3}>
                <p>Tehsil</p>
                <h4>{data.tehsil}</h4>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} gap={3}>
            <Box
              display={"flex"}
              border={"1px solid black"}
              flexDirection={"column"}
              gap={3}
              padding={5}
              borderRadius={"10px"}
              boxShadow={"3"}
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
            <Box
              display={"flex"}
              marginTop={"15px"}
              border={"1px solid black"}
              flexDirection={"column"}
              gap={3}
              padding={5}
              borderRadius={"10px"}
              boxShadow={"3"}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <h4>Admission Status</h4>
                <h4 style={{ color: "red" }}>{data.admissionStatus}</h4>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default StudentDetail;
