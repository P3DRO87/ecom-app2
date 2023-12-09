import ItemCounter from "@/components/fragments/ItemCounter";
import SizeSelector from "@/components/fragments/SizeSelector";
import Layout from "@/components/templates/Layout";
import SplideSlideShow from "@/components/utils/SplideSlideShow";
import { getAllProducts, getProduct } from "@/helpers/products-db";
import { addNewProduct } from "@/redux/cartDux";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const sampleProduct = {
   title: "lorem ipsum",
   description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, illo.",
   images: [
      "https://via.placeholder.com/600x500?text=1",
      "https://via.placeholder.com/600x500?text=2",
   ],
   price: 10,
   inStock: 5,
   sizes: ["XL", "L", "M"],
};

const Product = ({ product = sampleProduct }) => {
   const router = useRouter();

   const dispatch = useDispatch();

   const { size, ...rest } = product;

   const [cartProduct, setCartProduct] = useState({ ...rest, quantity: 1, size: null });

   const handleAddProductToCart = () => {
      if (!cartProduct.size) return;

      dispatch(addNewProduct(cartProduct));
      router.push("/cart");
   };

   return (
      <Layout title={product.title} pageDescription={product.description}>
         <div className="product-page mt-5">
            <div className="container">
               <div className="row">
                  <div className="col-lg-6">
                     <SplideSlideShow>
                        {product.images.map((imageUrl, i) => (
                           <img
                              className="img-fluid"
                              key={i}
                              src={`${imageUrl}`}
                              alt={product.description}
                           />
                        ))}
                     </SplideSlideShow>
                  </div>
                  <div className="col-lg-6">
                     <h1 className="product-title">{product.title}</h1>
                     <h2 className="product-price">C${product.price}</h2>
                     <p className="quantity text-bold-600">Cantidad</p>
                     <div className="item-counter-container mb-3">
                        <ItemCounter
                           maxValue={product.inStock}
                           onValueChange={(quantity) =>
                              setCartProduct((prev) => ({ ...prev, quantity }))
                           }
                        />
                     </div>
                     <SizeSelector
                        onSelectSize={(size) =>
                           setCartProduct((prev) => ({ ...prev, size }))
                        }
                        selectedSize={cartProduct.size}
                        sizes={product.sizes}
                     />
                     {product.inStock > 0 && (
                        <button
                           onClick={handleAddProductToCart}
                           className="btn-add-cart btn-primary"
                        >
                           {cartProduct.size ? "Añadir al carrito" : "Seleccionar talla"}
                        </button>
                     )}
                     {product.inStock === 0 && <p>No disponible</p>}
                     <p className="text-bolder my-2">Descripcion</p>
                     <p className="product-description">{product.description}</p>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Product;

export const getServerSideProps = async ({ params }) => {
   const { slug } = params;

   const [product] = await getProduct({ slug });

   if (!product) return { notFound: true };

   return {
      props: {
         product,
      },
   };
};
