import React from "react";
import { CircularProgress } from "@mui/material";
import { PersonalInfo } from "../PersonalInfo";
import { EducationInfo } from "../EducationInfo";
import { AcademicDetail } from "../AcademicDetail";
import { RelationInfo } from "../RelationInfo";

const UpdateStudentForm = ({ formData, setFormData, loader }) => {
  return (
    <>
      {/* <Stepper setStepper={setStepper} stepper={stepper} /> */}

      <PersonalInfo
        // setStepper={setStepper}
        formData={formData}
        setFormData={setFormData}
      />
      <hr />
      <EducationInfo
        // setStepper={setStepper}
        formData={formData}
        setFormData={setFormData}
      />
      <hr />
      <RelationInfo
        // setStepper={setStepper}
        formData={formData}
        setFormData={setFormData}
      />
      {/* <hr /> */}
      {/* <AcademicDetail formData={formData} setFormData={setFormData} /> */}

      {/* Additional input fields */}

      <button className="registerButton" type="submit" disabled={loader}>
        {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
      </button>
    </>
  );
};

export default UpdateStudentForm;
