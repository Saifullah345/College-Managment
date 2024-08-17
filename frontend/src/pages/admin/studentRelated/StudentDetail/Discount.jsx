import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Discount = ({ setStepper, formData, setFormData }) => {
  const [viewClass, setViewClass] = useState([]);

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
    ViewClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("loader")]);
  return (
    <div className="">
      <form className="registerForm">
        <span className="registerTitle">Discount</span>
        <div className="flex justify-between">
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
          <Box visibility={"hidden"} className="formGroup">
            <input className="registerInput" type="text" />
          </Box>
        </div>
        <div className="flex justify-between">
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
          <Box visibility={"hidden"} className="formGroup">
            <input className="registerInput" type="text" />
          </Box>
        </div>
      </form>
    </div>
  );
};
