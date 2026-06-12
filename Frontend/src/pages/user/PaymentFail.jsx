import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const encodedData = searchParams.get("data");

  useEffect(() => {
    const handleFailure = async () => {
      if (!encodedData) {
        console.log(
          "User cancelled the payment manually. No payload provided by eSewa.",
        );
        setStatusMessage(
          "Payment was cancelled by the user. You can return to your cart to try again.",
        );
        setLoading(false);
        return;
      }

      try {
        const decodedString = atob(encodedData);
        const decodedData = JSON.parse(decodedString);

        console.log("Decoded eSewa Failure Data: ", decodedData);

        const response = await fetch(
          "http://localhost:5000/api/order/verifyPayment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transaction_uuid: decodedData.transaction_uuid,
              total_amount: decodedData.total_amount,
              status: decodedData.status || "FAILED",
            }),
          },
        );

        const result = await response.json();
        setStatusMessage(
          result.message || "Payment processing failed on the gateway side.",
        );
      } catch (err) {
        console.error("Error decoding failure data:", err);
        setStatusMessage(
          "Something went wrong while identifying your transaction status.",
        );
      } finally {
        setLoading(false);
      }
    };

    handleFailure();
  }, [encodedData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
        <p className="text-gray-600 font-medium">Processing cancellation...</p>
      </div>
    );
  }

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
          Payment Cancelled
        </h2>
        <p className="text-gray-500 mb-6 text-sm">{statusMessage}</p>
        <div className="space-y-2">
          <button
            onClick={() => navigate("/cart")}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition"
          >
            Return to Cart & Retry
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-xl transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
