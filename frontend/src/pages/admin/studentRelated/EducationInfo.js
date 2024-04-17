import React from "react";

export const EducationInfo = ({ setStepper }) => {
  return (
    <div>
      <div className="register-form">
        <form className="registerForm">
          <span className="registerTitle">Academic Details</span>

          <div className="flex justify-between">
            
              <div className="formGroup">
        <label>Degree Program *</label>
        <select
          className="registerInput"
          // value={degreeProgram}
          // onChange={(event) => setDegreeProgram(event.target.value)}
          required
        >
          <option value="">Select Degree Program</option>
          <option value="Bachelor of Science">Bachelor of Science</option>
          <option value="Bachelor of Arts">Bachelor of Arts</option>
          <option value="Master of Science">Master of Science</option>
          <option value="Master of Arts">Master of Arts</option>
          <option value="PhD">PhD</option>
          {/* Add more degree programs as needed */}
        </select>
        <div className="formGroup">
  <label>Board *</label>
  <select
    className="registerInput"
    // value={board}
    // onChange={(event) => setBoard(event.target.value)}
    required
  >
    <option value="">Select Board</option>
    <option value="BISE Lahore">BISE Lahore</option>
    <option value="BISE Gujranwala">BISE Gujranwala</option>
    <option value="BISE Multan">BISE Multan</option>
    <option value="BISE Faisalabad">BISE Faisalabad</option>
    <option value="BISE Sargodha">BISE Sargodha</option>
    <option value="BISE Rawalpindi">BISE Rawalpindi</option>
    <option value="BISE Bahawalpur">BISE Bahawalpur</option>
    <option value="BISE DG Khan">BISE DG Khan</option>
    <option value="BISE Sahiwal">BISE Sahiwal</option>
    <option value="BISE Federal">BISE Federal</option>
  </select>
</div>
<label>Serial Number *</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter Serial Number..."
          // value={serialNumber}
          // onChange={(event) => setSerialNumber(event.target.value)}
          required
        />
         <label>Roll Number *</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter Roll Number..."
          // value={rollNumber}
          // onChange={(event) => setRollNumber(event.target.value)}
          required
        />
        <label>Years of Passing *</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter Years of Passing..."
          // value={yearsOfPassing}
          // onChange={(event) => setYearsOfPassing(event.target.value)}
          required
        />
      </div>

      

      <div className="formGroup">
       
      </div>
      
          
         
          </div>     
          <div className="flex justify-between">

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
