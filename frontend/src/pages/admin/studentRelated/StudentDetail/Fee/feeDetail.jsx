import React, { useRef, useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FeeModal from "./Modal";
import FeeSlip from "../../../FeeRelated/FeeCollection/feeSlip";
import { generateInvoiceNumber } from "./utils";

const FeeDetails = ({ fee, data }) => {
  const navigate = useNavigate();
  const contentRef = useRef();
  const [open, setOpen] = useState(false);
  const [fees, setFees] = useState({});
  const [invoiceNumbers, setInvoiceNumbers] = useState({});
  const [invoice, setInvoice] = useState("");

  useEffect(() => {
    if (fee?.paidFees) {
      const initialInvoiceNumbers = fee.paidFees.reduce((acc, paidFee) => {
        acc[paidFee.feeType] = generateInvoiceNumber();
        return acc;
      }, {});
      setInvoiceNumbers(initialInvoiceNumbers);
    }
  }, [fee?.paidFees]);

  const handlePrint = (paidFee, invoice) => {
    setFees(paidFee);
    setInvoice(invoice);
    setOpen(true);
  };

  const remainingFees = fee?.remainingFees || [];
  const paidFees = fee?.paidFees || [];

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
        <Typography variant="body2" width="10%" textAlign={"left"}>
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
          <Typography variant="body2" width="40%">
            {paidFee.feeType.charAt(0).toUpperCase() +
              paidFee.feeType.slice(1).replace(/([A-Z])/g, " $1")}
          </Typography>
          <Typography variant="body2" width="30%">
            {invoiceNumbers[paidFee.feeType]}{" "}
            {/* Use the stored invoice number */}
          </Typography>
          <Typography variant="body2" width="30%">
            {invoiceNumbers[paidFee.feeType]} {/* Don't regenerate */}
          </Typography>
          <Typography variant="body2" width="10%">
            {paidFee.amount}
          </Typography>
          <Typography
            variant="body2"
            width="10%"
            onClick={() =>
              handlePrint(paidFee, invoiceNumbers[paidFee.feeType])
            }
          >
            <Button>Print</Button>
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

      {remainingFees.map(
        (remainingFee, index) =>
          remainingFee.amount > 0 && (
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
          )
      )}

      <Box display={"flex"} justifyContent={"space-between"} mt={2}>
        <Typography variant="body1" fontWeight={600}>
          Total Due
        </Typography>
        <Typography variant="body1" fontWeight={600} color="primary">
          {fee.remainingFee}
        </Typography>
      </Box>

      <Box>
        <FeeModal
          open={open}
          setOpen={setOpen}
          fee={data}
          fees={fee}
          data={fees}
          contentRef={contentRef}
          invoiceNo={invoice}
          setInvoiceNo={setInvoice}
        />
        <Box display={"none"}>
          <FeeSlip
            ref={contentRef}
            fee={data}
            fees={fee}
            data={fees}
            invoiceNo={invoice}
          />
        </Box>
      </Box>
    </div>
  );
};

export default FeeDetails;
