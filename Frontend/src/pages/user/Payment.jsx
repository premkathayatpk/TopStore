import CryptoJS from "crypto-js";
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Payment = () => {
  const { state } = useLocation();
  const transaction_uuid = useMemo(() => uuidv4(), []);
  const product_code = "EPAYTEST";
  const secret_key = "8gBm/:&EnhH.1/q";

  const message = `total_amount=${state},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

  const hash = CryptoJS.HmacSHA256(message, secret_key);
  const signature = CryptoJS.enc.Base64.stringify(hash);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-[#60bb46] p-6 text-center">
          <p className="text-white text-xl font-bold mt-2 opacity-90">
            Secure Payment Gateway
          </p>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-gray-600 text-lg font-medium">
              Checkout Confirmation
            </h2>
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
              <span className="text-gray-500 block text-xs uppercase tracking-wider">
                Total Amount to Pay
              </span>
              <span className="text-[#60bb46] text-4xl font-extrabold">
                Rs. {state}
              </span>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm border-b pb-2">
              <span className="text-gray-500">Product Code</span>
              <span className="font-semibold text-gray-700">
                {product_code}
              </span>
            </div>
            <div className="flex justify-between text-sm border-b pb-2">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-semibold text-gray-700 text-xs truncate ml-4">
                {transaction_uuid.substring(0, 18)}...
              </span>
            </div>
          </div>

          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST"
          >
            <input
              type="hidden"
              id="amount"
              name="amount"
              value={state}
              required
            />
            <input
              type="hidden"
              id="tax_amount"
              name="tax_amount"
              value="0"
              required
            />
            <input
              type="hidden"
              id="total_amount"
              name="total_amount"
              value={state}
              required
            />
            <input
              type="hidden"
              id="transaction_uuid"
              name="transaction_uuid"
              value={transaction_uuid}
              required
            />
            <input
              type="hidden"
              id="product_code"
              name="product_code"
              value={product_code}
              required
            />
            <input
              type="hidden"
              id="product_service_charge"
              name="product_service_charge"
              value="0"
              required
            />
            <input
              type="hidden"
              id="product_delivery_charge"
              name="product_delivery_charge"
              value="0"
              required
            />
            <input
              type="hidden"
              id="success_url"
              name="success_url"
              value="https://developer.esewa.com.np/success"
              required
            />
            <input
              type="hidden"
              id="failure_url"
              name="failure_url"
              value="https://developer.esewa.com.np/failure"
              required
            />
            <input
              type="hidden"
              id="signed_field_names"
              name="signed_field_names"
              value="total_amount,transaction_uuid,product_code"
              required
            />
            <input
              type="hidden"
              id="signature"
              name="signature"
              value={signature}
              required
            />
            <button
              type="submit"
              className="w-full bg-[#60bb46] hover:bg-[#52a03c] text-white font-bold py-4 rounded-md transition duration-300 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Pay with eSewa</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
