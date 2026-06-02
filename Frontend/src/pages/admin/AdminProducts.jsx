import React, { useState } from "react";
import AddProduct from "./AddProduct";

const AdminProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    </div>
  );
};

export default AdminProducts;
