import Chip from "@/components/fragments/Chip";
import Layout from "@/components/templates/Layout";
import { getUserOrders } from "@/helpers/orders-db";
import Link from "next/link";
import React from "react";
import { MdOutlineCreditCardOff, MdOutlineCreditScore } from "react-icons/md";

const History = ({ orders }) => {
   console.log(orders);

   return (
      <div className="page-orders-history my-5">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="table-responsive">
                     <table className="table">
                        <thead>
                           <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Full name</th>
                              <th scope="col">Status de pago</th>
                              <th scope="col">Enlace de la orden</th>
                           </tr>
                        </thead>
                        <tbody>
                           {orders.map((order, i) => (
                              <tr key={i}>
                                 <td>{i + 1}</td>
                                 <td>
                                    {order.shippingAddress.firstName}
                                    <span className="ms-2">
                                       {order.shippingAddress.lastName}
                                    </span>
                                 </td>
                                 <td>
                                    <Chip
                                       label={`${order.isPaid ? "Pagada" : "No pagada"}`}
                                       color={`${order.isPaid ? "success" : "error"}`}
                                       icon={
                                          order.isPaid ? (
                                             <MdOutlineCreditScore />
                                          ) : (
                                             <MdOutlineCreditCardOff />
                                          )
                                       }
                                    />
                                 </td>
                                 <td>
                                    <Link href={`/orders/${order._id}`}>
                                       Ir a la orden
                                    </Link>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default History;

History.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = async ({ req }) => {
   const { token } = req.cookies;

   const { cookies } = req;

   const [orders] = await getUserOrders(cookies.token);

   if (!token || !orders) {
      return {
         redirect: {
            destination: "/auth/login",
            permanent: false,
         },
      };
   }

   return {
      props: {
         orders,
      },
   };
};
