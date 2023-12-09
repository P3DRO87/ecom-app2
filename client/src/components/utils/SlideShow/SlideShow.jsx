import React, { useEffect, useRef, useState } from "react";
import ArrowIcon from "./ArrowIcon";

const putLastFirstInArray = (arr) => {
   return [arr.at(-1), ...arr.filter((_, i) => i !== arr.length - 1)];
};

const ItemsWithTwo = ({ items }) => {
   return [
      ...items.map((item) => (
         <div key={item.key} className="slide-show-item">
            {item}
         </div>
      )),
      <div key={items.length - 1} className="slide-show-item">
         {items[0]}
      </div>,
   ];
};

const SlideShow = ({ children, autoPlay = false, autoPlayIntervalMS = 5000 }) => {
   const [directionValue, setDirectionValue] = useState(1);
   const [isDraggingNext, setIsDraggingNext] = useState(false);
   const [isTransitionActive, setIsTransitionActive] = useState(false);
   const [isPressed, setIsPressed] = useState(false);
   const [isDragging, setIsDragging] = useState(false);
   const [startOffsetX, setStartOffsetX] = useState(0);
   const [currentItemXPos, setCurrentItemXPos] = useState(0);
   const [totalDistance, setTotalDistance] = useState(1);
   const [distancePlus, setDistancePlus] = useState(null);
   const [isDraggedNextSlide, setIsDraggedNextSlide] = useState(null);
   const [isSlideBtnClicked, setIsSlideBtnClicked] = useState(false);

   const slideShowWidth = useRef();

   const [items, setItems] = useState(
      React.Children.toArray(putLastFirstInArray(children))
   );

   const slideShowRef = useRef();

   const handleSlidePrev = async () => {
      setIsSlideBtnClicked(true);

      handleSlideTrasitionEnd();

      setItems(putLastFirstInArray(items));
      setDirectionValue(2);

      await new Promise((resolve) => setTimeout(() => resolve(), 0));

      setDirectionValue(1);
      setIsTransitionActive(true);
   };

   const handleSlideNext = async () => {
      setIsSlideBtnClicked(true);

      handleSlideTrasitionEnd();

      setItems((prev) => [...prev.filter((_, i) => i !== 0), prev[0]]);
      setDirectionValue(0);

      await new Promise((resolve) => setTimeout(() => resolve(), 0));

      setDirectionValue(1);
      setIsTransitionActive(true);
   };

   const handleSlideTrasitionEnd = () => {
      if (!isTransitionActive) return;

      if (isSlideBtnClicked) {
         setIsTransitionActive(false);
         return setDirectionValue(1);
      }

      if (isDraggedNextSlide === false) {
         setDirectionValue(1);
         return setIsTransitionActive(false);
      }

      setIsSlideBtnClicked(false);
      setItems(putLastFirstInArray(items));

      setDirectionValue(1);
      setIsTransitionActive(false);
   };

   const handleStartDragging = (e) => {
      const { clientX } = e;

      setIsSlideBtnClicked(false);

      handleSlideTrasitionEnd();

      setDirectionValue(1);
      setIsTransitionActive(false);

      setIsPressed(true);

      const { x } = slideShowRef.current.getBoundingClientRect();

      if (!slideShowWidth.current) slideShowWidth.current = x;

      const offsetXFromStart = (clientX || e.touches[0].pageX) - slideShowWidth.current;

      setStartOffsetX(offsetXFromStart);

      setIsDragging(true);
   };

   const handleDragMove = (e) => {
      if (!isPressed) return;

      const { currentTarget, clientX } = e;

      const mouseX = clientX || e.touches[0].pageX;

      const { left } = currentTarget.getBoundingClientRect();
      const offsetXFromStart = mouseX - left;

      const distanceX = Math.abs(mouseX - distancePlus);

      const totalDistance = Math.sqrt(distanceX ** 2) || 1;

      setTotalDistance(totalDistance);

      const nextOffsetX = offsetXFromStart - startOffsetX;

      const nextItemPosX = currentItemXPos + nextOffsetX;

      setDistancePlus(mouseX);

      setCurrentItemXPos(nextItemPosX);
   };

   useEffect(() => {
      const handleSetSlideShowRefWidth = () => {
         const { x } = slideShowRef.current.getBoundingClientRect();

         slideShowWidth.current = x;
      };

      window.addEventListener("resize", handleSetSlideShowRefWidth);

      return () => window.removeEventListener("resize", handleSetSlideShowRefWidth);
   }, []);

   useEffect(() => {
      const slideAfterDrag = (isDraggedNextSlide) => {
         setIsDraggingNext(isDraggedNextSlide);
         setDirectionValue(isDraggedNextSlide ? 2 : 0);
         setIsTransitionActive(true);
      };

      const handleEndDragging = () => {
         const nextOffsetX = currentItemXPos * totalDistance;

         setCurrentItemXPos(nextOffsetX);

         const { width } = slideShowRef.current.getBoundingClientRect();

         const isSWipingToNext = Math.sign(nextOffsetX) === -1;

         if (isSWipingToNext && Math.abs(nextOffsetX) >= width / 2) {
            slideAfterDrag(true);
            setIsDraggedNextSlide(true);
         } else if (!isSWipingToNext && Math.abs(nextOffsetX) >= width / 2) {
            slideAfterDrag(false);
            setIsDraggedNextSlide(true);
         } else if (nextOffsetX !== 0) {
            setIsTransitionActive(true);
            setIsDraggedNextSlide(false);
         }

         setIsPressed(false);
         setIsDragging(false);
         setCurrentItemXPos(0);
      };

      document.addEventListener("touchend", handleEndDragging);
      document.addEventListener("mouseup", handleEndDragging);

      return () => {
         document.removeEventListener("mouseup", handleEndDragging);
         document.removeEventListener("touchend", handleEndDragging);
      };
   }, [currentItemXPos, totalDistance, isPressed]);

   useEffect(() => {
      if (!autoPlay) return;

      let interval;

      if (isPressed) return clearInterval(interval);

      interval = setInterval(() => {
         setIsDraggedNextSlide(true);
         setIsSlideBtnClicked(false);
         setIsDraggingNext(true);
         setDirectionValue(2);
         setIsTransitionActive(true);
      }, autoPlayIntervalMS);

      return () => {
         clearInterval(interval);
      };
   }, [autoPlay, autoPlayIntervalMS, isPressed]);

   const slideShowTransformValue = `${
      isDragging
         ? `translateX(calc(${currentItemXPos}px - 100%))`
         : `translateX(${directionValue * -100}%)`
   }`;

   return (
      <div className="slide-show-container">
         <button onClick={handleSlidePrev} className="btn-slide prev-btn">
            <ArrowIcon />
         </button>
         <button onClick={handleSlideNext} className="btn-slide next-btn">
            <ArrowIcon />
         </button>
         <div
            onTransitionEnd={handleSlideTrasitionEnd}
            onMouseDown={handleStartDragging}
            onMouseMove={handleDragMove}
            onTouchStart={handleStartDragging}
            onTouchMove={handleDragMove}
            ref={slideShowRef}
            style={{
               userSelect: isDragging ? "none" : null,
               transform: slideShowTransformValue,
            }}
            className={`slide-show${isTransitionActive ? " transition-active" : ""}`}
         >
            {items.length === 2 && <ItemsWithTwo items={items} />}
            {items.length > 2 &&
               items.map((item, i) => (
                  <div data-selected={i === 1} key={item.key} className="slide-show-item">
                     {item}
                  </div>
               ))}
         </div>
      </div>
   );
};

export default SlideShow;
