import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Status constants
const STATUSES = {
  LOADING: "loading",
  IDLE: "idle",
  ERROR: "error",
};

// Initial state
const initialState = {
  data: [],
  status: STATUSES.IDLE,
};

// Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.data = action.payload;
    },
    removeProduct: (state, action) => {
      state.data = state.data.filter(item => item._id !== action.payload);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setProduct, removeProduct, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Base API URL (adjust if needed)
const URL = "http://localhost:5000";

// Fetch all products
export const getProducts = () => async (dispatch) => {
  dispatch(setStatus(STATUSES.LOADING));
  try {
    const res = await axios.get(`${URL}/api/product/get-product`);
    dispatch(setProduct(res.data.productData || []));
    dispatch(setStatus(STATUSES.IDLE));
  } catch (err) {
    console.error("Error fetching products:", err);
    dispatch(setStatus(STATUSES.ERROR));
  }
};

// Delete product by ID
export const deleteProduct = (_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${URL}/api/product/delete-product/${_id}`);
    if (res.data.success) {
      dispatch(removeProduct(_id));
      toast.info("Product removed");
    } else {
      toast.error(res.data.message || "Failed to delete product");
    }
  } catch (err) {
    console.error("Error deleting product:", err);
    toast.error("Server error while deleting product");
  }
};

// Update product
export const updateProduct = (updatedProduct) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${URL}/api/product/update-product/${updatedProduct._id}`,
      updatedProduct
    );
    if (res.data.success) {
      dispatch(getProducts()); // Refresh products
      toast.success("Product updated successfully");
    } else {
      toast.error(res.data.message || "Failed to update product");
    }
  } catch (err) {
    console.error("Error updating product:", err);
    toast.error("Server error while updating product");
  }
};