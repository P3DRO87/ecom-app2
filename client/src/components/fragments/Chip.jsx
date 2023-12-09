import React from "react";

const Chip = ({ label, color = "success", className = "", icon, ...rest }) => {
   return (
      <div className={`chip ${color}${className ? ` ${className}` : ""}`} {...rest}>
         {icon}
         <span className={`${icon ? "ms-1" : ""}`}>{label}</span>
      </div>
   );
};

export default Chip;
