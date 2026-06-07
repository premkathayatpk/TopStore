import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

const CartContext = createContext();

const API = "http://localhost:5000/api/cart";

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const userId = user?._id;
  const [cart, setCart] = useState([]);
  // const [qty, setQty] = useState("");

  //Get cart
  const getCart = async (userId) => {
    if (!userId) return;

    try {
      const res = await fetch(`${API}/get/${userId}`, {
        method: "GET",
      });

      const data = await res.json();
      if (res.ok) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Error to featch cart ", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getCart(userId);
    }
  }, [userId]);

  //Add to cart
  const addToCart = async (productId) => {
    if (!userId) return;

    try {
      const res = await fetch(`${API}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Product added to cart Successfylly");
        setCart(data.cart);
        getCart(userId);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error to featch cart ", error);
    }
  };

  //remove item
  const removeItem = async (productId) => {
    if (!userId) return;

    try {
      const res = await fetch(`${API}/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Item Remove Successfully");
        setCart(data.cart);
        getCart(userId);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error to featch cart ", error);
    }
  };

  //update qty
  const updateQty = async (productId, quantity) => {
    if (!userId) return;

    try {
      const res = await fetch(`${API}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });
      const data = await res.json();

      if (res.ok) {
        setCart(data.cart);
        getCart(userId);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error to featch cart ", error);
    }
  };

  //clear cart
  const clearCart = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`${API}/clear/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setCart(data.cart);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error to clear cart ", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, getCart, addToCart, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
