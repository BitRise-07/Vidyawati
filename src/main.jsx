import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
const store = configureStore({
  reducer: rootReducer,
});
import { Toaster } from "react-hot-toast"
import ScrollToTop from "./components/common/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ScrollToTop />
        <Toaster />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
