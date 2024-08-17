import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { ViewFee } from "./ViewFee";
import FeeCollection from "./FeeCollection";

export const Fee = () => {
  const [active, setActive] = useState(
    localStorage.getItem("active"),
    "Fee Particulars"
  );

  return (
    <div className="register-form">
      <Box display={"flex"} flexDirection={"column"} gap={4}>
        <Box display="flex" marginTop={"10px"} flexDirection="column" gap={2}>
          <h2>Fees</h2>
          <Box display="flex" gap={10}>
            <Typography
              onClick={() => setActive("Fee Particulars")}
              sx={{
                fontSize: "18px",
                fontWeight: active === "Fee Particulars" ? "600" : "300",
                textDecoration: active === "Fee Particulars" ? "underline" : "",
                textUnderlineOffset: "5px",
                cursor: "pointer",
              }}
            >
              Fee Particulars
            </Typography>
            <Typography
              onClick={() => setActive("Fee Collection")}
              sx={{
                fontSize: "18px",
                fontWeight: active === "Fee Collection" ? "600" : "300",
                textDecoration: active === "Fee Collection" ? "underline" : "",
                textUnderlineOffset: "5px",
                cursor: "pointer",
              }}
            >
              Fee Collection
            </Typography>
          </Box>
          {active === "Fee Particulars" ? <ViewFee /> : <FeeCollection />}
        </Box>
      </Box>
    </div>
  );
};
