import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import ViewProduct from "./ViewProduct";
import { deleteProduct } from "../../../api/productService";
import EditProduct from "./EditProduct";

const ProductTable = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100">
              <th className="py-4 text-center font-semibold text-xs uppercase tracking-wider text-gray-500 w-30">
                Image
              </th>
              <th className="py-4 px-6 font-semibold text-xs uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="py-4 px-6 font-semibold text-xs uppercase tracking-wider text-gray-500">
                Price
              </th>
              <th className="py-4 px-6 font-semibold text-xs uppercase tracking-wider text-gray-500">
                Stock
              </th>
              <th className="py-4 px-6 font-semibold text-xs uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="py-4 px-6 font-semibold text-xs uppercase tracking-wider text-gray-500 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50/50 transition-colors duration-150 group"
                >
                  {/* Product Image */}
                  <td className="py-4 px-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={`http://localhost:5000/uploads/products/${product.productImg}`}
                        alt={product.name}
                        className="w-50 h-15 object-cover rounded-lg border border-gray-100 bg-gray-50 shadow-sm group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </td>

                  {/* Product Name */}
                  <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-800">
                    {product.name}
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-semibold text-sm">
                    Rs.{Number(product.price).toFixed(2)}
                  </td>

                  {/* Stock Status Pill */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${
                        product.stock > 0
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                      />
                      {product.stock > 0
                        ? `${product.stock} Available`
                        : "Out of Stock"}
                    </span>
                  </td>

                  {/* Category Badge */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200/60">
                      {product.category}
                    </span>
                  </td>

                  {/* Action Buttons (Icon Layout) */}
                  <td className="py-4  whitespace-nowrap text-center  text-sm font-medium">
                    <div className="flex items-center justify-center gap-2">
                      {/* View Button */}
                      <button
                        title="View Product"
                        className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all border border-transparent hover:border-slate-200/50"
                        onClick={() => {
                          setProduct(product);
                          setIsOpen(true);
                        }}
                      >
                        <IoEyeOutline size={16} />
                      </button>

                      {/* Edit Button */}
                      <button
                        title="Edit Product"
                        className="p-2 text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all border border-transparent hover:border-indigo-200/50"
                        onClick={() => {
                          setProduct(product);
                          setIsModalOpen(true);
                        }}
                      >
                        <FaEdit size={16} />
                      </button>

                      {/* Delete Button */}
                      <button
                        title="Delete Product"
                        className="p-2 text-rose-600 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 rounded-lg transition-all border border-transparent hover:border-rose-200/50"
                        onClick={() => {
                          deleteProduct(product._id);
                          alert("Product Deleted successfully");
                          window.location.reload();
                        }}
                      >
                        <MdDeleteForever size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              /* Empty State Handling */
              <tr>
                <td
                  colSpan="6"
                  className="py-16 text-center text-gray-400 text-sm"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-base font-medium text-gray-500">
                      No products found
                    </span>
                    <p className="text-xs text-gray-400">
                      Your inventory is currently empty.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <ViewProduct
          isClose={() => {
            setIsOpen(false);
          }}
          product={product}
        />
      )}

      {isModalOpen && (
        <EditProduct onClose={() => setIsModalOpen(false)} product={product} />
      )}
    </div>
  );
};

export default ProductTable;
