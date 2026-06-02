import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";

const AdminProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="p-6  w-[100%]">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products Inventory</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
        >
          + Add Product
        </button>
      </div>

      {isModalOpen && <AddProduct onClose={() => setIsModalOpen(false)} />}

      <div className="w-full bg-green-500 rounded-lg shadow-sm border border-gray-100 p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-semibold text-gray-700">
                Product Name
              </th>
              <th className="py-3 px-4 font-semibold text-gray-700">Price</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Stock</th>
              <th className="py-3 px-4 font-semibold text-gray-700">
                Category
              </th>
              <th className="py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Product rows would go here */}
            {products?.map((product) => (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">${product.price}</td>
                <td className="py-3 px-4">{product.stock}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
