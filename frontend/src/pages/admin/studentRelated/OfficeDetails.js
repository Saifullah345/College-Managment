import { Box } from "@mui/material";
import React from "react";

export const OfficeDetails = ({ setStepper, formData, setFormData }) => {
  return (
    <form className="formGroup">
      <span className="registerTitle">Office Details</span>
      <div className="formGroup" style={{ marginTop: "10px" }}>
        <div className="formGroup">
          <label>GR Number *</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter GR Number..."
            // value={formData.serialNumber}
            // onChange={(e) => {
            //   setFormData((prevState) => ({
            //     ...prevState,
            //     serialNumber: e.target.value,
            //   }));
            // }}
          />
        </div>
        <div className="formGroup">
          <label>Enrollment Number *</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter Enrollment Number..."
            value={formData.enrollmentNo}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                enrollmentNo: e.target.value,
              }));
            }}
          />
          <Box visibility={"hidden"} className="formGroup">
            <input className="registerInput" type="text" />
          </Box>
        </div>
      </div>
    </form>
  );
};
