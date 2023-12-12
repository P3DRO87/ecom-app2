import React from "react";

const Checkbox = ({
   checked = false,
   onChange = function () {},
   label = "",
   className,
   ...rest
}) => {
   return (
      <div className={`custom-checkbox${className ? ` ${className}` : ""}`}>
         <label className="checkbox-container d-flex align-items-center">
            <input checked={checked} onChange={onChange} type="checkbox" {...rest} />
            <span className="checkmark"></span>
            <p className="ms-2">{label}</p>
         </label>
      </div>
   );
};

export default Checkbox;
