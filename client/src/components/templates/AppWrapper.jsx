import { renewToken } from "@/helpers/auth-db";
import { authUser } from "@/redux/authDux";
import { setCart, setOrderValues, setUserAddress } from "@/redux/cartDux";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AppWrapper = ({ children }) => {
   const { user } = useSelector((state) => state.auth);
   const { cart } = useSelector((state) => state.cart);

   const dispatch = useDispatch();

   useEffect(() => {
      const lsCart = localStorage.getItem("cart");

      const cart = lsCart && JSON.parse(lsCart);

      if (!cart) return;

      try {
         dispatch(setCart(cart));
      } catch (error) {
         console.log("the user is trying to be hackerman");
      }
   }, []);

   useEffect(() => {
      const lsUserAddress = JSON.parse(localStorage.getItem("userAddress"));

      dispatch(setUserAddress(lsUserAddress));
   }, []);

   useEffect(() => {
      const lsToken = Cookies.get("token");

      const fetchToken = async () => {
         const [tokenData, error] = await renewToken(lsToken);

         if (error) return Cookies.remove("token");

         dispatch(authUser(tokenData.user || null));
      };

      if (lsToken && !user) fetchToken();
   }, [dispatch, user]);

   useEffect(() => {
      Cookies.set("cart", JSON.stringify(cart));
      localStorage.cart = JSON.stringify(cart);

      const IVA = 15;

      const cartSubTotal = cart.reduce(
         (acc, { price, quantity }) => price * quantity + acc,
         0
      );

      const cartTaxes = (cartSubTotal * IVA) / 100;
      const cartTotal = cartSubTotal + cartTaxes;

      const orderValues = {
         taxes: cartTaxes,
         subTotal: cartSubTotal,
         total: cartTotal,
         nProducts: cart.reduce((acc, { quantity }) => acc + quantity, 0),
      };

      dispatch(setOrderValues(orderValues));
   }, [cart]);

   return <>{children}</>;
};

export default AppWrapper;
