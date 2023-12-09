import {
   legacy_createStore as createStore,
   combineReducers,
   compose,
   applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { testReducer } from "./testDux";
import { uiReducer } from "./uiDux";
import { cartReducer } from "./cartDux";
import { authReducer } from "./authDux";

// Note: all file with the suffix "Dux" are using the redux duck metodology

const rootReducer = combineReducers({
   test: testReducer,
   ui: uiReducer,
   cart: cartReducer,
   auth: authReducer,
});

export default function generateStore() {
   let composeEnhancers;

   if (typeof window === "undefined") {
      composeEnhancers = compose;

      return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
   }

   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || function () {};

   return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export const reduxWrapper = createWrapper(generateStore);
