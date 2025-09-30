import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../store/ProductSlice";
import { UserContext } from "../context/UserContext";

const AllProduct = () => {
  const dispatch = useDispatch();
  const { URL } = useContext(UserContext);

  const { data: products, status } = useSelector((state) => state.product);

  const [editingProduct, setEditingProduct] = useState(null);

  const [search , setSearch] = useState("");

  useEffect(() => {
    dispatch(getProducts(URL));
  }, [dispatch, URL]);

  function handleDelete(_id) {
    dispatch(deleteProduct(_id));
  }

  function handleEditUpdate(product) {
    setEditingProduct(product);
  }

  function handleUpdate() {
    dispatch(updateProduct(editingProduct));
    setEditingProduct(null);
  }

  function handleEditChange(e) {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  }

  function inputSearch(e) {
        setSearch(e.target.value.toLowerCase())
  }


  const filterProduct = products.filter((product) => (
    product.title.toLowerCase().includes(search)

    
  ))



  return (
    <section className="text-gray-400  bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto ">
        {status === "loading" && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="loader-17"></div>
          </div>
        )}

        {status === "error" && (
          <p className="text-red-500 text-lg">Error loading products.</p>
        )}

        <div className="mx-8  ">
          <input
            type="text"
            placeholder="Search"
            onChange={inputSearch}
            value={search}
            className="w-1/2 md:w-1/3  bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <button className=" ms-4 mt-5 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Search
          </button>
        </div>
         
        

        <div className="flex flex-wrap m-4">
            {
                filterProduct.length === 0 && status === 'idle' && (
                     <p className="text-white text-lg mx-auto text-center mt-10">Product Not Found</p>
                )
            }
          {filterProduct.map((product) => (
            <div
              key={product._id}
              className="p-4 mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4 w-[400px] h-auto"
            >
              <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                <img
                  className="w-full h-[170px]"
                  src={product.image || "https://dummyimage.com/720x400"}
                  alt={product.name}
                />
                <div className="p-6">
                  {editingProduct?._id === product._id ? (
                    <>
                      <input
                        type="text"
                        name="title"
                        value={editingProduct.title}
                        onChange={handleEditChange}
                        className="text-black p-1 mb-2 w-full"
                      />
                      <input
                        type="text"
                        name="price"
                        value={editingProduct.price}
                        onChange={handleEditChange}
                        className="text-black p-1 mb-2 w-full"
                      />
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 px-4 py-2 rounded text-white mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="bg-gray-600 px-4 py-2 rounded text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        {product.category || "CATEGORY"}
                      </h2>
                      <h1 className="title-font text-lg font-medium text-white mb-3">
                        {product.title}
                      </h1>
                      <p className="text-gray-400">₹ {product.price}</p>
                      <div className="flex gap-3 items-center w-1/2 ">
                        <button
                          onClick={() => handleEditUpdate(product)}
                          className="flex mx-auto mt-5 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex mx-auto mt-5 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && status === "idle" && (
            <p className="text-white text-lg">No products available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProduct;
