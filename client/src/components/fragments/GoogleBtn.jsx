import React from "react";
import GoogleLogo from "./Icons/GoogleLogo";

const GoogleBtn = ({ label = "Continuar con google", className = "", ...rest }) => {
   return (
      <button className={`google-btn${className ? ` ${className}` : ""}`} {...rest}>
         <GoogleLogo />
         <span className="ms-2 text-bold-600">{label}</span>
      </button>
   );
};

export default GoogleBtn;
