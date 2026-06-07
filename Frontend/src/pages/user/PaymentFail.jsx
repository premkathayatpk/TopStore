import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md text-center border border-gray-100">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-500 mb-6">
          Something went wrong while processing your payment. Please try again
          or choose another payment option.
        </p>
        <div className="space-y-2">
          <button
            onClick={() => navigate("/cart")}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition"
          >
            Return to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
