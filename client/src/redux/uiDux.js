const initialState = {
   headerHeight: null,
   isNavbarActive: false,
};

export const uiReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "SET_HEADER_HEIGHT":
         return { ...state, headerHeight: payload };

      case "SET_IS_NAVBAR_ACTIVE":
         return { ...state, isNavbarActive: payload };

      default:
         return state;
   }
};

export const setHeaderHeight = (height) => ({
   payload: height,
   type: "SET_HEADER_HEIGHT",
});

export const setIsNavbarActive = (isActive) => ({
   type: "SET_IS_NAVBAR_ACTIVE",
   payload: isActive,
});
