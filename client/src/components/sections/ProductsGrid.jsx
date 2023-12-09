import React from "react";
import ProductCartItem from "../fragments/ProductCartItem";

const ProductsGrid = ({ products }) => {
   return (
      <div className="products-grid">
         <div className="container">
            <div className="row gy-3">
               {products?.map((product) => (
                  <div key={product.slug} className="col-lg-4 col-sm-6">
                     <ProductCartItem product={product} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default ProductsGrid;
