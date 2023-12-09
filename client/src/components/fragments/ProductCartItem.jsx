import Link from "next/link";
import React from "react";

const sampleProduct = {
   slug: "asd",
   inStock: 1,
   images: ["https://via.placeholder.com/600x500?text=1"],
   title: "lorem",
   price: 10,
};

const ProductCartItem = ({ product = sampleProduct }) => {
   return (
      <Link href={`/product/${product.slug}`} className="product-card-item">
         {product.inStock === 0 && <p className="no-stock">No in stock</p>}
         <img
            width={2000}
            height={2000}
            className="img-fluid"
            src={`${product.images[0]}`}
            alt={product.title}
         />
         <div className="card-body">
            <h3 className="product-title mt-2 mb-0">{product.title}</h3>
            <p className="product-price">C${product.price}</p>
         </div>
      </Link>
   );
};

export default ProductCartItem;
