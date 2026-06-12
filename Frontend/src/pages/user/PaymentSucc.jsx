import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSucc = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const encodedData = searchParams.get("data");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!encodedData) {
        setError("No payment token found.");
        setLoading(false);
        return;
      }
      try {
        const decodedString = atob(encodedData);
        const decodedData = JSON.parse(decodedString);

        // console.log("Decoded eSewa Data: ", decodedData);

        const response = await fetch(
          "http://localhost:5000/api/order/verifyPayment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transaction_uuid: decodedData.transaction_uuid,
              total_amount: decodedData.total_amount,
              product_code: decodedData.product_code,
              status: decodedData.status,
            }),
          },
        );

        const result = await response.json();

        if (response.ok && result.success) {
          setLoading(false);
        } else {
          throw new Error(result.message || "Server verification failed.");
        }
      } catch (err) {
        console.error("Payment validation failed:", err);
        setError(err.message || "An error occurred while validating payment.");
        setLoading(false);
      }
    };

    verifyPayment();
  }, [encodedData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#60bb46] mb-4"></div>
        <p className="text-gray-600 font-medium">
          Verifying transaction with eSewa...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md text-center border border-red-100">
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
            Verification Failed
          </h2>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl transition shadow-md"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md text-center border border-gray-100">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#60bb46] hover:bg-[#52a03c] text-white font-bold py-3 rounded-xl transition shadow-md"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSucc;
