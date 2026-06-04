import React, { useEffect, useState } from "react";
import AddProduct from "../../components/admin/AdminProduct/AddProduct";
import ProductTable from "../../components/admin/AdminProduct/ProductTable";
import { getAllProducts } from "../../api/productService";

const AdminProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data.products);
    };
    fetchProducts();
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

      <ProductTable products={products} />
    </div>
  );
};

export default AdminProducts;
