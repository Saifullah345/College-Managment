import React, { forwardRef, useEffect, useState } from "react";
import "./feeReceipt.css";
import { Typography } from "@mui/material";
import numberToWords from "number-to-words";

const FeeSlip = forwardRef(({ fee, data, fees }, ref) => {
  const [feeMenu, setFeeMenu] = useState([]);
  const [feeTypeObj, setFeeTypeObj] = useState("");
  const [amountObj, setAmountObj] = useState(0);

  // Log data to inspect its structure
  console.log("Data prop:", data);

  useEffect(() => {
    // Transform data into the desired format
    const formattedFeeMenu = Object.entries(data).map(([key, value]) => ({
      key,
      value,
    }));
    setFeeMenu(formattedFeeMenu);

    // Log formatted fee menu to inspect its structure
    console.log("Formatted Fee Menu:", formattedFeeMenu);
  }, [data]);

  useEffect(() => {
    if (feeMenu.length > 0) {
      const feeType = feeMenu.find((obj) => obj.key === "feeType")?.value || "";
      const amount = feeMenu.find((obj) => obj.key === "amount")?.value || 0;

      // Log values before setting state
      console.log("Fee Type Found:", feeType);
      console.log("Amount Found:", amount);

      setFeeTypeObj(feeType);
      setAmountObj(amount);
    }
  }, [feeMenu]);

  const amountInWords = amountObj
    ? numberToWords
        .toWords(amountObj)
        .replace(/\b\w/g, (char) => char.toUpperCase()) + " Only"
    : "";
  return (
    <div className="receipt-container" ref={ref}>
      <div className="receipt-content">
        {/* Office Copy */}
        <div className="receipt-column">
          <div className="receipt-header">Office Copy</div>
          <div className="college-info">
            <h4>ASPIRE COLLEGE</h4>
            <small>8th Floor, Balaji Infotech Park, Wagle Estate, Thane</small>
            <p>Phone No: 020-25432947 Website: www.aspire.edu</p>
          </div>
          <div className="receipt-title">FEE RECEIPT</div>
          <div className="receipt-details">
            <div className="details-left">
              <p>
                <strong>Receipt No:</strong> 1718/02518{" "}
                {/* Generate dynamically if needed */}
              </p>
              <small>
                <strong>Received From:</strong> {fees?.studentName || "N/A"}
              </small>
              <p>
                <strong>Class:</strong> {fees?.sclassName?.sclassName || "N/A"}
              </p>
            </div>
            <div className="details-right">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(fees?.date || fee.updatedAt)
                  .toISOString()
                  .slice(0, 10)}
              </p>
              <p>
                <strong>Student-ID:</strong> {fees?.studentId || "N/A"}
              </p>
              <p>
                <strong>Course:</strong> {fee?.program || "N/A"}
              </p>
            </div>
          </div>
          <table className="fee-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {feeTypeObj && amountObj && (
                <tr>
                  <td>
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {feeTypeObj}
                    </Typography>
                  </td>
                  <td>{amountObj}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="total-amount">
            <p>
              <strong>Total:</strong> {amountObj}
            </p>
          </div>
          <div className="payment-info">
            <p>
              <strong>Mode Of Payment:</strong> Cash {/* Change dynamically */}
            </p>
            <p>
              <strong>Name Of User:</strong> GANESH {/* Change dynamically */}
            </p>
            <small>
              <strong>Amount in Words:</strong> {amountInWords}
            </small>
          </div>
          <div className="remarks-signature">
            <p>
              <strong>Remark</strong>
            </p>
            <p>
              <strong>Signature</strong>
            </p>
          </div>
          <small className="note">
            Once the Fee is submitted then non-refundable add in the remarks
          </small>
        </div>{" "}
        <div className="receipt-column">
          <div className="receipt-header">Student Copy</div>
          <div className="college-info">
            <h4>ASPIRE COLLEGE</h4>
            <small>8th Floor, Balaji Infotech Park, Wagle Estate, Thane</small>
            <p>Phone No: 020-25432947 Website: www.aspire.edu</p>
          </div>
          <div className="receipt-title">FEE RECEIPT</div>
          <div className="receipt-details">
            <div className="details-left">
              <p>
                <strong>Receipt No:</strong> 1718/02518{" "}
                {/* Generate dynamically if needed */}
              </p>
              <small>
                <strong>Received From:</strong> {fees?.studentName || "N/A"}
              </small>
              <p>
                <strong>Class:</strong> {fees?.sclassName?.sclassName || "N/A"}
              </p>
            </div>
            <div className="details-right">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(fees?.date || fee.updatedAt)
                  .toISOString()
                  .slice(0, 10)}
              </p>
              <p>
                <strong>Student-ID:</strong> {fees?.studentId || "N/A"}
              </p>
              <p>
                <strong>Course:</strong> {fee?.program || "N/A"}
              </p>
            </div>
          </div>
          <table className="fee-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {feeTypeObj && amountObj && (
                <tr>
                  <td>
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {feeTypeObj}
                    </Typography>
                  </td>
                  <td>{amountObj}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="total-amount">
            <p>
              <strong>Total:</strong> {amountObj}
            </p>
          </div>
          <div className="payment-info">
            <p>
              <strong>Mode Of Payment:</strong> Cash {/* Change dynamically */}
            </p>
            <p>
              <strong>Name Of User:</strong> GANESH {/* Change dynamically */}
            </p>
            <small>
              <strong>Amount in Words:</strong> {amountInWords}
            </small>
          </div>
          <div className="remarks-signature">
            <p>
              <strong>Remark</strong>
            </p>
            <p>
              <strong>Signature</strong>
            </p>
          </div>
          <small className="note">
            Once the Fee is submitted then non-refundable add in the remarks
          </small>
        </div>
        {/* Student Copy - Similar to Office Copy */}
        {/* Render Student Copy similarly by replacing values */}
      </div>
    </div>
  );
});

export default FeeSlip;
