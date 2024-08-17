import React, { useRef } from "react";
import { Typography, Box, Button } from "@mui/material";
import PrintButton from "../../../FeeRelated/FeeCollection/printButton";
import FeeSlip from "../../../FeeRelated/FeeCollection/feeSlip";
import { useNavigate } from "react-router-dom";

const FeeDetails = ({ fee }) => {
  const contentRef = useRef();
  const navigate = useNavigate();
  const excludeFields = ["_id", "createdAt", "updatedAt", "__v"];
  localStorage.setItem("classID", fee.sclassName._id);
  const feeEntries = Object.entries(fee.fee).filter(([key, value]) => {
    return (
      value !== "" &&
      value !== "0" &&
      typeof value !== "object" &&
      !excludeFields.includes(key) &&
      !fee.paidFees[key]
    );
  });

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

      {Object.keys(fee.paidFees).map((paidFeeKey, index) => (
        <Box
          key={paidFeeKey}
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
            {paidFeeKey.charAt(0).toUpperCase() +
              paidFeeKey.slice(1).replace(/([A-Z])/g, " $1")}
          </Typography>
          <Typography variant="body2" width="30%">
            {Math.floor(1000 + Math.random() * 9000)}
          </Typography>
          <Typography variant="body2" width="30%">
            {Math.floor(1000 + Math.random() * 9000)}
          </Typography>
          <Typography variant="body2" width="10%">
            {fee.fee[paidFeeKey]}
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
        Subtotal (Paid): {fee.paidFee}
      </Typography>

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
              // justifyContent={"space-between"}
              gap={"50px"}
              marginBottom={1}
            >
              <Typography variant="body2" marginY={"auto"}>
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}
              </Typography>
              <Box display={"flex"} gap={"10px"}>
                <Typography variant="body2" margin={"auto"}>
                  {value}
                </Typography>
                <Button marginTop={"-5px"} onClick={() => {}}>
                  Collect Fee
                </Button>
              </Box>
            </Box>
          ))}
        </div>
      )}

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
