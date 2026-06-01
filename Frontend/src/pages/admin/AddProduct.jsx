import { useState } from "react";

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [initialFormData, setInitialFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalPayload = {
      ...formData,
      image: imagePreview,
    };

    console.log("Submitting Data:", finalPayload);

    setFormData(initialFormData);
    setImagePreview(null);
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Introduce a new item to your store inventory.
        </p>
      </div>

      <form className="p-6 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Product Image
          </label>

          {!imagePreview ? (
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 cursor-pointer group relative">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>

                <div className="flex text-sm text-gray-600 justify-center items-center">
                  <label
                    htmlFor="image"
                    className="cursor-pointer text-blue-600 hover:text-blue-500 font-medium underline"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      accept="image/*"
                      id="image"
                      name="image"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-4">
              <img
                src={imagePreview}
                alt="Product preview"
                className="max-h-64 object-contain rounded shadow-sm bg-white"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow transition-colors cursor-pointer"
                >
                  Remove Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g., Premium Leather Backpack"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Price and Stock Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="price"
              className="text-sm font-semibold text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="e.g., 100.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="stock"
              className="text-sm font-semibold text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="e.g., 10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Category Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="category"
            className="text-sm font-semibold text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g., Backpacks"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        {/* Description Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-gray-700"
          >
            Description
          </label>

          <textarea
            rows={4}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Write a detailed description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none"
          />
        </div>

        {/*  Buttons */}
        <div className="flex items-center justify-end gap-4 pt-2 border-t border-gray-100">
          <button
            type="button"
            className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              setFormData(initialFormData);
              handleRemoveImage();
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
