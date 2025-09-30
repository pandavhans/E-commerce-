  import React, { useContext, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { toast } from "react-toastify";
  import { UserContext } from "../context/UserContext";

  const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { token, setToken, URL } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.post(`${URL}/api/user/register`, {
          name,
          email,
          password,
          token,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        toast.error(message);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              <h1 className="title-font font-medium text-3xl text-white">
                Welcome to Dev Prajapati's Website
              </h1>
              <p className="leading-relaxed mt-4">
                Hello, I'm Dev Prajapati. I am a MERN Stack Developer passionate about building modern web applications using React.js and Node.js.
              </p>
            </div>

            <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 className="text-white text-xl font-medium title-font mb-5">
                Sign Up
              </h2>

              <div className="relative mb-4">
                <label htmlFor="username" className="leading-7 text-sm text-gray-400">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>

              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>

              <div className="relative mb-4">
                <label htmlFor="password" className="leading-7 text-sm text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>

              <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Sign Up
              </button>

              <p className="text-md mt-3">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-lg text-indigo-400 hover:text-indigo-300">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </section>
      </form>
    );
  };

  export default Register;
