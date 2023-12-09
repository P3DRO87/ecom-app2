const initialState = {
   cart: [],
   userAddress: null,
   orderValues: {
      nProducts: 0,
      taxes: 0,
      subTotal: 0,
      total: 0,
   },
};

export const cartReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "SET_CART":
         return { ...state, cart: payload };

      case "ADD_NEW_PRODUCT":
         const { cart } = state;

         const { size, _id, quantity } = payload;

         const repeatedProductIdx = cart.findIndex(
            (product) => product.size === size && _id === product._id
         );

         if (repeatedProductIdx !== -1) {
            const cartWithRepeatedProduct = cart.map((product, i) => {
               const repeatedProduct = {
                  ...product,
                  quantity: product.quantity + quantity,
               };

               return i === repeatedProductIdx ? repeatedProduct : product;
            });

            return {
               ...state,
               cart: cartWithRepeatedProduct,
            };
         }

         return { ...state, cart: [...cart, payload] };

      case "UPDATE_CART":
         const { _id: id } = payload;

         return {
            ...state,
            cart: state.cart.map((product) =>
               product._id === id && product.size === payload.size ? payload : product
            ),
         };

      case "DELETE_PRODUCT_IN_CART":
         return {
            ...state,
            cart: state.cart.filter(
               (product) => product.size !== payload.size && product._id === payload._id
            ),
         };

      case "SET_USER_ADDRESS":
         return { ...state, userAddress: payload };

      case "SET_ORDER_VALUES":
         return { ...state, orderValues: payload };

      default:
         return state;
   }
};

export const setCart = (cart) => ({ type: "SET_CART", payload: cart });

export const addNewProduct = (product) => ({ type: "ADD_NEW_PRODUCT", payload: product });

export const updateCart = (product) => ({ type: "UPDATE_CART", payload: product });

export const deleteProductInCart = (product) => ({
   type: "DELETE_PRODUCT_IN_CART",
   payload: product,
});

export const setUserAddress = (userAdress) => ({
   type: "SET_USER_ADDRESS",
   payload: userAdress,
});

export const setOrderValues = (orderValues) => ({
   type: "SET_ORDER_VALUES",
   payload: orderValues,
});
