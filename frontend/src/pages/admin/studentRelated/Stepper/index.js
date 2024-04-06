import React from "react";
import "./index.css";

export const Stepper = ({ setStepper, stepper }) => {
  return (
    <div className="stepper">
      <div
        className={`step ${
          stepper === 1 ? "active cursorNone" : "cursorPointer"
        }`}
        onClick={() => setStepper(1)}
      >
        {/* <span className="step-number">2</span> */}
        <span className="step-label">Step 1</span>
        <span className="step-line"></span>
      </div>
      <div
        className={`step ${
          stepper === 2 ? "active cursorNone" : "cursorPointer"
        }`}
        onClick={() => setStepper(2)}
      >
        {/* <span className="step-number">2</span> */}
        <span className="step-label">Step 2</span>
        <span className="step-line"></span>
      </div>
      <div
        className={`step ${
          stepper === 3 ? "active cursorNone" : "cursorPointer"
        }`}
        onClick={() => {
          setStepper(3);
        }}
      >
        {/* <span className="step-number">3</span> */}
        <span className="step-label">Step 3</span>
        <span className="step-line"></span>
      </div>
    </div>
  );
};
