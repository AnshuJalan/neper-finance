import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App";
import { rootReducer } from "./redux/reducers";

import "./index.css";

export const store = configureStore({ reducer: rootReducer });

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          checkInstallationImmediately: false,
          dappMetadata: {
            name: "Neper Finance",
            url: window.location.host,
          },
        }}
      >
        <App />
      </MetaMaskProvider>
    </Provider>
  </React.StrictMode>
);
