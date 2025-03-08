import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/cartReducer";

export default configureStore({
  reducer: {
    cart: CartReducer
  }
});
