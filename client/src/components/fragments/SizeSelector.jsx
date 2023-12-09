import React from "react";

const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => {
   return (
      <div className="size-selector">
         {sizes.map((size) => (
            <button
               onClick={() => onSelectSize(size)}
               key={size}
               className={size === selectedSize ? "btn-primary" : ""}
            >
               {size}
            </button>
         ))}
      </div>
   );
};

export default SizeSelector;
