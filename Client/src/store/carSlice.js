import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.productId !== action.payload);
    },
    setCart(state, action) {
      return action.payload; // Replace the cart entirely
    },
    incrementQty: (state, action) => {
      const item = state.find((i) => i.productId === action.payload);
      if (item) item.qty += 1;
    },

    decrementQty: (state, action) => {
      const item = state.find((i) => i.productId === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    }
  },
});

export const { add, remove, setCart ,incrementQty , decrementQty} = cartSlice.actions;
export default cartSlice.reducer;


const URL = "http://localhost:5000";


// Add Cart

export function addToCart(product) {
  return async function (dispatch) {
    let token = localStorage.getItem("token");

    if (!token) {
      toast.info('Please login to add items to cart');
      return; 
    }

    try {
      const { data } = await axios.post(
        `${URL}/api/cart/add-cart`,
        {
          productId: product._id,
          title: product.title,
          image: product.image,
          price: product.price,
          qty: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        dispatch(add(product));
        toast.success("Item added to cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(
        "Add to cart error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to add item");
    }
  };
}

// Remove Cart

export function removeFromCart(productId) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.delete(
        `${URL}/api/cart/remove-cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        dispatch(remove(productId));
        toast.info("Item removed from cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };
}

// Fetch Cart

export function fetchCart() {
  return async function (dispatch) {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(`${URL}/api/cart/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);

      dispatch(setCart(data.cartData.items || []));
    } catch (error) {
      console.error("Fetch cart error:", error);
      toast.error("Failed to fetch cart");
    }
  };
};