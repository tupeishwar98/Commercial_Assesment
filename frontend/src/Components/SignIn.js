import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookie, setCookie } from "../Common";
import Spinner from "./Spinner/Spinner";

const SignIn = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleLogin = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/login", { ...userDetails })
      .then((res) => {
        setLoading(false);
        setCookie("token", res?.data?.token);
        navigate("/products");
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  };
  useEffect(() => {
    deleteCookie("token");
  }, []);
  return (
    <div className="login-container">
      {loading ? (
        <Spinner />
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Login
            </button>
          </div>

          <p onClick={() => navigate("/signup")}>
            Don't have an account? Sign Up
          </p>
        </form>
      )}
    </div>
  );
};

export default SignIn;
