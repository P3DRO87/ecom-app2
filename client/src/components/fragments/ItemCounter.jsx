import React, { useEffect, useRef, useState } from "react";
import { BsDash, BsPlus } from "react-icons/bs";

const ItemCounter = ({
   initialValue = 1,
   maxValue = Infinity,
   onValueChange = function () {},
   onInitialMinValue = function () {},
}) => {
   const [currentValue, setCurrentValue] = useState(initialValue);

   const isInitialValue = useRef(true);

   const handleDecreaseCurrentVal = () => {
      if (currentValue <= 1) return onInitialMinValue();

      setCurrentValue((prev) => prev - 1);
      isInitialValue.current = false;
   };

   const handleIncreaseCurrentVal = () => {
      if (currentValue >= maxValue) return;

      setCurrentValue((prev) => prev + 1);
      isInitialValue.current = false;
   };

   useEffect(() => {
      if (isInitialValue.current) return;

      onValueChange(currentValue);
   }, [currentValue, isInitialValue]);

   return (
      <div className="item-counter d-flex gap-3 align-items-center">
         <button onClick={handleDecreaseCurrentVal}>
            <BsDash color="#000" />
         </button>
         <p className="mb-0 text-bold-600">{currentValue}</p>
         <button onClick={handleIncreaseCurrentVal}>
            <BsPlus color="#000" />
         </button>
      </div>
   );
};

export default ItemCounter;
