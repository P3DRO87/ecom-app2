import Head from "next/head";
import Layout from "@/components/templates/Layout";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import ProductsGrid from "@/components/sections/ProductsGrid";
import { getAllProducts } from "@/helpers/products-db";

export default function Home({ products = [] }) {
   const { headerHeight } = useSelector((state) => state.ui);

   const heroRef = useRef();
   const [heroHeight, setHeroHeight] = useState();

   const handleScrollToProducts = () => {
      window.scroll({ top: heroHeight, behavior: "smooth" });
   };

   useEffect(() => {
      const handleSetHeroH = () => {
         const { height } = heroRef.current.getBoundingClientRect();

         setHeroHeight(height);
      };

      handleSetHeroH();

      window.addEventListener("resize", handleSetHeroH);

      return () => window.removeEventListener("resize", handleSetHeroH);
   }, []);

   return (
      <>
         <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <div
               ref={heroRef}
               style={{ minHeight: `calc(100svh - ${headerHeight || 54}px)` }}
               className="main-hero"
            >
               <div className="main-hero-content w-100">
                  <div className="container">
                     <div className="row justify-content-center">
                        <div className="col-lg-9">
                           <div className="content-container d-flex flex-column justify-content-center">
                              <h1 className="text-center main-text">
                                 Descubre tu estilo único con MARV FOHS: donde la moda y
                                 la comodidad se encuentran en un solo lugar
                              </h1>
                              <button
                                 onClick={handleScrollToProducts}
                                 className="btn see-products"
                              >
                                 Ver productos
                                 <MdKeyboardDoubleArrowUp className="me-2 arrow-icon" />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div id="home-products" className="products-section">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-auto col-auto">
                        <h2 className="all-products-title">
                           Todos los productos
                           <FiBox />
                        </h2>
                     </div>
                  </div>
               </div>
               <ProductsGrid products={products} />
            </div>
         </Layout>
      </>
   );
}

export const getServerSideProps = async () => {
   const [products] = await getAllProducts();

   // if (!products) return { notFound: true };

   return {
      props: {
         products,
      },
   };
};