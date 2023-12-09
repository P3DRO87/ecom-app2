import Chip from "@/components/fragments/Chip";
import Layout from "@/components/templates/Layout";
import { countriesMap } from "@/helpers/contries";
import { checkIsValidOrder, payOrder } from "@/helpers/orders-db";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useState } from "react";
import {
   MdOutlineCreditScore,
   MdOutlineCreditCardOff,
   MdErrorOutline,
   MdOutlineCreditCard,
} from "react-icons/md";
import { useSelector } from "react-redux";

const Order = ({ order }) => {
   const { shippingAddress } = order;

   const { numberOfItems, tax, subTotal, total } = order;

   const [crediCardErrorMsg, setCrediCardErrorMsg] = useState(null);
   const [isOrderPaid, setIsOrderPaid] = useState(order.isPaid);
   const [isPaymentLoading, setIsPaymentLoading] = useState(null);
   const [error, setError] = useState("");

   const stripe = useStripe();

   const elements = useElements();

   const handleCompleteOrder = async () => {
      if (crediCardErrorMsg) return;

      setIsPaymentLoading(true);

      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card: elements.getElement(CardElement),
      });

      if (stripeError) {
         setIsPaymentLoading(false);
         return setError("Fallo en la trasaccion");
      }

      const { id } = paymentMethod;

      const token = Cookies.get("token");

      const [, error] = await payOrder({
         id,
         amount: total,
         orderId: order._id,
         token,
      });

      if (error) {
         setIsPaymentLoading(false);
         return setError("Fallo en la trasaccion");
      }

      setIsPaymentLoading(false);
      setIsOrderPaid(true);
   };

   console.log(!order.isPaid || !isOrderPaid);

   return (
      <div className="order-page mt-5">
         <div className="container">
            <div className="row justify-content-between">
               <div className="col-lg-6">
                  <h1>Orden: {order._id}</h1>
                  {(order.isPaid || isOrderPaid) && (
                     <Chip
                        label="Orden pagada"
                        color="success"
                        icon={<MdOutlineCreditScore />}
                     />
                  )}
                  {!isOrderPaid && (
                     <Chip
                        label="Orden pendiente"
                        color="error"
                        icon={<MdOutlineCreditCardOff />}
                     />
                  )}
                  {error && (
                     <Chip
                        label="Error de envio"
                        color="error"
                        icon={<MdErrorOutline />}
                        className="fade-in"
                     />
                  )}
               </div>
               <div className="col-lg-5">
                  <div className="order">
                     <h4 className="text-bold-600">
                        Resumen de la orden (3 producto(s))
                     </h4>
                     <hr />
                     <div className="order-item d-flex justify-content-between">
                        <p className="text-bolder">Direccion de envio</p>
                        <Link href="/cart">Edit</Link>
                     </div>
                     <p className="user-name">
                        <span className="text-bolder me-2">Nombre:</span>
                        {shippingAddress.firstName} {shippingAddress.lastName}
                     </p>
                     <p className="user-address">
                        <span className="text-bolder me-2">Direccion:</span>
                        {shippingAddress.address}
                     </p>
                     <p className="user-city">
                        <span className="text-bolder me-2">Ciudad:</span>
                        {shippingAddress.city}
                     </p>
                     <p className="user-country">
                        <span className="text-bolder me-2">Pais:</span>
                        {countriesMap[shippingAddress.country]}
                     </p>
                     <p className="phone-number">
                        <span className="text-bolder me-2">Num. De Telefono:</span>
                        {shippingAddress.phone}
                     </p>

                     <div className="order-item d-flex justify-content-between">
                        <p>N. Products</p>
                        <p>
                           {numberOfItems}
                           <span className="ms-2">
                              {numberOfItems === 0
                                 ? "Items"
                                 : numberOfItems > 1
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
                        <p>C${tax.toFixed(2)}</p>
                     </div>
                     <div className="order-item d-flex justify-content-between mt-3">
                        <p className="text-bolder">Total</p>
                        <p className="text-bolder">C${total.toFixed(2)}</p>
                     </div>
                     {!isOrderPaid && (
                        <>
                           <CardElement
                              options={{
                                 style: {
                                    base: {
                                       // color: "",
                                    },
                                 },
                              }}
                              onChange={({ error }) => setCrediCardErrorMsg(error)}
                              className="stripe-card-element mt-3"
                           />
                           <>
                              {crediCardErrorMsg && (
                                 <p className="credit-card-error-msg">
                                    {crediCardErrorMsg.message}
                                 </p>
                              )}
                           </>
                           <button
                              onClick={handleCompleteOrder}
                              className="btn-primary w-100 mt-2 pay-btn"
                           >
                              <MdOutlineCreditCard className="me-2" />
                              {isPaymentLoading
                                 ? "Cargando..."
                                 : "Tarjeta de debito o credito"}
                           </button>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Order;

Order.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = async ({ req, query }) => {
   const { id = "" } = query;

   const { token, user } = req.cookies;

   const parsedUser = JSON.parse(user);

   if (!token) {
      return {
         redirect: {
            destination: `/auth/login?=p/orders/${id}`,
            permanent: false,
         },
      };
   }

   const [order] = await checkIsValidOrder(id, token || "");

   if (!order || order.user !== parsedUser._id) {
      return {
         redirect: {
            destination: `/orders/history`,
            permanent: false,
         },
      };
   }

   return {
      props: { order },
   };
};
