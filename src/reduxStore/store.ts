import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
