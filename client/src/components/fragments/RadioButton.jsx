import React from "react";

const RadioButton = ({
   checked = false,
   color = "#121516",
   label = "",
   name = "",
   onChange = function () {},
   ...rest
}) => {
   return (
      <>
         <div className="custom-radio-btn">
            <label className="radio-container d-flex align-items-center">
               <input
                  onChange={onChange}
                  checked={checked}
                  type="radio"
                  name={name}
                  {...rest}
               />
               <span className="inner-circle"></span>
            </label>
            <p className="ms-2">{label}</p>
         </div>
         <style scoped jsx>{`
            .inner-circle {
               border: 2px solid ${color};
            }
            .inner-circle:after {
               background: ${color};
            }
         `}</style>
      </>
   );
};

export default RadioButton;
