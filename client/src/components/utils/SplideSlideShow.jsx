import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useRef } from "react";
import ArrowIcon from "./SlideShow/ArrowIcon";

const SplideSlideShow = ({ children }) => {
   const items = React.Children.toArray(children);

   const splideRef = useRef();

   const handleSlidePrev = () => {
      splideRef.current.splide.go("<");
   };

   const handleSlideNext = () => {
      splideRef.current.splide.go(">");
   };

   return (
      <div className="slide-show-container">
         <button onClick={handleSlidePrev} className="btn-slide prev-btn">
            <ArrowIcon />
         </button>
         <button onClick={handleSlideNext} className="btn-slide next-btn">
            <ArrowIcon />
         </button>
         <Splide
            ref={splideRef}
            options={{ type: "loop", autoplay: true, interval: 5000, arrows: false }}
         >
            {items.map((item) => (
               <SplideSlide key={item.key}>{item}</SplideSlide>
            ))}
         </Splide>
      </div>
   );
};

export default SplideSlideShow;
