import hero from "../../assets/hero.jpg";
import { products } from "../../data/products.js";
import Product from "./Product.jsx";

const Home = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${hero})` }}
        className="w-full h-[650px] bg-cover bg-center bg-no-repeat flex justify-end items-end"
      >
        <button className="bg-orange-600 mb-25 mr-40 py-1 px-5 w-60 text-white font-bold text-xl rounded-xl  ">
          Shop Now
        </button>
      </div>
      <div>
        <h1 className="text-center mt-10 text-2xl font-bold">Features</h1>

        <Product />
      </div>
    </div>
  );
};

export default Home;
