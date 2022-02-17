import { PaymentContextProvider } from "../contexts/PaymentContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <PaymentContextProvider>
      <Component {...pageProps} />
    </PaymentContextProvider>
  );
}

export default MyApp;
