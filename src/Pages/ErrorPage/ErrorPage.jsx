import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 bg-gray-900/80 backdrop-blur-xl px-10 w-full max-w-2xl flex items-center flex-col justify-center py-20 rounded-2xl border border-gray-700 shadow-2xl">
        <img
          src="https://i.ibb.co/SVMTKPy/Frame-5.png"
          alt="illustration"
          className="w-full lg:w-[400px]"
        />
        <p className="text-gray-300 text-[0.9rem] sm:text-[1.2rem] w-full lg:w-[55%] text-center mt-10 lg:mt-4 font-semibold leading-relaxed">
          The page cannot be found. The requested URL was not found on this
          server.
        </p>

        <Link to="/">
          <button className="py-3 px-8 rounded-xl font-bold bg-gradient-to-r from-[#9538E2] to-purple-700 text-white hover:from-purple-700 hover:to-[#9538E2] transition-all duration-300 border-none mt-8 shadow-lg shadow-purple-900/25 hover:scale-105">
            Back to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
