import { Box, Modal } from "@mui/material";
import React from "react";
import { style } from "../../../constant";
import PrintButton from "../../../../FeeRelated/FeeCollection/printButton";

const FeeModal = ({
  open,
  setOpen,
  data,
  fee,
  fees,
  contentRef,
  invoiceNo,
  setInvoiceNo,
}) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <label
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            whiteSpace: "nowrap",
          }}
        >
          Add Invoice No
        </label>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          sx={{ margin: "10px 0" }}
        >
          <input
            className="registerInput"
            type="text"
            placeholder="Invoice No"
            value={invoiceNo}
            onChange={(event) => setInvoiceNo(event.target.value)}
            required
          />
        </Box>
        <Box display={"flex"} justifyContent={"end"}>
          <PrintButton contentRef={contentRef} /> {/* Pass contentRef */}
        </Box>
      </Box>
      {/* <FeeSlip ref={contentRef} fee={data} fees={fee} data={fees} /> */}
    </Modal>
  );
};

export default FeeModal;
