import React, { useState } from "react";
import "./BoardInformation.css"; // Import CSS file for styling

const BoardInformation = () => {
  const [boardName, setBoardName] = useState("");
  const [boardAddress, setBoardAddress] = useState("");
  const [boardDetails, setBoardDetails] = useState("");

  const handleBoardNameSave = (event) => {
    setBoardName(event.target.value);
  };

  const handleBoardAddressSave = (event) => {
    setBoardAddress(event.target.value);
  };

  const handleBoardDetailsSave = (event) => {
    setBoardDetails(event.target.value);
  };

  const handleSave = () => {
    // Here you can add logic to save the board information or perform further actions
    console.log("Board Name:", boardName);
    console.log("Board Address:", boardAddress);
    console.log("Board Details:", boardDetails);
    // Clear the input fields after saving
    setBoardName("");
    setBoardAddress("");
    setBoardDetails("");
  };

  return (
    <div className="board-information-container">
      <h2>Add Board Information</h2>
      <div className="input-container">
        <label>Board Name:</label>
        <input
          type="text"
          value={boardName}
          onChange={handleBoardNameSave}
          placeholder="Enter Board Name..."
        />
      </div>
      <div className="input-container">
        <label>Board Address:</label>
        <input
          type="text"
          value={boardAddress}
          onChange={handleBoardAddressSave}
          placeholder="Enter Board Address..."
        />
      </div>
      <div className="input-container">
        <label>Board Details:</label>
        <input
          type="text"
          value={boardDetails}
          onChange={handleBoardDetailsSave}
          placeholder="Enter Board Details..."
        />
      </div>
      <button className="save-button" onClick={handleSave}>Save</button>

      {/* Displaying all information */}
      <div className="board-info-display">
        <h2>Board Information</h2>
        <p><strong>Name:</strong> {boardName}</p>
        <p><strong>Address:</strong> {boardAddress}</p>
        <p><strong>Details:</strong> {boardDetails}</p>
      </div>
    </div>
  );
};

export default BoardInformation;

