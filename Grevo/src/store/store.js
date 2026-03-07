import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import cartReducer from "./slices/cartSlice.js";
import ordersReducer from "./slices/ordersSlice.js";
import reservationReducer from "./slices/reservationsSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    reservations: reservationReducer,
  },
});

export default store;