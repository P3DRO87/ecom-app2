import React, { forwardRef, useEffect, useRef, useState } from "react";

const Textarea = forwardRef(
   (
      {
         label = "",
         type = "text",
         className = "",
         error = false,
         helperText = "",
         ...rest
      },
      ref
   ) => {
      const [isFocusActive, setIsFocusActive] = useState(false);

      const inputRef = useRef();

      useEffect(() => {
         const input = inputRef.current.querySelector(".text-field");

         if (input.value) setIsFocusActive(true);
      }, []);

      return (
         <>
            <div className={`label-container${className ? ` ${className}` : ""}`}>
               <div
                  ref={inputRef}
                  className={`text-field-container${
                     isFocusActive ? " focus-active" : ""
                  }${error ? " has-error" : ""}`}
               >
                  <span className="label-text">{label}</span>
                  <textarea
                     // ref={inputRef}
                     ref={ref}
                     {...rest}
                     onBlur={({ target }) => {
                        if (target.value) return;

                        setIsFocusActive(false);
                     }}
                     onFocus={() => {
                        setIsFocusActive(true);
                     }}
                     className="text-field"
                     type={type}
                  />
               </div>
               {error && <span className="error-msg">{helperText}</span>}
            </div>
         </>
      );
   }
);

export default Textarea;
