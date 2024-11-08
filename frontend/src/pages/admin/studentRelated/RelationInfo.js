import React, { useEffect, useState } from "react";
import axios from "axios";

export const RelationInfo = ({ setStepper, formData, setFormData }) => {
  const [viewTehsil, setViewTehsil] = useState([]);
  const [district, setDistrict] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const ViewTehsil = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allTehsil`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(result);
      if (result.data) {
        console.log(result);
        setViewTehsil(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ViewDistrict = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allDistrict`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(result);
      if (result.data) {
        console.log(result);
        setDistrict(result.data);
        setFormData((prevState) => ({
          ...prevState,
          district: result.data.filter(
            (val) => val.provinceId._id === formData.provinces
          )[0]?.name,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ViewProvinces = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allProvinces`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        // console.log(result);
        ViewDistrict();
        setProvinces(result.data);
        setFormData((prevState) => ({
          ...prevState,
          provinces: result.data[0]?.name,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ViewTehsil();
    ViewDistrict();
    ViewProvinces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("loader")]);
  return (
    <div className="flex justify-between">
      <div className="formGroup">
        <span className="registerTitle">Address Details</span>
        <div style={{ marginTop: "10px" }}>
          <label>Provinces *</label>
          <select
            className="registerInput"
            value={formData.provinces}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                provinces: e.target.value,
              }));
            }}
          >
            <option value="">Select Province</option>

            {provinces.map((val) => (
              <option value={val.province}>{val.province}</option>
            ))}
          </select>
          <label>District *</label>
          <select
            className="registerInput"
            value={formData.district}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                district: e.target.value,
              }));
            }}
          >
            <option value="">Select District</option>

            {district
              ?.filter(
                (val) => val?.provinceId?.province === formData?.provinces
              )
              ?.map((val) => (
                <option value={val.district}>{val.district}</option>
              ))}
          </select>
          <div className="formGroup">
            <label>Tehsil *</label>
            <select
              className="registerInput"
              value={formData.tehsil}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  tehsil: e.target.value,
                }));
              }}
            >
              <option value="">Select Tehsil</option>
              {viewTehsil
                ?.filter(
                  (val) => val?.districtId.district === formData?.district
                )
                ?.map((val) => (
                  <option value={val.tehsil}>{val.tehsil}</option>
                ))}
            </select>

            {/* Candidate Postal Address */}
            <label>Candidate Postal Address *</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter Postal Address..."
              value={formData.postalAddress}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  postalAddress: e.target.value,
                }));
              }}
              autoComplete="postal-address"
            />
          </div>
          <label>Candidate Permanent Address *</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter Permanent Address..."
            value={formData.permanentAddress}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                permanentAddress: e.target.value,
              }));
            }}
            autoComplete="permanent-address"
          />
        </div>
      </div>
      {/* <div className="formGroup">
                </div> */}
      <div className="formGroup">
        <span className="registerTitle">Reference Details</span>
        <div style={{ marginTop: "10px" }}>
          {/* Name of reference */}
          <label>Name of Reference *</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter Name Reference..."
            value={formData.nameOfReference}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                nameOfReference: e.target.value,
              }));
            }}
          />
          <label>Mobile Number of References*</label>
          <input
            className="registerInput"
            type="number"
            placeholder="Enter Mobile Number of References"
            value={formData.numberOfReference}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                numberOfReference: e.target.value,
              }));
            }}
          />
          {/* Relation */}
          <label>Relation *</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter Relation"
            value={formData.relationWithReference}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                relationWithReference: e.target.value,
              }));
            }}
          />

          {/* Other details regarding the reference */}
          <label>Other Details Regarding the Reference</label>
          <textarea
            className="registerInput"
            placeholder="Enter other details..."
            value={formData.otherDetailWithReference}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                otherDetailWithReference: e.target.value,
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
};
