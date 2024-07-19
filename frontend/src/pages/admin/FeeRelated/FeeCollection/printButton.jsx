import React from "react";
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";

const PrintButton = ({ contentRef }) => {
  return (
    <ReactToPrint
      trigger={() => (
        <Button
          variant="contained"
          sx={{ mt: 2, display: "flex", gap: "10px", width: "auto" }}
          //   disabled={viewFee[0]?.remainingFee !== "0"}
        >
          <PrintIcon />
          Print
        </Button>
      )}
      content={() => contentRef.current}
    />
  );
};

export default PrintButton;
