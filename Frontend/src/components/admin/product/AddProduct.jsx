import { useState } from "react";

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="max-w-md mx-auto my-8  p-4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Introduce a new item to your store inventory.
        </p>
      </div>

      <form className="p-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-x-2">
          <label className="text-sm font-semibold text-gray-700">
            Product Image
          </label>

          {!imagePreview ? <div>
            
          </div> : <div></div>}
          <input
            type="file"
            id="image"
            name="image"
            value=""
            // onChange={() => {}}
            className="border"
          />
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="stock">Stock</label>
          <input type="number" id="stock" name="stock" className="border" />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
