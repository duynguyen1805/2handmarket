import { Html, Head, Main, NextScript } from "next/document";
import { Provider } from "react-redux";
import store from "../store/store";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Provider store={store}>
          <Main />
        </Provider>
        <NextScript />
        <div id="modal-root"></div>
      </body>
    </Html>
  );
}
