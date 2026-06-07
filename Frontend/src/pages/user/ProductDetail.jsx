import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartProvider.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider.jsx";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductDetail = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { addToCart, updateQty } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState("");
  // console.log(id);
  const [qty, setQty] = useState(1);

  const getProductById = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/product/get/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      // console.log(data);
      setProduct(data.product);
    } catch (error) {
      console.error("error to fetch products", error);
    }
  };

  useEffect(() => {
    getProductById(id);
  }, []);

  if (!product) {
    return (
      <div className="p-20 text-center text-2xl font-semibold">
        Product not found!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-5">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
        <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-4">
          <img
            src={`http://localhost:5000/uploads/products/${product.productImg}`}
            alt={product.name}
            className="w-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-300 rounded-2xl"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div>
            <span className="text-sm font-bold text-blue-500 uppercase tracking-widest">
              Premium Quality
            </span>
            <h1 className="text-4xl font-extrabold text-gray-800 mt-2">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-orange-600">
              Rs.{product.price}
            </p>
            <p className="line-through text-gray-400 text-lg">
              Rs.{product.dis_price}
            </p>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
              {Math.round(
                ((product.dis_price - product.price) / product.dis_price) * 100,
              )}
              % OFF
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg italic">
            Stock Available:{" "}
            <span className="text-green-600 font-semibold">
              {product.stock} units
            </span>
          </p>

          {/* <div className="flex h-10 w-36 items-center justify-between rounded-xl border border-gray-300 bg-gray-50 p-1 shadow-sm  focus-within:ring-2 focus-within:ring-blue-500">
            <button
              type="button"
              onClick={() => {
                setQty(Math.max(1, qty - 1));
              }}
              disabled={qty <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            >
              <FaMinus />
            </button>

            <span className="w-12 text-center font-semibold text-gray-800 select-none tabular-nums">
              {qty}
            </span>

            <button
              type="button"
              onClick={() => {
                setQty(qty + 1);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            >
              <FaPlus />
            </button>
          </div> */}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              className="flex-1 text-xl py-4 px-8 text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-2xl font-bold shadow-lg shadow-blue-200"
              onClick={() => {
                navigate("/payment", { state: product.price + 100 });
              }}
            >
              Buy Now
            </button>
            <button
              className="flex-1 text-xl py-4 px-8 text-white bg-orange-500 hover:bg-orange-600 transition-colors rounded-2xl font-bold shadow-lg shadow-orange-200"
              onClick={() => {
                if (!user) return navigate("/login");
                addToCart(id);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-500 w-fit pb-2">
          Product Details
        </h2>
        <div className="mt-5 text-gray-700 leading-loose">
          <p className="text-lg">- {product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
