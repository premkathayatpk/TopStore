const BASE_URL = "http://localhost:5000/api/product";

export const getAllProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/getAll`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/get/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};
