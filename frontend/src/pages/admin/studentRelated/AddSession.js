import React, { useState } from "react";

const AddSession = () => {
  const [session, setSession] = useState("");

  const handleSessionChange = (event) => {
    setSession(event.target.value);
  };

  const handleSave = () => {
    // Here you can add logic to save the session data or perform further actions
    console.log("Session:", session);
    // Clear the input field after saving
    setSession("");
  };

  return (
    <div>
      <h2>Add Session</h2>
      <div>
        <label>Session:</label>
        <input
          type="text"
          value={session}
          onChange={handleSessionChange}
          placeholder="Enter Session..."
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddSession;
