import ProductsGrid from "@/components/sections/ProductsGrid";
import Layout from "@/components/templates/Layout";
import { getAllProducts } from "@/helpers/products-db";
import useRandomIds from "@/hooks/useRandomIds";
import React from "react";

const Men = ({ products }) => {
   return (
      <>
         <div className="container">
            <div className="row">
               <div className="col-sm-auto">
                  <h1 className="page-title my-3">Productos para hombres</h1>
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
export default Men;

Men.getLayout = (page) => <Layout title="Categoria - Hombres">{page}</Layout>;

export const getServerSideProps = async () => {
   const [products] = await getAllProducts("men");

   // if (!products) return { notFound: true };

   return {
      props: {
         products,
      },
   };
};
