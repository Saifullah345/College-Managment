import React from "react";
import { Typography, Box } from "@mui/material";

const FeeDetails = ({ fee }) => {
  const excludeFields = ["_id", "createdAt", "updatedAt", "__v"];
  const feeEntries = Object.entries(fee.fee).filter(([key, value]) => {
    return (
      value !== "" &&
      value !== "0" &&
      typeof value !== "object" &&
      !excludeFields.includes(key)
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
        <Typography variant="body2" width="30%">
          Manual Invoice #
        </Typography>
        <Typography variant="body2" width="30%">
          Computer Invoice #
        </Typography>
        <Typography variant="body2" width="10%">
          Amount
        </Typography>
      </Box>
      {Object.keys(fee.paidFees).length !== 0 && (
        <Box
          display={"flex"}
          borderBottom={"1px solid #ccc"}
          paddingBottom={1}
          marginTop={2}
        >
          <Typography variant="body2" width="10%">
            1
          </Typography>
          <Typography variant="body2" width="20%">
            {new Date().toLocaleDateString()}
          </Typography>
          <Typography variant="body2" width="30%">
            {Math.floor(1000 + Math.random() * 9000)}{" "}
          </Typography>
          <Typography variant="body2" width="30%">
            {Math.floor(1000 + Math.random() * 9000)}{" "}
          </Typography>
          <Typography variant="body2" width="10%">
            {Object.keys(fee.paidFees).length !== 0
              ? fee.fee[Object.keys(fee.paidFees)[0]]
              : "-"}
          </Typography>
        </Box>
      )}
      <Typography
        variant="body2"
        marginTop={2}
        textAlign={"right"}
        fontWeight={600}
      >
        Subtotal (Paid):{fee.paidFee}
      </Typography>

      {feeEntries.map(([key, value]) => (
        <Box
          key={key}
          display={"flex"}
          justifyContent={"space-between"}
          marginBottom={1}
        >
          <Typography variant="body2">
            {key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1")}
          </Typography>
          <Typography variant="body2">{value}</Typography>
        </Box>
      ))}
      <Box display={"flex"} justifyContent={"space-between"} mt={2}>
        <Typography variant="body1" fontWeight={600}>
          Total Due
        </Typography>
        <Typography variant="body1" fontWeight={600} color="primary">
          {fee.totalFee}
        </Typography>
      </Box>
    </div>
  );
};

export default FeeDetails;
