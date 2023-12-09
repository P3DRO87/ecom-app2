import React, { forwardRef, useEffect, useId, useRef, useState } from "react";

const Input = forwardRef(
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

      const id = useId();

      const inputRef = useRef();

      useEffect(() => {
         const input = inputRef.current.querySelector(".text-field");

         if (input.value) setIsFocusActive(true);
      }, []);

      return (
         <>
            <div className={`label-container${className ? ` ${className}` : ""}`}>
               <label
                  ref={inputRef}
                  className={`text-field-container${
                     isFocusActive ? " focus-active" : ""
                  }${error ? " has-error" : ""}`}
                  htmlFor={id}
               >
                  <span className="label-text">{label}</span>
                  <input
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
                     id={id}
                     className="text-field"
                     type={type}
                  />
               </label>
               {error && <span className="error-msg">{helperText}</span>}
            </div>
         </>
      );
   }
);

export default Input;
