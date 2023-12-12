import { isMobileDevice } from "@/helpers/isMobileDevice";
import React, { forwardRef, useEffect, useState } from "react";

const Textarea = forwardRef(
   (
      {
         label = "",
         className = "",
         error = false,
         helperText = "",

         ...rest
      },
      ref
   ) => {
      const [isScrolled, setIsScrolled] = useState(false);
      const [isMobile, setIsMobile] = useState(null);

      useEffect(() => {
         const handleResize = () => {
            setIsMobile(isMobileDevice());
         };

         handleResize();

         window.addEventListener("resize", handleResize);

         return () => window.removeEventListener("resize", handleResize);
      }, []);

      return (
         <>
            <div
               className={`label-container${className ? ` ${className}` : ""} textarea`}
            >
               <div
                  className={`text-field-container focus-active${
                     error ? " has-error" : ""
                  }`}
               >
                  <span
                     style={{ width: isMobile ? "100%" : "97%" }}
                     className={`label-text${isScrolled ? ` scroll-active` : ""}`}
                  >
                     {label}
                  </span>
                  <textarea
                     ref={ref}
                     {...rest}
                     onScroll={({ currentTarget }) => {
                        setIsScrolled(currentTarget.scrollTop > 0);
                     }}
                     className="text-field"
                  />
               </div>
               {error && <span className="error-msg">{helperText}</span>}
            </div>
         </>
      );
   }
);

export default Textarea;
