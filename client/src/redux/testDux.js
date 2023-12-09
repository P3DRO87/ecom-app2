const initialState = {
   test: "hola",
};

export const testReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "SET_TEST":
         return { ...state, test: payload };

      default:
         return state;
   }
};

export const setTest = (testValue) => ({ type: "SET_TEST", payload: testValue });
