import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { HelmetProvider } from "react-helmet-async";
import { HeroUIProvider } from "@heroui/system";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeroUIProvider theme={{
      themes: {
      light: {
        colors: {
          primary: "#f5a524",
          warning: "#9353d3"
        },
      },
      dark: {
        colors: {
          primary: "#f5a524",
          warning: "#9353d3"
        }
      }
    },
    }}>
      <HelmetProvider>
        <BrowserRouter>
          <Provider>
            <App />
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    </HeroUIProvider>
  </React.StrictMode>,
);
