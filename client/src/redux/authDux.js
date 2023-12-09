const initialState = {
   user: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "AUTH_USER":
         return { ...state, user: payload };

      default:
         return state;
   }
};

export const authUser = (user) => ({ type: "AUTH_USER", payload: user });
