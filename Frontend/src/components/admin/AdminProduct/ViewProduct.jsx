import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit, FaDollarSign } from "react-icons/fa";
import {
  MdDeleteForever,
  MdOutlineCategory,
  MdInventory2,
} from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { getProductById } from "../../../api/productService";

const ViewProduct = ({ isClose, product }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={isClose}
      />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden z-10 border border-gray-100 ">
        <button
          onClick={isClose}
          className="absolute top-2 right-2 z-20 p-2 rounded-xl bg-white/90  text-gray-400 hover:text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm"
        >
          <IoClose size={18} />
        </button>

        <div className="relative h-56 bg-gray-50 border-b border-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={`http://localhost:5000/uploads/products/${product.productImg}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* category */}
          <span className="absolute bottom-3 left-4 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs  bg-white/90  text-slate-700 shadow-sm border border-blue-400">
            <MdOutlineCategory size={14} className="text-slate-500" />
            <span className="text-green-700 font-semibold">Category:</span>
            {product.category}
          </span>
        </div>

        {/* Product Details */}
        <div className="p-6">
          {/* Name */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              {product.name}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Price  */}
            <div className="bg-gray-50/70 border border-gray-100 p-3 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <FaDollarSign size={16} />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Price
                </p>
                <p className="text-base font-bold text-gray-900">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Stock  */}
            <div className="bg-gray-50/70 border border-gray-100 p-3 rounded-xl flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${product.stock > 0 ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"}`}
              >
                <MdInventory2 size={16} />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Stock Status
                </p>
                <p className="text-base font-bold text-gray-900">
                  {product.stock > 0
                    ? `${product.stock} Units`
                    : "Out of Stock"}
                </p>
              </div>
            </div>
          </div>

          {/* Product Description  */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Description
            </h4>
            <div className="bg-gray-50/40 border border-gray-200 rounded-xl p-4 min-h-30">
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description ||
                  "No description provided for this product item."}
              </p>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={isClose}
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-xl transition-all shadow-sm duration-150"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
