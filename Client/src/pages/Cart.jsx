import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../store/carSlice";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const { subtotal, deliveryCharge, gst, grandTotal } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const deliveryCharge = subtotal > 0 ? 40 : 0;
    const gst = +(subtotal * 0.18).toFixed(2);
    const grandTotal = subtotal + deliveryCharge + gst;

    return { subtotal, deliveryCharge, gst, grandTotal };
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid lg:grid-cols-1 gap-6 mb-10">
            {cartItems.map((product) => (
              <div
                key={product.productId}
                className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <img
                  src={product.image || "https://dummyimage.com/100x100"}
                  alt={product.title}
                  className="w-[100px] h-[100px] object-contain"
                />

                <div className="flex-1 text-center md:text-left">
                  <h5 className="text-lg font-semibold">{product.title}</h5>
                  <h5 className="text-indigo-400 font-medium mt-1">
                      
                  </h5>

                  {/* Quantity Controls */}
                  <div className="mt-4 flex justify-center md:justify-start items-center gap-4">
                    <button
                      onClick={() => dispatch(decrementQty(product.productId))}
                      className="px-3 py-1 text-xl bg-gray-700 rounded hover:bg-gray-600"
                    >
                      −
                    </button>
                    <span className="text-lg">{product.qty}</span>
                    <button
                      onClick={() => dispatch(incrementQty(product.productId))}
                      className="px-3 py-1 text-xl bg-gray-700 rounded hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleRemove(product.productId)}
                    className="text-3xl text-red-500 hover:text-red-600"
                    title="Remove from cart"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Price Summary Section */}
          <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto text-white space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">
              Price Summary
            </h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>₹{deliveryCharge.toFixed(2)}</span>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
            <button className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 text-lg">
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
