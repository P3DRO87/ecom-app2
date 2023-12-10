import { authUser } from "@/redux/authDux";
import { setIsNavbarActive } from "@/redux/uiDux";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useId, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import {
   MdLogin,
   MdOutlineCategory,
   MdOutlineConfirmationNumber,
   MdOutlineVpnKey,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const SidebarMenu = () => {
   const router = useRouter();

   const dispatch = useDispatch();

   const { user } = useSelector((state) => state.auth);

   const { isNavbarActive } = useSelector((state) => state.ui);
   const inputId = useId();

   const [searchQuery, setSearchQuery] = useState("");

   const handleCloseSideMenu = () => {
      dispatch(setIsNavbarActive(false));
   };

   const handleSearchQuery = () => {
      if (!searchQuery.trim()) return;

      router.push(`/search/${searchQuery}`);
      dispatch(setIsNavbarActive(false));
   };

   const handleLogout = () => {
      Cookies.remove("cart");
      Cookies.remove("token");
      localStorage.clear();
      dispatch(authUser(null));

      router.reload();
   };

   useEffect(() => {
      dispatch(setIsNavbarActive(false));
   }, [router.pathname, dispatch]);

   return (
      <nav className={`sidebar-nav${isNavbarActive ? " active" : ""}`}>
         <div onClick={handleCloseSideMenu} className="nav-menu-mask"></div>
         <div className="nav-menu-panel">
            <div className="search-input-container">
               <label className="input-container" htmlFor={inputId}>
                  <HiMiniMagnifyingGlass onClick={handleSearchQuery} />
                  <input
                     autoFocus={true}
                     onChange={({ target }) => setSearchQuery(target.value)}
                     onKeyUp={({ key }) => key === "Enter" && handleSearchQuery()}
                     placeholder="Buscar..."
                     type="text"
                  />
               </label>
            </div>
            <div className="options-container">
               {!user && (
                  <div className="option-item">
                     <div className="option-icon">
                        <MdOutlineVpnKey />
                     </div>
                     <div className="option-text">
                        <Link href={`/auth/login?p=${router.asPath}`}>Ingresar</Link>
                     </div>
                  </div>
               )}
               {user && (
                  <>
                     <div className="option-item">
                        <div className="option-icon">
                           <MdOutlineConfirmationNumber />
                        </div>
                        <div className="option-text">
                           <Link href="/orders/history">Mis ordenes</Link>
                        </div>
                     </div>
                     <div className="option-item d-md-none d-flex">
                        <div className="option-icon">
                           <IoMdMale />
                        </div>
                        <div className="option-text">
                           <Link href="/category/men">Hombres</Link>
                        </div>
                     </div>
                     <div className="option-item d-md-none d-flex">
                        <div className="option-icon">
                           <IoMdFemale />
                        </div>
                        <div className="option-text">
                           <Link href="/category/women">Mujeres</Link>
                        </div>
                     </div>
                     <div className="option-item">
                        <div className="option-icon">
                           <MdLogin />
                        </div>
                        <div onClick={handleLogout} className="option-text">
                           Salir
                        </div>
                     </div>
                     {user.role === "admin" && (
                        <>
                           <p className="divider-text mt-3">Panel de administracion</p>
                           <div className="option-item">
                              <div className="option-icon">
                                 <MdOutlineCategory />
                              </div>
                              <div className="option-text">
                                 <Link href="/admin/products">Administrar productos</Link>
                              </div>
                           </div>
                        </>
                     )}
                  </>
               )}
            </div>
         </div>
      </nav>
   );
};

export default SidebarMenu;
