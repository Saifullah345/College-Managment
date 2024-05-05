import React from "react";

export const PersonalInfo = ({ setStepper, formData, setFormData }) => {
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
                value={formData.name}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
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
                value={formData.fatherName}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    fatherName: e.target.value,
                  }));
                }}
                required
              />
            </div>
            <div className="formGroup">
              <label>CNIC *</label>
              <input
                className="registerInput"
                type="tel"
                placeholder="Enter CNIC..."
                value={formData.cnic}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    cnic: e.target.value,
                  }));
                }}
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="formGroup">
              <label>Citizenship *</label>
              <select
                className="registerInput"
                value={formData.citizenship}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    citizenship: e.target.value,
                  }));
                }}
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
                value={formData.dob}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    dob: e.target.value,
                  }));
                }}
                required
              />
            </div>
            <div className="formGroup">
              <label>Religion</label>
              <input
                className="registerInput"
                type="text"
                placeholder="Enter religion..."
                value={formData.religion}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    religion: e.target.value,
                  }));
                }}
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
                value={formData.mobileNumber}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    mobileNumber: e.target.value,
                  }));
                }}
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
                value={formData.whatsAppNumber}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    whatsAppNumber: e.target.value,
                  }));
                }}
                pattern="[0-9]{4}-[0-9]{7}"
              />
            </div>

            <div className="formGroup"></div>
          </div>
          <button className="registerButton" onClick={() => setStepper(2)}>
            Next Step
          </button>
        </form>
      </div>
    </div>
  );
};
