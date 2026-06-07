import React from "react";
import { useCart } from "../../context/CartProvider";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineTrash as TrashIcon } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeItem, updateQty, clearCart } = useCart();
  const items = cart?.items || [];

  // Calculate total items seamlessly
  const totalItem = items.reduce((acc, item) => acc + (item?.quantity || 0), 0);

  // Calculate subtotal safely
  const subtotal = items.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * (item.quantity || 1),
    0,
  );

  const discount = 0;
  const totalDiscount = 0;
  const shipping = subtotal <= 0 ? 0 : 100;
  const grandTotal = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content  */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                  Shopping Cart
                  <span className="inline-flex items-center justify-center bg-orange-100 text-orange-600 text-sm font-bold px-3 py-1 rounded-full">
                    {totalItem} {totalItem === 1 ? "item" : "items"}
                  </span>
                </h1>
              </div>

              {items.length > 0 && (
                <button
                  className="text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 transition-colors rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer"
                  onClick={() => clearCart()}
                >
                  <TrashIcon className="text-lg" /> Clear All Items
                </button>
              )}
            </div>

            {/* Cart Items  */}
            {items.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-gray-50/50"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                      {/* Product Image */}
                      <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 mx-auto sm:mx-0">
                        <img
                          src={`http://localhost:5000/uploads/products/${item.productId?.productImg}`}
                          alt={item?.productId?.name || "Product"}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      {/*  Details Container */}
                      <div className="flex flex-col justify-center min-w-0 text-center sm:text-left space-y-1">
                        <h2 className="text-lg font-bold text-gray-900 truncate uppercase tracking-wide">
                          {item.productId?.name}
                        </h2>
                        <p className="text-sm font-medium text-gray-500">
                          <span className="text-blue-500">Category: </span>
                          {item.productId?.category}
                        </p>

                        {/* Remove Action Button */}
                        <div className="pt-2">
                          <button
                            className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-red-600 transition-colors h-9 px-3 border border-gray-200 rounded-xl hover:border-red-200 bg-white shadow-sm cursor-pointer"
                            onClick={() => removeItem(item.productId?._id)}
                          >
                            <TrashIcon className="text-base" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price + Quantity Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-0 pt-4 md:pt-0">
                      {/* Price Details */}
                      <div className="text-center sm:text-left md:text-right">
                        <p className="text-xl font-extrabold text-orange-600">
                          Rs.
                          {(
                            item.productId?.price * item.quantity
                          ).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Rs.{item.productId?.price}/each
                        </p>
                      </div>

                      {/* Quantity  */}
                      <div className="flex h-10 w-32 items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-1 shadow-inner">
                        <button
                          type="button"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQty(item.productId?._id, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow-sm disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                        >
                          <FaMinus className="text-xs" />
                        </button>

                        <span className="w-10 text-center font-bold text-gray-800 tabular-nums select-none">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQty(item.productId?._id, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow-sm transition-all cursor-pointer"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty Cart State */
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-16 px-6 text-center max-w-xl mx-auto mt-6">
                <div className="h-16 w-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShoppingBag className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Your cart is feeling light
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  Looks like you haven't added anything to your cart yet.
                  Explore our latest items to change that!
                </p>
                <NavLink
                  to="/products"
                  className="inline-flex items-center justify-center text-white bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Continue Shopping
                </NavLink>
              </div>
            )}
          </div>

          {/* R Order Summary Cards */}
          {items.length > 0 && (
            <div className="lg:col-span-4 lg:sticky lg:top-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-100">
                  Order Summary
                </h2>

                <div className="space-y-3 pt-2">
                  <div className="text-gray-600 flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span className="text-gray-900 font-semibold">
                      Rs.{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-green-600 flex justify-between font-medium">
                    <span>Discount</span>
                    <span>-Rs.{totalDiscount}</span>
                  </div>

                  <div className="text-gray-600 flex justify-between font-medium">
                    <span>Shipping</span>
                    <span className="text-gray-900 font-semibold">
                      {shipping === 0 ? "Free" : `Rs.${shipping}`}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-extrabold text-orange-600">
                    Rs.{grandTotal.toLocaleString()}
                  </span>
                </div>

                <button
                  className="w-full bg-orange-600 text-white py-3.5 px-4 rounded-xl text-lg font-bold shadow-md shadow-orange-600/10 hover:bg-orange-500 hover:shadow-lg transition-all transform active:scale-[0.99] mt-4 flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => {
                    navigate("/payment", { state: grandTotal });
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <span className="text-sm font-medium bg-orange-700/40 px-2 py-0.5 rounded-md">
                    {totalItem}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
