import ProductsGrid from "@/components/sections/ProductsGrid";
import Layout from "@/components/templates/Layout";
import { getAllProducts } from "@/helpers/products-db";
import React from "react";

const Women = ({ products }) => {
   return (
      <>
         <div className="container">
            <div className="row">
               <div className="col-sm-auto">
                  <h1 className="page-tittle my-3">Productos para mujeres</h1>
               </div>
            </div>
         </div>
         {/* {isLoading && (
            <div className="container">
               <div className="row">
                  <div className="col-auto m-auto">
                     <h3>Loading...</h3>
                  </div>
               </div>
            </div>
         )} */}
         {<ProductsGrid products={products} />}
      </>
   );
};

export default Women;

Women.getLayout = (page) => <Layout title="Categoria - Hombres">{page}</Layout>;

export const getServerSideProps = async () => {
   const [products] = await getAllProducts("women");

   // if (!products) return { notFound: true };

   return {
      props: {
         products,
      },
   };
};
