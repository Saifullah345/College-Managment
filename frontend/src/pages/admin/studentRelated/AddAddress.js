import React, { useState } from "react";
// import "./AddLocation.css"; // Import CSS file for styling

export const AddAddress = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleTehsilChange = (event) => {
    setTehsil(event.target.value);
  };

  const handleSave = () => {
    // Here you can add logic to save the entered location data or perform further actions
    console.log("Province:", province);
    console.log("District:", district);
    console.log("Tehsil:", tehsil);
    // Clear the input fields after saving
    setProvince("");
    setDistrict("");
    setTehsil("");
  };

  return (
    <div className="add-location-container">
      <h2>Add Location</h2>
      <div className="input-container">
        <label>Province:</label>
        <input
          type="text"
          value={province}
          onChange={handleProvinceChange}
          placeholder="Enter Province..."
        />
      </div>
      <div className="input-container">
        <label>District:</label>
        <input
          type="text"
          value={district}
          onChange={handleDistrictChange}
          placeholder="Enter District..."
        />
      </div>
      <div className="input-container">
        <label>Tehsil:</label>
        <input
          type="text"
          value={tehsil}
          onChange={handleTehsilChange}
          placeholder="Enter Tehsil..."
        />
      </div>
      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );
};

