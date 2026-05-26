import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("user");
    alert("Logout, Successfully");
    navigate("/login");
    window.location.reload();
  }, [navigate]);
  return <div></div>;
};

export default Logout;
