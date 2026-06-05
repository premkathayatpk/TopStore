import React, { useState } from "react";
import { useCart } from "../../context/CartProvider";
import { HiOutlineTrash } from "react-icons/hi"; //
import { NavLink, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const { cart, getCart, removeItem, addToCart, updateQty, clearCart } =
    useCart();
  const items = cart?.items || [];

  const totalItem = items.reduce((acc, item) => {
    return acc + item?.quantity;
  }, 0);

  const subtotal = items.reduce(
    (acc, item) => acc + item.productId.price * (item.quantity || 1),
    0,
  );

  const totalDiscount = 0;
  // const totalDiscount = cart.reduce(
  //   (acc, item) => acc + (item.dis_price - item.price) * (item.quantity || 1),
  //   0,
  // );
  const shipping = subtotal <= 0 ? 0 : 100;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-20  ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 justify-center">
        <div className="w-full lg:w-[65%]  ">
          {/* Cart field */}
          <div className=" bg-white rounded-2xl shadow-lg overflow-hidden ">
            <div className="flex justify-between pt-5 px-10 ">
              <h1 className="text-2xl font-bold">
                Shopping Cart (
                <span className="text-orange-500">
                  {cart.items?.reduce((acc, item) => {
                    return acc + (item.quantity || 0);
                  }, 0) || 0}
                </span>
                )
              </h1>
              <button
                className="text-red-600 font-bold cursor-pointer bg-gray-200 rounded-xl px-2 hover:bg-gray-300"
                onClick={() => clearCart()}
              >
                Clear All
              </button>
            </div>

            {/* cart items */}
            <div className="py-5 px-5 space-y-6 ">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-6  items-center border-t-2 border-gray-200 py-6"
                  >
                    <img
                      src={
                        item?.productId?.productImg
                          ? `http://localhost:5000/uploads/products/${item.productId.productImg}`
                          : "/placeholder.png"
                      }
                      alt={item?.productId?.name || "Product"}
                      className="h-28 w-28 object-cover rounded-xl bg-gray-50 border"
                    />
                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <h2 className="uppercase text-xl font-bold tracking-tight">
                        {item.productId.name}
                      </h2>
                      <div className="flex items-center gap-4">
                        <p className="text-xl font-bold text-orange-600">
                          Rs.{item.productId.price}
                        </p>
                        <p className="text-sm line-through text-gray-400">
                          {/* Rs.{item.productId.dis_price} */}
                        </p>
                      </div>
                      <button
                        className="flex items-center cursor-pointer text-gray-400 hover:text-red-500"
                        onClick={() => removeItem(item.productId.id)}
                      >
                        <HiOutlineTrash /> <span>Remove</span>
                      </button>
                    </div>
                    <div className="bg-gray-100 py-1 px-5 w-20 gap-4 flex justify-center items-center rounded-full">
                      <button
                        className="text-gray-500 hover:text-orange-600 font-black text-2xl cursor-pointer  "
                        onClick={() => {
                          updateQty(item.productId._id, "dec");
                        }}
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-gray-700">
                        {item.quantity || 1}
                      </span>
                      <button
                        className="text-gray-500 hover:text-orange-600 font-black text-2xl cursor-pointer"
                        onClick={() => {
                          updateQty(item.productId._id, "inc");
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 italic text-gray-400">
                  <span>Your cart feels a bit light. Add some items!</span>
                  <br />
                  <button className="text-white bg-blue-600 my-4 py-2 px-4 rounded-xl font-bold hover:bg-blue-500 cursor-pointer ">
                    <NavLink to="/products"> Continue To Shopping</NavLink>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* order */}
        {items.length > 0 && (
          <div className="w-full lg:w-[30%] ">
            <div className="bg-white py-2 px-5 space-y-3 rounded-2xl shadow-xl">
              <h1 className="text-2xl font-bold border-b-2 border-gray-400 py-2 ">
                Order Summary
              </h1>
              <p className="text-gray-800 text-xl font-semibold flex justify-between">
                Subtotal
                <span className="text-black">{subtotal + totalDiscount}</span>
              </p>
              <p className="text-green-600 text-xl font-semibold flex justify-between">
                Discount <span className="">-Rs.{totalDiscount}</span>
              </p>
              <p className="text-gray-800 text-xl font-semibold flex justify-between">
                Shipping <span className="text-black">Rs.{shipping}</span>
              </p>
              <p className="text-gray-800 text-2xl flex justify-between font-bold border-t-2 border-gray-400 py-2">
                Total
                <span className="text-orange-600">
                  Rs.{subtotal + shipping}
                </span>
              </p>
              <button
                className="bg-orange-600 text-white py-2  w-full rounded-xl text-xl font-bold mb-5 cursor-pointer hover:bg-orange-500
              "
                onClick={() => {
                  navigate("/payment", { state: shipping + subtotal });
                }}
              >
                Process to Checkout (
                <span className="font-medium">{totalItem}</span>)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
