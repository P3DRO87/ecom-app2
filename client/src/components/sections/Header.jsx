import Link from "next/link";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setHeaderHeight, setIsNavbarActive } from "@/redux/uiDux";

const Header = () => {
   const dispatch = useDispatch();

   const headerRef = useRef(null);

   const handleOpenSideMenu = () => {
      dispatch(setIsNavbarActive(true));
   };

   useEffect(() => {
      const setHeaderH = () => {
         if (!headerRef.current) return;

         const { height } = headerRef.current.getBoundingClientRect();

         dispatch(setHeaderHeight(height));
      };

      setHeaderH();

      window.addEventListener("resize", setHeaderH);

      return () => window.addEventListener("resize", setHeaderH);
   }, []);

   return (
      <header ref={headerRef} className="page-header">
         <div className="container-fluid">
            <div className="row justify-content-between">
               <div className="col-lg-3 col-md-3 col-auto">
                  <div className="logo-container">
                     <Link className="logo" href="/">
                        <img className="img-fluid" src="/images/main-logo.png" alt="" />
                     </Link>
                  </div>
               </div>
               <div className="col-lg-6 col-md-3 d-md-flex d-none align-items-center justify-content-center">
                  <nav className="categories-list">
                     <Link href="/category/men">
                        Hombres <IoMdMale />
                     </Link>
                     <Link href="/category/women">
                        Mujeres <IoMdFemale />
                     </Link>
                  </nav>
               </div>
               <div className="col-lg-3 col-md-3 col-5 d-flex align-items-center justify-content-end">
                  <nav className="nav-items">
                     <button className="nav-item search-btn d-md-flex d-none">
                        <HiMiniMagnifyingGlass />
                     </button>
                     <Link href="/cart" className="nav-item cart-btn">
                        <IoCartOutline />
                     </Link>
                     <button onClick={handleOpenSideMenu} className="nav-item">
                        Menu
                     </button>
                  </nav>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
