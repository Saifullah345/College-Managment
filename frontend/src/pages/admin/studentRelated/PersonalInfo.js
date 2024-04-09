import React from "react";

export const PersonalInfo = ({ setStepper }) => {
  return (
    <div>
      <div className="register-form">
        <form className="registerForm">
          <span className="registerTitle">Personal Details</span>

          <div className="flex justify-between">
            <div className="formGroup">
              <label>Student Profile Photo *</label>
              <input
                type="file"
                accept="image/*"
                //   onChange={handleProfilePhotoUpload}
                required
              />
            </div>
            <div className="formGroup">
              <label>Full Name *</label>
              <input
                className="registerInput"
                type="text"
                placeholder="Enter full name..."
                //   value={name}
                //   onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="formGroup">
              <label>Father Name *</label>
              <input
                className="registerInput"
                type="text"
                placeholder="Enter father's name..."
                //   value={fatherName}
                //   onChange={(event) => setFatherName(event.target.value)}
                required
              />
            </div>
            <div className="formGroup">
              <label>Citizenship *</label>
              <select
                className="registerInput"
                //   value={citizenship}
                //   onChange={(event) => setCitizenship(event.target.value)}
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
          </div>

          <div className="flex justify-between">
            <div className="formGroup">
              <label>CNIC *</label>
              <input
                className="registerInput"
                type="text"
                placeholder="Enter CNIC..."
                //   value={cnic}
                //   onChange={(event) => setCnic(event.target.value)}
                required
              />
            </div>
            <div className="formGroup">
              <label>Contact No *</label>
              <input
                className="registerInput"
                type="tel"
                placeholder="Enter contact number..."
                //   value={contactNo}
                //   onChange={(event) => setContactNo(event.target.value)}
                pattern="[0-9]{4}-[0-9]{7}"
                required
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="formGroup">
              <label>Gender *</label>
              <select
                className="registerInput"
                //   value={gender}
                //   onChange={(event) => setGender(event.target.value)}
                required
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="formGroup">
              <label>Religion</label>
              <input
                className="registerInput"
                type="text"
                placeholder="Enter religion..."
                //   value={religion}
                //   onChange={(event) => setReligion(event.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="formGroup">
              <label>Date of Birth *</label>
              <input
                className="registerInput"
                type="date"
                //   value={dob}
                //   onChange={(event) => setDob(event.target.value)}
                required
              />
            </div>

            <div className="formGroup">
              <label>Qualification *</label>
              <input
                className="registerInput"
                type="text"
                placeholder="Enter qualification..."
                //   value={qualification}
                //   onChange={(event) => setQualification(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="formGroup">
              <label>Date of Admission *</label>
              <input
                className="registerInput"
                type="date"
                //   value={admissionDate}
                //   onChange={(event) => setAdmissionDate(event.target.value)}
                required
              />
            </div>
            <div className="formGroup">
              <label>Concerned Board *</label>
              <select
                className="registerInput"
                //   value={concernedBoard}
                //   onChange={(event) => setConcernedBoard(event.target.value)}
                required
              >
                <option value="">Select Concerned Board</option>
                <option value="Federal Board of Intermediate and Secondary Education">
                  Federal Board of Intermediate and Secondary Education
                </option>
                <option value="Lahore Board of Intermediate and Secondary Education">
                  Lahore Board of Intermediate and Secondary Education
                </option>
                <option value="Punjab Board of Technical Education">
                  Punjab Board of Technical Education
                </option>
                {/* Add more board options as needed */}
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="registerButton" onClick={() => setStepper(2)}>
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
