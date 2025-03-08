import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const itemPresent = state.cart.find((item) => item.id === action.payload.id);

      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const itemPresent = state.cart.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        itemPresent.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const itemPresent = state.cart.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        if (itemPresent.quantity === 1) {
          state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        } else {
          itemPresent.quantity--;
        }
      }
    },
    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, cleanCart } =
  CartSlice.actions;

export default CartSlice.reducer;
