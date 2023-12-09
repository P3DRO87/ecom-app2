import CartList from "@/components/sections/CartList";
import Layout from "@/components/templates/Layout";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { IoCart } from "react-icons/io5";

const Cart = () => {
   const { cart, orderValues } = useSelector((state) => state.cart);

   const { nProducts, taxes, subTotal, total } = orderValues;

   return (
      <div className="cart-page">
         <div className="container">
            <div className="row justify-content-between">
               <div className="col-lg-6">
                  <h1>
                     Resumen de compras <IoCart className="me-2" />
                  </h1>
                  <CartList editable />
                  {cart.length === 0 && (
                     <p className="text-bold-600">Aun no ha realizado ninguna compra</p>
                  )}
               </div>
               <div className="col-lg-5">
                  <div className="order">
                     <h3 className="text-bold-600">Orden</h3>
                     <hr />
                     <div className="order-item d-flex justify-content-between">
                        <p>N. Productos</p>
                        <p>
                           {nProducts}
                           <span className="ms-2">
                              {nProducts === 0
                                 ? "Items"
                                 : nProducts > 1
                                 ? "Items"
                                 : "Item"}
                           </span>
                        </p>
                     </div>
                     <div className="order-item d-flex justify-content-between">
                        <p>Subtotal</p>
                        <p>C${subTotal.toFixed(2)}</p>
                     </div>
                     <div className="order-item d-flex justify-content-between">
                        <p>Impuestos (15%)</p>
                        <p>C${taxes.toFixed(2)}</p>
                     </div>
                     <div className="order-item d-flex justify-content-between mt-3">
                        <p className="text-bolder">Total</p>
                        <p className="text-bolder">C${total.toFixed(2)}</p>
                     </div>
                     {cart.length > 0 && (
                        <Link
                           className="btn-primary w-100 d-block text-center mt-3"
                           href="/checkout/address"
                        >
                           Verificar
                        </Link>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Cart;

Cart.getLayout = (page) => <Layout>{page}</Layout>;
