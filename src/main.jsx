import ReactDOM from "react-dom/client";
import "./index.css";
// TanStack Query
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import globalReducer from "./state";
import { api } from "./state/api";
import productReducer from "./state/products/productsSlice";
import userReducer from "./state/user/userSlice";
import authReducer from "./state/auth/authSlice";
import ordersReducer from "./state/order/ordersSlice.jsx";
import App from "./App.jsx";

const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    product: productReducer,
    users: userReducer,
    orders: ordersReducer,
    [api.reducerPath]: api.reducer,
    // [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
