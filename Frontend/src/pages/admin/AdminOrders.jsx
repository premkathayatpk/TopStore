import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/order/getAllOrders", {
        method: "GET",
      });
      const data = await res.json();
      if (data.status === "success" && data.data) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Error fetching admin orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleUpdateStatus = async (orderId, fieldToUpdate, newValue) => {
    try {
      // Optimistically update state immediately
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, [fieldToUpdate]: newValue }
            : order,
        ),
      );

      const res = await fetch(
        `http://localhost:5000/api/order/updateStatus/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [fieldToUpdate]: newValue }),
        },
      );

      const data = await res.json();
      if (data.status !== "success") {
        alert("Failed to update status on server.");
        fetchAllOrders();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      fetchAllOrders();
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (
      !window.confirm("Are you sure you want to permanently delete this order?")
    ) {
      return;
    }

    try {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId),
      );

      const res = await fetch(
        `http://localhost:5000/api/order/deleteOrder/${orderId}`,
        { method: "DELETE" },
      );

      const data = await res.json();
      if (data.status !== "success") {
        alert("Failed to delete order from server.");
        fetchAllOrders();
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      fetchAllOrders();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600 font-medium">
          Loading Master Orders...
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Orders Management
        </h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50/70">
              <tr>
                <th
                  scope="col"
                  className="w-12 px-6 py-4 text-xs font-semibold uppercase text-gray-500"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold uppercase text-gray-500"
                >
                  Customer Info
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold uppercase text-gray-500"
                >
                  Items (Qty)
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold uppercase text-gray-500"
                >
                  Total Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold uppercase text-gray-500"
                >
                  Order Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold uppercase text-gray-500"
                >
                  Payment Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold uppercase text-gray-500 text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50/40 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-400 align-middle">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <div className="text-sm font-semibold text-gray-900">
                      {order.user?.name || "Guest / Deleted Account"}
                    </div>
                    <div className="text-xs font-mono text-gray-400 mt-0.5">
                      Order ID: #{order._id.slice(-6).toUpperCase()}
                    </div>
                  </td>

                  <td className="px-6 py-4 max-w-xs align-middle">
                    <div className="space-y-1">
                      {order.items?.map((item, idx) => (
                        <div
                          key={item._id || idx}
                          className="text-sm text-gray-700 truncate"
                        >
                          <span className="text-gray-400 mr-1.5">•</span>
                          {item.productId?.name || "Unknown Product"}
                          <span className="text-gray-400 text-xs font-medium ml-1">
                            (x{item.quantity})
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-gray-900 align-middle">
                    Rs.{order.totalAmount?.toLocaleString()}
                  </td>

                  {/* Order Status Select Column */}
                  <td className="px-6 py-4 align-middle">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleUpdateStatus(
                          order._id,
                          "orderStatus",
                          e.target.value,
                        )
                      }
                      className={`text-xs font-semibold rounded-lg p-1.5 cursor-pointer border border-transparent transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500
                        ${
                          order.orderStatus === "delivered"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : order.orderStatus === "cancelled"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Payment Status Select Column */}
                  <td className="px-6 py-4 align-middle">
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        handleUpdateStatus(
                          order._id,
                          "paymentStatus",
                          e.target.value,
                        )
                      }
                      className={`text-xs font-semibold rounded-lg p-1.5 cursor-pointer border border-transparent transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500
                        ${
                          order.paymentStatus === "completed"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : order.paymentStatus === "pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-red-50 text-red-700 border-red-200"
                        }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-center align-middle">
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="inline-flex items-center p-2 rounded-lg text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      title="Delete Order Record"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
