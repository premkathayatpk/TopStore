import React, { useState } from "react";

const Contact = () => {
  const [initialState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formData, setFormData] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    alert(
      "Thanks for reaching out! Our team will get back to you within 24 hours.",
    );
    setFormData(initialState);
  };
  return (
    <div className="py-10 px-25 flex flex-col justify-center items-center gap-5">
      <img
        src="https://media.istockphoto.com/id/1372286955/photo/contact-us.jpg?b=1&s=170667a&w=0&k=20&c=f-szSkE-FyP2zI4rkajWw7jCQrU1VUlsa6jDZm5xScQ="
        alt=""
        className="w-full h-130 rounded-2xl "
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[70%] items-center"
      >
        <legend className="text-2xl font-semibold text-[#5d047a]">
          Leave us a message
        </legend>
        <input
          type="text"
          placeholder="Your name*"
          className="border w-full px-4 py-2 text-xl rounded-md "
          name="name"
          value={formData.name}
          onChange={handleOnChange}
        />
        <input
          type="email"
          placeholder="Email*"
          className="border w-full px-4 py-2 text-xl rounded-md "
          name="email"
          value={formData.email}
          onChange={handleOnChange}
        />
        <input
          type="number"
          placeholder="Phone"
          className="border w-full px-4 py-2 text-xl rounded-md "
          name="phone"
          value={formData.phone}
          onChange={handleOnChange}
        />
        <textarea
          type="text"
          placeholder="Message*"
          rows={6}
          className="border w-full px-4 py-2 text-xl rounded-md "
          name="message"
          value={formData.message}
          onChange={handleOnChange}
        />

        <button
          type="submit"
          className="bg-green-600 py-2 rounded-xl w-full text-xl font-bold text-white hover:bg-green-700 cursor-pointer hover:w-[98%]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
