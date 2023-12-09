import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { reduxWrapper } from "@/redux/store";
import AppWrapper from "@/components/templates/AppWrapper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripeRes = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function App({ Component, pageProps: { ...pageProps }, ...rest }) {
   const { store } = reduxWrapper.useWrappedStore(rest);

   const getLayout = Component.getLayout || ((page) => page);

   return (
      <Elements options={{ locale: "es" }} stripe={stripeRes}>
         <Provider store={store}>
            <AppWrapper>
               <>{getLayout(<Component {...pageProps} />)}</>
            </AppWrapper>
         </Provider>
      </Elements>
   );
}
