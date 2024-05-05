import axios from "axios";
import React, { useEffect, useState } from "react";

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
      console.log(result);
      if (result.data) {
        console.log(result);
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
    <div>
      <div className="register-form">
        <form className="registerForm">
          <span className="registerTitle">Academic Details</span>

          <div className="flex justify-between">
            <div className="formGroup">
              <label>Degree Program *</label>
              <select
                className="registerInput"
                value={formData.program}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    program: e.target.value,
                  }));
                }}
                required
              >
                <option value="">Select Degree Program</option>
                <option value="Bachelor of Science">Bachelor of Science</option>
                <option value="Bachelor of Arts">Bachelor of Arts</option>
                <option value="Master of Science">Master of Science</option>
                <option value="Master of Arts">Master of Arts</option>
                <option value="PhD">PhD</option>
                {/* Add more degree programs as needed */}
              </select>
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
                  required
                >
                  <option value="">Select Board</option>
                  {viewBoard?.map((val) => (
                    <option value={val?.name}>{val?.name}</option>
                  ))}
                </select>
              </div>
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
                required
              />
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
                required
              />
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
                required
              />
            </div>

            <div className="formGroup"></div>
          </div>
          <div className="flex justify-between"></div>
          <div className="flex justify-between">
            <button className="registerButton" onClick={() => setStepper(1)}>
              Previous Step
            </button>
            <button className="registerButton" onClick={() => setStepper(3)}>
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
