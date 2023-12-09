import CartList from "@/components/sections/CartList";
import Layout from "@/components/templates/Layout";
import { countriesMap } from "@/helpers/contries";
import { createOrder } from "@/helpers/orders-db";
import { setCart } from "@/redux/cartDux";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Summary = () => {
   const router = useRouter();

   const dispatch = useDispatch();

   const { orderValues, userAddress, cart } = useSelector((state) => state.cart);

   const parsedUserAdd = userAddress || {};

   const { nProducts, taxes, subTotal, total } = orderValues;

   const [isSendingOrder, setIsSendingOrder] = useState(false);
   const [errorMsg, setErrorMsg] = useState("");

   const handleConfirmOrder = async () => {
      if (isSendingOrder) return;

      if (!userAddress) return alert("Invalid address");

      const order = {
         orderItems: cart.map((product) => ({ ...product, image: product.images[0] })),
         shippingAddress: userAddress,
         numberOfItems: nProducts,
         subTotal,
         tax: taxes,
         total,
         isPaid: false,
      };

      setIsSendingOrder(true);

      const [orderRes, error] = await createOrder(order);

      setIsSendingOrder(false);

      if (error) return setErrorMsg(error);

      router.replace(`/orders/${orderRes._id}`);

      dispatch(setCart([]));
   };

   useEffect(() => {
      if (!localStorage.getItem("userAddress")) router.push("/checkout/address");
   }, [router]);

   return (
      <div className="summary-page mt-2rem">
         <div className="container">
            <div className="row justify-content-between">
               <div className="col-lg-6">
                  <h1 className="page-title">Resumen de la orden</h1>
                  <CartList />
               </div>
               <div className="col-lg-5">
                  <div className="order">
                     <h4 className="text-bold-600">
                        Resumen del la orden ({nProducts} producto(s))
                     </h4>
                     <hr />
                     <div className="order-item d-flex justify-content-between">
                        <p className="text-bolder">Direccion de envio</p>
                        <Link href="/checkout/address">Editar</Link>
                     </div>
                     <p className="user-name">
                        <span className="text-bolder me-2">Nombre:</span>
                        {parsedUserAdd.firstName} {parsedUserAdd.lastName}
                     </p>
                     <p className="user-address">
                        <span className="text-bolder me-2">Direccion:</span>
                        {parsedUserAdd.address}
                     </p>
                     <p className="user-city">
                        <span className="text-bolder me-2">Ciudad:</span>
                        {parsedUserAdd.city}
                     </p>
                     <p className="user-country">
                        <span className="text-bolder me-2">Pais:</span>
                        {countriesMap[parsedUserAdd.country]}
                     </p>
                     <p className="phone-number">
                        <span className="text-bolder me-2">Num. De Telefono:</span>
                        {parsedUserAdd.phone}
                     </p>
                     <div className="order-item d-flex mt-3">
                        <Link className="ms-auto" href="/cart">
                           Editar
                        </Link>
                     </div>
                     <div className="order-item d-flex justify-content-between">
                        <p>N. Products</p>
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
                     <button
                        disabled={isSendingOrder}
                        onClick={handleConfirmOrder}
                        className="w-100 btn-primary mt-4"
                     >
                        Confirmar orden
                     </button>
                     {errorMsg && <p>{errorMsg}</p>}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Summary;

Summary.getLayout = (page) => <Layout>{page}</Layout>;
