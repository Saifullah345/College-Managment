import React from "react";

export const AcademicDetail = () => {
  return (
    
    <div>
      
      {/* <div className="flex justify-between"> */}
        <div className="formGroup">
        <span className="registerTitle">Documents Details</span>

          
           {/* Document Upload Fields */}
      <div className="flex justify-between">
        <div className="formGroup">
          <label>Student Profile Photo *</label>
          <input
            className="registerInput"
            type="file"
            accept="image/*"
            // onChange={(event) => handleProfilePhotoUpload(event)}
            required
          />
          <label>ID Card Front Photo *</label>
          <input
            className="registerInput"
            type="file"
            accept="image/*"
            // onChange={(event) => handleIDCardFrontUpload(event)}
            required
          />
        </div>
       
      </div>
      <div className="flex justify-between">
        <div className="formGroup">
          <label>ID Card Back Photo *</label>
          <input
            className="registerInput"
            type="file"
            accept="image/*"
            // onChange={(event) => handleIDCardBackUpload(event)}
            required
          />
          <label>Metric Certificate *</label>
          <input
            className="registerInput"
            type="file"
            accept=".pdf"
            // onChange={(event) => handleMetricCertificateUpload(event)}
            required
          />
        </div>
       
      </div>
    </div>
    </div>
  );
};
