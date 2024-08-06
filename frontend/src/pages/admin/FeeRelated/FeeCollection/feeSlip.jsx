import React, { forwardRef } from "react";
import "./feeReceipt.css";

const FeeSlip = forwardRef((props, ref) => {
  return (
    <div className="receipt-container" ref={ref}>
      <div className="receipt-content">
        <div className="receipt-column">
          {/* Office Copy */}
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
                <strong>Receipt No:</strong> 1718/02518
              </p>
              <small>
                <strong>Received From:</strong> Gauri Pandharinath Patole
              </small>
              <p>
                <strong>Mother Name:</strong> Chhaya
              </p>
              <p>
                <strong>Division:</strong> MBA-II-A
              </p>
              <p>
                <strong>Branch:</strong> General
              </p>
            </div>
            <div className="details-right">
              <p>
                <strong>Date:</strong> 7-2-2018
              </p>
              <p>
                <strong>Student-ID:</strong> 1617/ESBS/00283
              </p>
              <p>
                <strong>Course:</strong> MBA
              </p>
              <p>
                <strong>Class:</strong> MBA-II
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
              <tr>
                <td>Tuition Fees /17-18</td>
                <td>57,418.00</td>
              </tr>
              <tr>
                <td>Development Fees /17-18</td>
                <td>12,842.00</td>
              </tr>
              <tr>
                <td>SPPU Student Activity Fees /17-18</td>
                <td>1,000.00</td>
              </tr>
              <tr>
                <td>Miscellaneous Course Fees /17-18</td>
                <td>500.00</td>
              </tr>
              <tr>
                <td>University Prorata Fees /17-18</td>
                <td>592.00</td>
              </tr>
              <tr>
                <td>Students Insurance Fees /17-18</td>
                <td>25.00</td>
              </tr>
            </tbody>
          </table>
          <div className="total-amount">
            <p>
              <strong>Total:</strong> 72,377.00
            </p>
          </div>
          <div className="payment-info">
            <p>
              <strong>Mode Of Payment:</strong> Cash
            </p>
            <p>
              <strong>Name Of User:</strong> GANESH
            </p>
            <small>
              <strong>Amount in Words:</strong> INR Seventy Two Thousand Three
              Hundred Seventy Seven Only.
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
          <small className="note">DD/Cheque subject to be realization.</small>
        </div>
        <div className="receipt-column">
          {/* Student Copy */}
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
                <strong>Receipt No:</strong> 1718/02518
              </p>
              <small>
                <strong>Received From:</strong> Gauri Pandharinath Patole
              </small>
              <p>
                <strong>Mother Name:</strong> Chhaya
              </p>
              <p>
                <strong>Division:</strong> MBA-II-A
              </p>
              <p>
                <strong>Branch:</strong> General
              </p>
            </div>
            <div className="details-right">
              <p>
                <strong>Date:</strong> 7-2-2018
              </p>
              <p>
                <strong>Student-ID:</strong> 1617/ESBS/00283
              </p>
              <p>
                <strong>Course:</strong> MBA
              </p>
              <p>
                <strong>Class:</strong> MBA-II
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
              <tr>
                <td>Tuition Fees /17-18</td>
                <td>57,418.00</td>
              </tr>
              <tr>
                <td>Development Fees /17-18</td>
                <td>12,842.00</td>
              </tr>
              <tr>
                <td>SPPU Student Activity Fees /17-18</td>
                <td>1,000.00</td>
              </tr>
              <tr>
                <td>Miscellaneous Course Fees /17-18</td>
                <td>500.00</td>
              </tr>
              <tr>
                <td>University Prorata Fees /17-18</td>
                <td>592.00</td>
              </tr>
              <tr>
                <td>Students Insurance Fees /17-18</td>
                <td>25.00</td>
              </tr>
            </tbody>
          </table>
          <div className="total-amount">
            <small>
              <strong>Total:</strong> 72,377.00
            </small>
          </div>
          <div className="payment-info">
            <small>
              <strong>Mode Of Payment:</strong> Cash
            </small>
            <small>
              <strong>Name Of User:</strong> GANESH
            </small>
            <small>
              <strong>Amount in Words:</strong> INR Seventy Two Thousand Three
              Hundred Seventy Seven Only.
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
          <small className="note">DD/Cheque subject to be realization.</small>
        </div>
      </div>
    </div>
  );
});

export default FeeSlip;
