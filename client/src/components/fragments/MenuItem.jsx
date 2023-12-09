import React, { useRef, useState } from "react";
import PointerArrow from "./Icons/PointerArrow";
import { useEffect } from "react";
import TrasitionTrigger, { ActiveClassEl } from "../utils/TrasitionTrigger";

const MenuItem = ({
   children,
   className = "",
   label = "",
   defaultValue = "",
   values = [],
   onChange = function () {},
}) => {
   const menuItemRef = useRef();

   const [isMenuActive, setIsMenuActive] = useState(false);
   const [selectedValue, setSelectedValue] = useState(defaultValue);

   const items = React.Children.toArray(children);

   const handleOpenMenu = () => {
      setIsMenuActive(true);
   };

   const handleSelectValue = ({ item, index }) => {
      setSelectedValue(item);
      onChange(values[index]);
      setIsMenuActive(false);
   };

   useEffect(() => {
      const handleCloseMenu = ({ target }) => {
         if (target === menuItemRef.current.querySelector(".text-field")) {
            return;
         }

         setIsMenuActive(false);
      };

      document.addEventListener("click", handleCloseMenu);

      return () => document.removeEventListener("click", handleCloseMenu);
   }, [isMenuActive]);

   return (
      <div
         ref={menuItemRef}
         onClick={handleOpenMenu}
         className={`menu-item${className ? ` ${className}` : ""}`}
      >
         <div className="text-field-container focus-active">
            <span className="label-text">{label}</span>
            <p className="text-field">{selectedValue}</p>
         </div>
         <PointerArrow className="pointer-arrow" />
         <TrasitionTrigger trigger={isMenuActive} activeClass="active">
            <div className="menu-item-container">
               <ActiveClassEl el="ul" className="selection-menu">
                  {items.map((item, i) => (
                     <li
                        onClick={() => handleSelectValue({ item, index: i })}
                        key={item.key}
                     >
                        {item}
                     </li>
                  ))}
               </ActiveClassEl>
            </div>
         </TrasitionTrigger>
      </div>
   );
};

export default MenuItem;
