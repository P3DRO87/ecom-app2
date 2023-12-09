import React from "react";

const PointerArrow = ({ className = "" }) => {
   return (
      <svg
         className={className}
         focusable="false"
         aria-hidden="true"
         viewBox="0 0 24 24"
         data-testid="ArrowDropDownIcon"
      >
         <path d="M7 10l5 5 5-5z"></path>
      </svg>
   );
};

export default PointerArrow;
