import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/getAll", {
        method: "GET",
      });

      const data = await res.json();
      // console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.error("error to fetch products", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // console.log(products);

  return (
    <>
      <div className="flex gap-10 justify-center flex-wrap py-15 px-15">
        {products?.map((item, index) => {
          return (
            <div
              key={index}
              className="  bg-white shadow-gray-200 shadow-lg overflow-hidden rounded-xl  duration-300 hover:shadow-2xl hover:-translate-y-2 w-70 cursor-pointer "
              onClick={() => {
                navigate(`/products/${item._id}`);
              }}
            >
              <img
                src={`http://localhost:5000/uploads/products/${item.productImg}`}
                alt={item.name}
                className="h-60 w-full "
              />
              <div className="py-4 px-5 ">
                <h1 className="text-xl font-bold ">{item.name}</h1>
                <div className="flex gap-2 ">
                  <h2 className="font-bold line-through text-gray-600 ">
                    Rs.
                    {item.dis_price}
                  </h2>
                  <h2 className="text-orange-600 font-bold ">
                    Rs.{item.price}
                  </h2>
                </div>

                <button className="text-blue-600  text-center w-full">
                  View more...
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Product;
