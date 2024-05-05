import React from "react";

export const AcademicDetail = ({ formData, setFormData }) => {
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
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  studentProfile: e.target.files[0],
                }));
              }}
              required
            />
            <label>ID Card Front Photo *</label>
            <input
              className="registerInput"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  idCardFront: e.target.files[0],
                }));
              }}
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
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  idCardBack: e.target.files[0],
                }));
              }}
              required
            />
            <label>Metric Certificate *</label>
            <input
              className="registerInput"
              type="file"
              // value={URL?.createObjectURL(formData?.MetricDMC)}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  MetricDMC: e.target.files[0],
                }));
              }}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
