import React from "react";
import { products } from "../../data/products";
import { useNavigate } from "react-router-dom";
const Product = () => {
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/getAll", {
        method: "GET",
        // headers: {
        //   "Content-Type": "application",
        // },
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {}
  };

  getProducts();
  return (
    <>
      <div className="flex gap-10 justify-between flex-wrap py-15 px-20">
        {products?.map((item, index) => {
          return (
            <div
              key={index}
              className="  bg-white shadow-gray-200 shadow-lg overflow-hidden rounded-xl  duration-300 hover:shadow-2xl hover:-translate-y-2 w-80 cursor-pointer "
              onClick={() => {
                navigate(`/products/${item.id}`);
              }}
            >
              <img src={item.productImg} alt="Img" className="h-60 w-full " />
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
                {/* <p className="font-semibold ">Qty: {item.qty} </p>
                <p>{item.description} </p> */}

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
