import React from "react";
import "./Registration.css";

export function RegistrationLayout({ children }) {
  return (
    <div className="registration-wrapper">
      <div className="registration-content">
        {children}
      </div>
    </div>
  );
}
