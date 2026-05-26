import React from "react";
import {
  FaShippingFast,
  FaShieldAlt,
  FaStore,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { MdOutlineVerifiedUser, MdOutlineSupportAgent } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const team = [
    {
      id: 1,
      name: "Alex Rivers",
      role: "Founder & CEO",
      image: "https://i.pravatar.cc/150?u=alex",
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Head of Design",
      image: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      id: 3,
      name: "Marcus Chen",
      role: "Operations Director",
      image: "https://i.pravatar.cc/150?u=marcus",
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      role: "Customer Success",
      image: "https://i.pravatar.cc/150?u=elena",
    },
  ];

  return (
    <div className="bg-gray-200">
      <div className="bg-blue-800 py-30 text-center text-white space-y-5">
        <h1 className="text-5xl font-extrabold">TopStore</h1>
        <p className="text-xl">
          <i>"Excellence in every click."</i>
        </p>
      </div>
      <section className="px-5 flex justify-center gap-12 ">
        <div className="flex items-center gap-3 bg-white shadow-xl w-80 py-4 px-4 rounded-xl -mt-10">
          <FaShippingFast size={28} color="blue" />
          <div>
            <p className="font-bold">Global Shopping</p>
            <p className="text-gray-600">Fast delivery worldwide</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white shadow-xl w-80 py-4 px-4 rounded-xl -mt-10">
          <FaShieldAlt size={28} color="green" />
          <div>
            <p className="font-bold">100% encrypted payments</p>
            <p className="text-gray-600">Fast delivery worldwide</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white shadow-xl w-80 py-4 px-4 rounded-xl -mt-10">
          <MdOutlineSupportAgent size={28} color="orange" />
          <div>
            <p className="font-bold">Expert Support</p>
            <p className="text-gray-600">Available 24/7 for you</p>
          </div>
        </div>
      </section>

      <section className="py-20   ">
        <div className="text-center">
          <h1 className="text-4xl font-bold  ">Meet the Visionaries</h1>
          <hr className="w-40 m-auto border-2 border-blue-700 my-5" />
          <p className="text-gray-500">
            The dedicated team making TopStore the best place to shop.
          </p>
        </div>

        <div className="flex justify-around flex-wrap gap-5 py-10">
          {team.map((item) => {
            return (
              <div key={item.id} className="text-center space-y-5">
                <div
                  style={{ backgroundImage: `url(${item.image})` }}
                  className="group bg-cover bg-no-repeat w-50 h-50 rounded-full flex gap-5 justify-around items-center border-5 border-white shadow-lg overflow-hidden "
                >
                  <div className="hidden group-hover:flex bg-black/40 w-full h-full  gap-5 justify-around items-center ">
                    <FaLinkedin
                      size={30}
                      className="text-blue-400 cursor-pointer "
                    />
                    <FaTwitter
                      size={30}
                      className="text-blue-400 cursor-pointer "
                    />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold">{item.name}</p>
                  <p className="text-2xl text-blue-700">{item.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white flex flex-wrap py-20 gap-10 px-10">
        <img
          src="https://img.freepik.com/premium-photo/luxury-shopping-mall-department-clothing-store-interior_271317-1371.jpg?w=2000"
          alt="office"
          className="w-[40%] rounded-2xl shadow-xl "
        />
        <div className="w-[50%] flex flex-col justify-center px-5 space-y-5">
          <h1 className="text-4xl font-bold  italic">
            "Designed For The Bold"
          </h1>
          <p className="text-gray-700 text-xl ">
            TopStore isn't just about selling products; it's about curated
            lifestyle choices. From the moment you land on our page to the
            second you unbox your order, we strive for perfection.
          </p>
          <button
            className="bg-black py-2 px-5 text-white text-xl rounded-xl w-45"
            onClick={() => {
              navigate("/contact");
            }}
          >
            Contact us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
