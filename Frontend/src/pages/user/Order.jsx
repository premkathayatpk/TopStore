import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Order = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrder = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/order/getOrder/${userId}`,
        { method: "GET" },
      );
      const data = await res.json();

      if (data.status === "success" && data.data) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getOrder(user._id);
    }
  }, [user]);

  const getStatusClass = (status) => {
    const base =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider";
    if (status === "completed" || status === "delivered") {
      return `${base} bg-green-100 text-green-800`;
    }
    if (status === "processing" || status === "pending") {
      return `${base} bg-amber-100 text-amber-800`;
    }
    return `${base} bg-red-100 text-red-800`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600 font-medium">
          Loading your orders...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Your Order History
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and view
            receipts.
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-lg">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow-sm border border-gray-200 rounded-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    Items Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    Financials
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    Total Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Order ID */}
                    <td className="whitespace-nowrap px-6 py-5 align-middle">
                      <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {index + 1}: #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-600 align-middle">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    {/* Populated Items Column */}
                    <td className="px-6 py-5 align-middle">
                      <div className="space-y-3 max-w-md">
                        {order.items?.map((item, index) => (
                          <div
                            key={item._id || index}
                            className="flex items-center space-x-3"
                          >
                            <img
                              src={`http://localhost:5000/uploads/${item.productId?.productImg}`}
                              alt={item.productId?.name}
                              className="h-12 w-12 flex-none rounded-lg bg-gray-100 object-cover object-center border border-gray-200"
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=100";
                              }}
                            />
                            <div className="flex-auto min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {item.productId?.name || "Product Discontinued"}
                              </p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}{" "}
                                <span className="mx-1">×</span> $
                                {item.productId?.price || 0}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Pricing Breakdown */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-500 align-middle">
                      <div className="space-y-0.5">
                        <div>
                          Subtotal:{" "}
                          <span className="text-gray-900">
                            ${order.subtotal}
                          </span>
                        </div>
                        <div>
                          Shipping:{" "}
                          <span className="text-gray-900">
                            ${order.shippingCharge}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Grand Total */}
                    <td className="whitespace-nowrap px-6 py-5 text-base font-bold text-gray-900 align-middle">
                      ${order.totalAmount}
                    </td>

                    {/* Dual Status Badges */}
                    <td className="whitespace-nowrap px-6 py-5 align-middle">
                      <div className="flex flex-col space-y-1.5 items-start">
                        <span className={getStatusClass(order.orderStatus)}>
                          📦 {order.orderStatus}
                        </span>
                        <span className={getStatusClass(order.paymentStatus)}>
                          💳 {order.paymentStatus}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
