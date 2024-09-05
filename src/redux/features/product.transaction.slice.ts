import { createSlice } from "@reduxjs/toolkit";

export interface productTransactionType {
  loading: boolean;
  productTransaction: [];
  error: Error | null;
}

const initialState: productTransactionType = {
  loading: false,
  productTransaction: [],
  error: null,
};

export const productTransactionSlice = createSlice({
  name: "productTransactionSlice",
  initialState,
  reducers: {
    addProductTransaction: (state, action) => {
      state.loading = true;
    },
    addProductTransactionSuccess: (state, action) => {
      state.loading = false;
    },
    addProductTransactionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    editProductTransaction: (state, action) => {
      state.loading = true;
    },
    editProductTransactionSuccess: (state, action) => {
      state.loading = false;
    },
    editProductTransactionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    listProductTransaction: (state, action) => {
      state.loading = true;
    },
    listProductTransactionSuccess: (state, action) => {
      state.productTransaction = action.payload;
      state.loading = false;
    },
    listProductTransactionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteProductTransaction: (state, action) => {
      state.loading = true;
    },
    deleteProductTransactionSuccess: (state, action) => {
      state.loading = false;
    },
    deleteProductTransactionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  addProductTransaction,
  addProductTransactionFailure,
  addProductTransactionSuccess,
  listProductTransaction,
  listProductTransactionSuccess,
  listProductTransactionFailure,
  deleteProductTransaction,
  deleteProductTransactionSuccess,
  deleteProductTransactionFailure,
  editProductTransaction,
  editProductTransactionSuccess,
  editProductTransactionFailure,
} = productTransactionSlice.actions;

export default productTransactionSlice.reducer;
