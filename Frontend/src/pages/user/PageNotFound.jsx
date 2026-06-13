import React from "react";
import { Link } from "react-router-dom"; // Assumes you are using react-router-dom for navigation

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Massive 404 text with gradient */}
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight animate-pulse">
          404
        </h1>

        {/* Informative message */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Page not found
          </h2>
          <p className="text-base text-gray-500">
            Sorry, we couldn’t find the page you’re looking for. It might have
            been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all transform hover:-translate-y-0.5"
          >
            Go back home
          </Link>
        </div>

        {/* Tiny footer support note */}
        <p className="text-xs text-gray-400 pt-8">
          Need help?{" "}
          <a href="#support" className="text-indigo-600 hover:underline">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
