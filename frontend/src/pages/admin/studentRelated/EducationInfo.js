import React from "react";

export const EducationInfo = ({ setStepper }) => {
  return (
    <div>
      <div className="register-form">
        <form className="registerForm">
          <span className="registerTitle">Academic Details</span>

          <div className="flex justify-between">
            <div className="formGroup">
              <label>Matric Result *</label>
              <input
                className="registerInput"
                type="text"
                placeholder="Enter Matric result..."
                // value={MatricResult}
                // onChange={(event) => setMatricResult(event.target.value)}
                required
              />
              <div className="formGroup">
                <label>Matric Document *</label>
                <input
                  className="registerInput"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  // onChange={handleMatricDocumentUpload}
                  required
                />
              </div>
            </div>
            <div className="formGroup">
              <div className="formGroup">
                <label>FSC Result *</label>
                <input
                  className="registerInput"
                  type="text"
                  placeholder="Enter FSC result..."
                  // value={fscResult}
                  // onChange={(event) => setFscResult(event.target.value)}
                  required
                />
                <div className="formGroup">
                  <label>FSC Document *</label>
                  <input
                    className="registerInput"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    // onChange={handleFscDocumentUpload}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button className="registerButton" onClick={() => setStepper(1)}>
              Previous Step
            </button>
            <button className="registerButton" onClick={() => setStepper(3)}>
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
