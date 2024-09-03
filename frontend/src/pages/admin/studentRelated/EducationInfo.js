import axios from "axios";
import React, { useEffect, useState } from "react";
import { OfficeDetails } from "./OfficeDetails";

export const EducationInfo = ({ setStepper, formData, setFormData }) => {
  const [viewBoard, setViewBoard] = useState([]);

  const ViewBoard = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allBoard`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        setViewBoard(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ViewBoard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("loader")]);
  return (
    <div className="flex justify-between">
      <form className="formGroup">
        <span className="registerTitle">Academic Details</span>
        <div className="formGroup" style={{ marginTop: "10px" }}>
          <div className="formGroup">
            <label>Degree Program *</label>
            <select
              className="registerInput"
              // value={formData.program}
              // onChange={(e) => {
              //   setFormData((prevState) => ({
              //     ...prevState,
              //     program: e.target.value,
              //   }));
              // }}
            >
              <option value="">Select Degree Program</option>
              <option value="matric">Matric</option>
              <option value="intermediate">Intermediate</option>
              <option value="graduation">Graduation</option>
              <option value="master">Master</option>
            </select>
          </div>

          <div className="formGroup">
            <label>Board *</label>
            <select
              className="registerInput"
              value={formData.board}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  board: e.target.value,
                }));
              }}
            >
              <option value="">Select Board</option>
              {viewBoard?.map((val) => (
                <option value={val?.name}>{val?.name}</option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label>Serial Number *</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter Serial Number..."
              value={formData.serialNumber}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  serialNumber: e.target.value,
                }));
              }}
            />
          </div>

          <div className="formGroup">
            <label>Roll Number *</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter Roll Number..."
              value={formData.rollNumber}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  rollNumber: e.target.value,
                }));
              }}
            />
          </div>

          <div className="formGroup">
            <label>Years of Passing *</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter Years of Passing..."
              value={formData.yearOfPassing}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  yearOfPassing: e.target.value,
                }));
              }}
            />
          </div>
        </div>
      </form>
      <OfficeDetails formData={formData} setFormData={setFormData} />
    </div>
  );
};
