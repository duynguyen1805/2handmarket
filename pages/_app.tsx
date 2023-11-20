import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
require("dotenv").config();
import { MyContextProvider } from "../contexts/MyContext";
import { Provider } from "react-redux";
import store from "../store/store";
import Nav_mobile from "@/components/Nav_mobile";
import Loading_routerpush from "@/components/loading/Loading_routerpush";
import Button_topback from "@/components/button/Button_topback";
import NextAuthProvider from "./providers";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <MyContextProvider>
//       <Component {...pageProps} />
//     </MyContextProvider>
//   );
// }

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <NextAuthProvider>
        <MyContextProvider>
          <Component {...pageProps} />
          <Loading_routerpush />
          <Button_topback />
          <Nav_mobile />
        </MyContextProvider>
      </NextAuthProvider>
    </Provider>
  );
};

export default App;
