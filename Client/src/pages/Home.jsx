import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../context/UserContext";
import { addToCart } from "../store/carSlice";
import { getProducts } from "../store/ProductSlice";
import Hero from "../components/Hero/Hero";

const Home = () => {
  const dispatch = useDispatch();
  const { URL } = useContext(UserContext);
  const { data: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(URL));
  }, [dispatch, URL]);

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div>
      <Hero />
      </div>

      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          {/* Loading State */}
          {status === "loading" && (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="loader-17"></div>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <p className="text-red-500 text-lg text-center">Error loading products.</p>
          )}

          {/* Product Grid */}
          <div className="flex flex-wrap justify-center gap-6">
            {products.length > 0 &&
              products.map((product) => (
                <div
                  key={product._id}
                  className="w-[300px] bg-gray-800 border-2 border-gray-700 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    className="w-full h-[170px] object-cover"
                    src={product.image || "https://dummyimage.com/720x400"}
                    alt={product.title}
                  />
                  <div className="p-4">
                    <h2 className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                      {product.category || "Category"}
                    </h2>
                    <h1 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                      {product.title}
                    </h1>
                    <p className="text-indigo-400 font-medium mb-3">₹ {product.price}</p>
                    <button
                      onClick={() => handleAdd(product)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}

            {/* No Products */}
            {products.length === 0 && status === "idle" && (
              <p className="text-white text-lg text-center w-full">No products available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}


export default Home
