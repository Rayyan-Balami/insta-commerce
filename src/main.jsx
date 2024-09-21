import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./contexts/theme.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { TooltipProvider } from '@/components/ui/tooltip'

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
    </ThemeProvider>
    </Provider>
  // </React.StrictMode>
);
