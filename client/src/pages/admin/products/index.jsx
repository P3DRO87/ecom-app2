import Layout from "@/components/templates/Layout";
import { getAllProducts } from "@/helpers/products-db";
import Link from "next/link";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";

const AdminProducts = ({ products }) => {
   return (
      <div className="page-admin-products my-5">
         <div className="container">
            <div className="row justify-content-end">
               <div className="col-lg-5 d-flex justify-content-end">
                  <Link
                     href="/admin/products/new"
                     className="btn-primary mb-3 create-product-btn"
                  >
                     <BsPlus className="me-2" />
                     Crear producto
                  </Link>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-12">
                  <div className="table-responsive">
                     <table className="table">
                        <thead>
                           <tr>
                              <th scope="col">Foto</th>
                              <th scope="col">Titulo</th>
                              <th scope="col">Categoria</th>
                              <th scope="col">Tipo</th>
                              <th scope="col">Inventario</th>
                              <th scope="col">Precio</th>
                              <th scope="col">Tallas</th>
                              <th scope="col">Accion</th>
                           </tr>
                        </thead>
                        <tbody>
                           {products.map((product, i) => (
                              <tr key={i}>
                                 <td>
                                    <img
                                       className="img-fluid"
                                       src={product.images[0]}
                                       alt=""
                                    />
                                 </td>
                                 <td>
                                    <Link href={`/admin/products/${product.slug}`}>
                                       {product.title}
                                    </Link>
                                 </td>
                                 <td>{product.category}</td>
                                 <td>{product.type}</td>
                                 <td>{product.inStock}</td>
                                 <td>{product.price}</td>
                                 <td>{product.sizes.toString().replaceAll(",", ", ")}</td>
                                 <td>
                                    <button className="btn-primary">
                                       <FiTrash className="me-2" />
                                       Borrar
                                    </button>
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

export default AdminProducts;

AdminProducts.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = async () => {
   const [products] = await getAllProducts();

   // if (!products) return { notFound: true };

   return {
      props: {
         products,
      },
   };
};
