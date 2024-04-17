import React from "react";

export const PersonalInfo = ({ setStepper }) => {
  return (
    <div>
      <div className="register-form">
        <form className="registerForm">
          <span className="registerTitle">Personal Details</span>

          <div className="flex justify-between">
              
                <div className="formGroup">
                  <label>Full Name *</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter full name..."
                    // value={name}
                    // onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="formGroup">
                  <label>Father Name *</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter father's name..."
                    // value={fatherName}
                    // onChange={(event) => setFatherName(event.target.value)}
                    required
                  />
                </div>
                <div className="formGroup">
                <label>CNIC *</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter CNIC..."
                    // value={cnic}
                    // onChange={(event) => setCnic(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between">
                
                <div className="formGroup">
                <label>Citizenship *</label>
                  <select
                    className="registerInput"
                    // value={citizenship}
                    // onChange={(event) => setCitizenship(event.target.value)}
                    required
                  >
                    <option value="">Select Country of Citizenship</option>
                    <option value="US">Country: United States</option>
                    <option value="UK">Country: United Kingdom</option>
                    <option value="CA">Country: Canada</option>
                    <option value="PK">Country: Pakistan</option>
                    {/* Add more options as needed */}
                  </select>
                  
                </div>
                <div className="formGroup">
                <label>Date of Birth *</label>
                  <input
                    className="registerInput"
                    type="date"
                    // value={dob}
                    // onChange={(event) => setDob(event.target.value)}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label>Religion</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter religion..."
                    // value={religion}
                    // onChange={(event) => setReligion(event.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="formGroup">
                  
                <label>Mobile Number *</label>
      <input
        className="registerInput"
        type="tel"
        placeholder="Enter Mobile number..."
        // value={mobileNumber}
        // onChange={(event) => setMobileNumber(event.target.value)}
        pattern="[0-9]{4}-[0-9]{7}"
        required
      />          
                </div>

                <div className="formGroup">
                 
      <label>WhatsApp Number</label>
      <input
        className="registerInput"
        type="tel"
        placeholder="Enter WhatsApp number..."
        // value={whatsappNumber}
        // onChange={(event) => setWhatsappNumber(event.target.value)}
        pattern="[0-9]{4}-[0-9]{7}"
      />
                
                </div>

                <div className="formGroup">
                
                </div>
              </div>
          <button className="registerButton" onClick={() => setStepper(2)}>
            Next Step
          </button>
        </form>
      </div>
    </div>
  );
};
