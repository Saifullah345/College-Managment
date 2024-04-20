import React, { useEffect, useState } from "react";
import axios from "axios";

export const RelationInfo = ({ setStepper }) => {
  const [districts, setDistricts] = useState([]);
  const [select, setSelect] = useState({});

  const ViewDistrict = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/districtview`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.data) {
        console.log(result);
        setDistricts(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ViewDistrict();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="formGroup">
          <span className="registerTitle">Adress Details</span>
          <label>District *</label>
          <select
            className="registerInput"
            required
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district._id}>
                {district.district}
              </option>
            ))}
          </select>
          <div className="formGroup">
            <label>Tehsil *</label>
            <select
              className="registerInput"
              // value={tehsil}
              // onChange={(event) => setTehsil(event.target.value)}
              required
            >
              <option value="">Select Tehsil</option>
              {districts
                ?.find((val) => val._id === select)
                ?.tehsil?.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              {/* Add more tehsil options as needed */}
            </select>

            {/* Candidate Postal Address */}
            <label>Candidate Postal Address *</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter Postal Address..."
              // value={postalAddress}
              // onChange={(event) => setPostalAddress(event.target.value)}
              autoComplete="postal-address"
              required
            />
          </div>
          <label>Candidate Permanent Address *</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter Permanent Address..."
            // value={permanentAddress}
            // onChange={(event) =>
            // setPermanentAddress(event.target.value)
            // }
            autoComplete="permanent-address"
            required
          />
        </div>
        {/* <div className="formGroup">
                </div> */}
        <div className="formGroup">
          <span className="registerTitle">Reference Details</span>
          {/* Name of reference */}
          <label>Name of Reference *</label>
          <input
            className="registerInput"
            type="text"
            // value={nameOfReference}
            placeholder="Enter Name Reference..."
            // onChange={(event) => setNameOfReference(event.target.value)}
            required
          />
          <label>Number of References *</label>
          <input
            className="registerInput"
            type="number"
            placeholder="Enter Number of References"
            // value={numberOfReferences}
            // onChange={(event) => setNumberOfReferences(event.target.value)}
            required
          />
          {/* Relation */}
          <label>Relation *</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter Relation"
            // value={relation}
            // onChange={(event) => setRelation(event.target.value)}
            required
          />

          {/* Other details regarding the reference */}
          <label>Other Details Regarding the Reference</label>
          <textarea
            className="registerInput"
            placeholder="Enter other details..."
            // value={otherDetails}
            // onChange={(event) => setOtherDetails(event.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button className="registerButton" onClick={() => setStepper(1)}>
          Previous Step
        </button>
        <button className="registerButton" onClick={() => setStepper(4)}>
          Next Step
        </button>
      </div>
    </div>
  );
};
