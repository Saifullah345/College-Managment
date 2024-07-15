import { Box, Typography } from "@mui/material";
import { forwardRef } from "react";
import FeeTable from "./feeTable";
import { SubmissionFeeTable } from "./submissionFeeTable";

const FeeSlip = forwardRef((props, ref) => {
  const { data, viewFee } = props;
  return (
    <Box ref={ref} sx={{ margin: "2px", padding: "10px" }}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignContent={"center"}
        margin={"auto"}
        textAlign={"center"}
        justifyContent={"center"}
      >
        <h1>Logo</h1>
        <h4>eSKooly</h4>
        <h4>0300-34543321 | www.eskooly.com | info@eskooly.com</h4>
        <h1 style={{ color: "red" }}>Fee Submission Slip</h1>
      </Box>
      <hr />
      <Box display={"flex"} gap={"10px"} padding={"10px"}>
        <img
          src={"https://eskooly.com/bb/uploads/students/no-image.png"}
          height={100}
          style={{ borderRadius: "100%" }}
          width={100}
          alt="reload"
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          <Typography
            sx={{ textDecoration: "underline", textUnderlineOffset: "10px" }}
          >
            RegNo: 3232
          </Typography>
          <Typography
            sx={{ textDecoration: "underline", textUnderlineOffset: "10px" }}
          >
            EnrollmentNo: {data[0]?.enrollmentNo}
          </Typography>
          <Typography
            sx={{ textDecoration: "underline", textUnderlineOffset: "10px" }}
          >
            Student Name: {data[0]?.name}
          </Typography>
          {data[0]?.fatherName && (
            <Typography
              sx={{ textDecoration: "underline", textUnderlineOffset: "10px" }}
            >
              Father Name: {data[0]?.fatherName}
            </Typography>
          )}
          <Typography
            sx={{ textDecoration: "underline", textUnderlineOffset: "10px" }}
          >
            Class: {data[0]?.sclassName?.sclassName}
          </Typography>
        </Box>
      </Box>
      {viewFee.length > 0 ? (
        <FeeTable
          session={viewFee.filter(
            (fee) => fee.sclass?._id === data[0]?.sclassName?._id
          )}
        />
      ) : null}
      {data[0]?.feeHistory?.length > 0 ? (
        <SubmissionFeeTable session={data[0]?.feeHistory} />
      ) : null}
    </Box>
  );
});

export default FeeSlip;
