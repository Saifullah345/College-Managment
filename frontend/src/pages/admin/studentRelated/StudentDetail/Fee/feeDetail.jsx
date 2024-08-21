import React, { useRef } from "react";
import { Typography, Box, Button } from "@mui/material";
import PrintButton from "../../../FeeRelated/FeeCollection/printButton";
import FeeSlip from "../../../FeeRelated/FeeCollection/feeSlip";
import { useNavigate } from "react-router-dom";

const FeeDetails = ({ fee }) => {
  console.log(fee);
  const contentRef = useRef();
  const navigate = useNavigate();
  const excludeFields = ["_id", "createdAt", "updatedAt", "__v"];
  localStorage.setItem("classID", fee?.sclassName?._id);

  // Safely access fee and remainingFees
  const feeData = fee?.fee || {};
  const remainingFees = fee?.remainingFees || [];
  const paidFees = fee?.paidFees || [];

  // Filter unpaid fees that are not excluded
  const feeEntries = Object.entries(feeData).filter(([key, value]) => {
    return (
      value !== "" &&
      value !== "0" &&
      typeof value !== "object" &&
      !excludeFields.includes(key) &&
      !paidFees.some((paidFee) => paidFee.feeType === key)
    );
  });

  // Calculate the total remaining fee
  // const totalRemainingFee = Object.entries(remainingFees).reduce(
  //   (acc, [key, value]) => acc + value,
  //   0
  // );

  return (
    <div>
      <Box display={"flex"} borderBottom={"1px solid #ccc"} paddingBottom={1}>
        <Typography variant="body2" width="10%">
          Sr#
        </Typography>
        <Typography variant="body2" width="20%">
          Date
        </Typography>
        <Typography variant="body2" width="20%">
          Fee
        </Typography>
        <Typography variant="body2" width="30%">
          Manual Invoice #
        </Typography>
        <Typography variant="body2" width="30%">
          Computer Invoice #
        </Typography>
        <Typography variant="body2" width="10%">
          Amount
        </Typography>
        <Typography variant="body2" width="10%">
          Action
        </Typography>
      </Box>

      {paidFees.map((paidFee, index) => (
        <Box
          key={paidFee.feeType}
          display={"flex"}
          borderBottom={"1px solid #ccc"}
          paddingBottom={1}
          marginTop={2}
        >
          <Typography variant="body2" width="10%">
            {index + 1}
          </Typography>
          <Typography variant="body2" width="20%">
            {new Date().toLocaleDateString()}
          </Typography>
          <Typography variant="body2" width="20%">
            {paidFee.feeType.charAt(0).toUpperCase() +
              paidFee.feeType.slice(1).replace(/([A-Z])/g, " $1")}
          </Typography>
          <Typography variant="body2" width="30%">
            {Math.floor(1000 + Math.random() * 9000)}
          </Typography>
          <Typography variant="body2" width="30%">
            {Math.floor(1000 + Math.random() * 9000)}
          </Typography>
          <Typography variant="body2" width="10%">
            {paidFee.amount}
          </Typography>
          <Typography variant="body2" width="10%">
            <PrintButton contentRef={contentRef} />
          </Typography>
        </Box>
      ))}

      <Typography
        variant="body2"
        marginTop={2}
        textAlign={"right"}
        fontWeight={600}
      >
        Subtotal (Paid): {fee?.paidFee}
      </Typography>

      {/* Display Remaining Fees from feeEntries */}
      {feeEntries.length > 0 && (
        <div>
          <Typography variant="h6" marginTop={2}>
            Remaining Fees
          </Typography>
          {feeEntries.map(([key, value]) => (
            <Box
              onClick={() => {
                console.log(key);
                localStorage.setItem("feeType", key);
                localStorage.setItem("active", "Fee Collection");
                navigate("/Admin/fee");
              }}
              key={key}
              display={"flex"}
              gap={"50px"}
              marginBottom={1}
            >
              <Typography variant="body2" marginY={"auto"}>
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}
              </Typography>
              <Box display={"flex"} gap={"10px"}>
                <Typography variant="body2" margin={"auto"}>
                  {key === "tuitionFee" ? value - fee.discountFee : value}
                </Typography>
                <Button marginTop={"-5px"}>Collect Fee</Button>
              </Box>
            </Box>
          ))}
        </div>
      )}

      {remainingFees.map((remainingFee, index) => {
        if (remainingFee.amount > 0) {
          return (
            <Box
              onClick={() => {
                localStorage.setItem("feeType", remainingFee.feeType);
                localStorage.setItem("active", "Fee Collection");
                navigate("/Admin/fee");
              }}
              key={remainingFee.feeType}
              display={"flex"}
              gap={"50px"}
              marginBottom={1}
            >
              <Typography variant="body2" marginY={"auto"}>
                {remainingFee.feeType.charAt(0).toUpperCase() +
                  remainingFee.feeType.slice(1).replace(/([A-Z])/g, " $1")}
              </Typography>
              <Box display={"flex"} gap={"10px"}>
                <Typography variant="body2" margin={"auto"}>
                  {remainingFee.amount}
                </Typography>
                <Button marginTop={"-5px"}>Collect Fee</Button>
              </Box>
            </Box>
          );
        }
        return null;
      })}

      <Box display={"flex"} justifyContent={"space-between"} mt={2}>
        <Typography variant="body1" fontWeight={600}>
          Total Due
        </Typography>
        <Typography variant="body1" fontWeight={600} color="primary">
          {fee.remainingFee}
        </Typography>
      </Box>
      <Box display={"none"}>
        <FeeSlip ref={contentRef} />
      </Box>
    </div>
  );
};

export default FeeDetails;