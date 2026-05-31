import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/getMe", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } else {
        setUser(null);
        setIsError(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  //login
  const loginUser = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // await getUser();
        setUser(data.user);
        alert("Login successful!");
        return true;
      } else {
        alert(
          data.message ||
            "Login failed. Please check your credentials and try again.",
        );
        return false;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Unable to connect to the server. Please check your connection.");
      return false;
    }
  };

  //logout
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isError, getUser, loginUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
