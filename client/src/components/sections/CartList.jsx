import React from "react";
import ItemCounter from "../fragments/ItemCounter";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductInCart, updateCart } from "@/redux/cartDux";

// const productsInCart = initialData.products.slice(0, 3);

const CartList = ({ editable = false }) => {
   const dispatch = useDispatch();

   const { cart } = useSelector((state) => state.cart);

   const handleChangeProductQuantity = (quantity, product) => {
      dispatch(updateCart({ ...product, quantity }));
   };

   const removeProduct = (product) => {
      dispatch(deleteProductInCart(product));
   };

   return (
      <>
         {cart.map((product) => (
            <div
               key={`${product._id}-${product.size}`}
               className="product-in-cart-item product-in-cart-item d-flex w-100 mb-2"
            >
               <div className="product-img-container">
                  <img
                     className="img-fluid"
                     src={`${product.images[0]}`}
                     alt={product.description}
                  />
               </div>
               <div className="product-description ms-3">
                  <p>{product.title}</p>
                  <p>
                     Talla: <span className="text-bolder">{product.size}</span>
                  </p>
                  {editable && (
                     <ItemCounter
                        initialValue={product.quantity}
                        maxValue={product.inStock}
                        onInitialMinValue={() => {
                           // se puede remover el producto desde aqui tambien
                        }}
                        onValueChange={(value) =>
                           handleChangeProductQuantity(value, product)
                        }
                     />
                  )}
                  {!editable && <p>{product.quantity} items</p>}
               </div>
               <div className="product-price ms-auto">
                  <p className="text-bolder">C${product.price}</p>
                  {editable && (
                     <button onClick={() => removeProduct(product)}>Remover</button>
                  )}
               </div>
            </div>
         ))}
      </>
   );
};

export default CartList;
