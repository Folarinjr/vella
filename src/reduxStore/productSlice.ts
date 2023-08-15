import { IProduct } from "./../types/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProductsAsync = createAsyncThunk(
  "products/getProductsAsync",
  async () => {
    const resp = await fetch("https://fakestoreapi.com/products");
    if (resp.ok) {
      const products = await resp.json();
      return { products };
    }
  }
);

const initialState: IProduct[] = [];

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state: IProduct[], action) => {
        const product: IProduct = {
          id: action.payload.id,
          title: action.payload.title,
          category: action.payload.category,
          description: action.payload.description,
          image: action.payload.image,
          price: action.payload.price,
          rating:{rate: action.payload.rating.rate, count: action.payload.rating.count}
        };
        state.push(product);
    },

    deleteProduct: (state: IProduct[], action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsAsync.fulfilled, (state, action) => {
      return action.payload?.products;
    });
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;