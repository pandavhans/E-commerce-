import React from "react";

const Hero = () => {
  return (
    <section className="bg-green-50 rounded  dark:bg-gray-900 text-gray-800 dark:text-white py-16 transition-colors duration-500">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Fresh Groceries <br />
            Delivered to <span className="text-indigo-600 dark:text-indigo-400">Your Door</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            From farm to fridge – fast, fresh, and affordable. Order now and enjoy contactless delivery!
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition">
              Shop Now
            </button>
            <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-100 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900 px-6 py-3 rounded-xl transition">
              View Categories
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="Fresh groceries"
            className="w-[300px] max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
