import ProductsGrid from "@/components/sections/ProductsGrid";

import { searchProducts } from "@/helpers/products-db";
import Layout from "@/components/templates/Layout";

export default function Home({ products, query }) {
   return (
      <>
         <Layout
            title="Teslo shop - Home"
            pageDescription="Find the best minimalist articles for your life"
         >
            <div className="container">
               <div className="row">
                  <div className="col-sm-auto">
                     <h1 className="mt-5">Busqueda de productos</h1>
                     <p className="text-bold-600 my-4 fs-5">
                        Resultados de: <span className="color-primary">{query}</span>
                     </p>
                  </div>
               </div>
            </div>

            <ProductsGrid products={products} />
         </Layout>
      </>
   );
}

export const getServerSideProps = async ({ params }) => {
   const { query } = params;

   if (!query) return { notFound: true };

   let [products] = await searchProducts(query);

   // return another products case products not found

   return {
      props: {
         products,
         query,
      },
   };
};
