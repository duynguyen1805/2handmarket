import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { MyContextProvider } from "../contexts/MyContext";
import { Provider } from "react-redux";
import store from "../store/store";

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
      <MyContextProvider>
        <Component {...pageProps} />
      </MyContextProvider>
    </Provider>
  );
};

export default App;
