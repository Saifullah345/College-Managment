import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import FeeDetails from "./feeDetail";

const StudentFee = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const viewStudentDetail = async () => {
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
        console.error(err);
        setLoading(false);
      }
    };

    viewStudentDetail();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

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
        Fee Detail
      </Typography>
      <Typography
        marginTop={"20px"}
        component="h1"
        marginBottom={"10px"}
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, textTransform: "capitalize" }}
      >
        {data?.name}
      </Typography>
      {data?.feeHistory &&
        [...data.feeHistory].reverse().map((val, index) => (
          <Box
            key={index}
            display={"flex"}
            flexDirection={"column"}
            border={"1px solid #ccc"}
            borderRadius={"10px"}
            padding={3}
            boxShadow={1}
            // marginTop={"2px"}
            marginTop={"20px"}
          >
            <Typography variant="h6" color="primary">
              {val?.sclassName?.sclassName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Discount : {val?.discount}% ( {val.discountFee} )
            </Typography>

            <Typography variant="h6" marginTop={2}>
              Payment History
            </Typography>

            <FeeDetails fee={val} />
          </Box>
        ))}
    </div>
  );
};

export default StudentFee;
