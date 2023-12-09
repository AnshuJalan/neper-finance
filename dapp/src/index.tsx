import React from "react";
import ReactDOM from "react-dom/client";
import { MetaMaskProvider } from '@metamask/sdk-react';

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <MetaMaskProvider debug={false} sdkOptions={{
      checkInstallationImmediately: false,
      dappMetadata: {
        name: "Neper Finance",
        url: window.location.host,
      }
    }}>
    <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
