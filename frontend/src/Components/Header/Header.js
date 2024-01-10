import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../Common";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie("token");
    navigate("/");
  };
  return (
    <>
      <header>
        <div className="title">
          <h1>Products</h1>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
    </>
  );
};

export default Header;
