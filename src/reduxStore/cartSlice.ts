import { ICart } from "./../types/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ICart[] = [];

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCartProduct: (state: ICart[], action) => {
      const cart: ICart = {
        id: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
        description: action.payload.description,
        category: action.payload.category,
        image: action.payload.image,
        rating: {
          rate: action.payload.rating.rate,
          count: action.payload.rating.count,
        },
        quantity: 1,
      };
      state.push(cart);
    },

    increaceCartQty: (state: ICart[], action: PayloadAction<number>) => {
      const index = state.findIndex((cart) => cart.id === action.payload);
      state[index].quantity += 1;
    },

    decreaceCartQty: (state: ICart[], action: PayloadAction<number>) => {
      const index = state.findIndex((cart) => cart.id === action.payload);
      state[index].quantity -= 1;
    },

    deleteCartProduct: (state: ICart[], action: PayloadAction<number>) => {
      return state.filter((product) => product.id !== action.payload);
    },

    defaultState: (state: ICart[]) => {
      return (state = []);
    },
  },
});

export const {
  addCartProduct,
  increaceCartQty,
  decreaceCartQty,
  deleteCartProduct,
  defaultState,
} = cartSlice.actions;

export default cartSlice.reducer;
