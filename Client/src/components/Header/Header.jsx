import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { IoCart } from "react-icons/io5";
import { useSelector } from "react-redux";


const Header = () => {
  const nevigate = useNavigate();
  const item  = useSelector((state) => state.cart)

  const { token, setToken } = useContext(UserContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    nevigate("/login");
  };

  return (
    <header className="text-gray-400 border-b border-b-white/10 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span
            className="ml-3 text-xl cursor-pointer"
            onClick={() => nevigate("/")}
          >
            Dev
          </span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap cursor-pointer items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-white">
            Home
          </Link>
          <Link to="/user" className="mr-5 hover:text-white">
            User
          </Link>
           <Link to="/product" className="mr-5 hover:text-white">
            Product
          </Link>
          <Link to="/all-Product" className="mr-5 hover:text-white">
            All Product
          </Link>
          {token ? (
            <Link to="/cart" className="relative inline-block">
              <IoCart className="text-2xl text-white" />
              <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {item.length}
              </div>
            </Link>
          ) : null}
        </nav>
        {token ? (
          <button
            onClick={logout}
            className="inline-flex items-center bg-gray-800 border-0 py-2 px-3 focus:outline-none hover:bg-gray-700 rounded text-base ms-5 mt-4 md:mt-0"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => nevigate("/register")}
            className="inline-flex items-center bg-gray-800 border-0 py-2 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
          >
            Create account
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
