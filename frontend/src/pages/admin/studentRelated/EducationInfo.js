import axios from "axios";
import React, { useEffect, useState } from "react";

export const EducationInfo = ({ setStepper, formData, setFormData }) => {
  const [viewBoard, setViewBoard] = useState([]);
  const [viewClass, setViewClass] = useState([]);

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
  const ViewClass = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/SclassList`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        setViewClass(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ViewBoard();
    ViewClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("loader")]);
  return (
    <div className="">
      <form className="registerForm">
        <span className="registerTitle">Academic Details</span>
        <div className="formGroup">
          <div className="flex justify-between">
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
              <label>Class *</label>
              <select
                className="registerInput"
                value={formData.sclassName}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    sclassName: e.target.value,
                  }));
                }}
              >
                <option value="">Select Class</option>
                {viewClass?.map((val) => (
                  <option value={val?._id}>{val?.sclassName}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between">
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
              <label>Enrollment No *</label>
              <input
                className="registerInput"
                type="text"
                placeholder="Enrollment No"
                value={formData.enrollmentNo}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    enrollmentNo: e.target.value,
                  }));
                }}
                autoComplete="enrollmentNo"
              />
            </div>
          </div>
          <div className="flex justify-between">
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
              <label>Discount Fee *</label>
              <input
                className="registerInput"
                type="text"
                placeholder="In %"
                value={formData.discount}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    discount: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex justify-between">
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
        </div>
      </form>
    </div>
  );
};
