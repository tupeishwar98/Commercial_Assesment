import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner/Spinner";

const SignUp = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
    mobileNumber: "",
  });

  const [error, setError] = useState();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const validateFormData = () => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let mobileRegex = /^[0-9]{10}$/;

    console.log(emailRegex.test(userDetails?.email));

    let valid = true;

    const newErrors = {
      username: "",
      password: "",
      mobileNumber: "",
      email: "",
    };

    if (!userDetails.username) {
      valid = false;
      newErrors.username = "User Name is required";
    }

    // Validate email
    if (!userDetails.email) {
      valid = false;
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userDetails?.email)) {
      valid = false;
      newErrors.email = "Please Enter a valid Email";
    }

    // Validate password
    if (!userDetails.password) {
      valid = false;
      newErrors.password = "Password is required";
    } else if (userDetails.password.length < 6) {
      valid = false;
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!userDetails.mobileNumber) {
      valid = false;
      newErrors.mobileNumber = "Mobile Number is required";
    } else if (!mobileRegex.test(userDetails?.mobileNumber)) {
      valid = false;
      newErrors.mobileNumber = "Please Enter a valid Mobile Number";
    }

    setError(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (validateFormData()) {
      setLoading(true);
      try {
        await axios.post("http://localhost:5000/api/signup", {
          ...userDetails,
        });
        setLoading(false);
        navigate("/");
        alert("User Created Successfully");
      } catch (error) {
        setLoading(false);
        navigate("/");
      }
    } else {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      {loading ? (
        <Spinner />
      ) : (
        <form className="login-form" onSubmit={handleSignup}>
          <h2>Create Account</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={userDetails?.username}
              placeholder="Username"
              onChange={handleChange}
            />
            {error?.username && (
              <div style={{ color: "red" }}>{error.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userDetails?.password}
              onChange={handleChange}
              required
            />
            {error?.password && (
              <div style={{ color: "red" }}>{error.password}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="text"
              placeholder="Mobile Number"
              name="mobileNumber"
              value={userDetails?.mobileNumber}
              onChange={handleChange}
            />
            {error?.mobileNumber && (
              <div style={{ color: "red" }}>{error.mobileNumber}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              placeholder="email"
              name="email"
              value={userDetails?.email}
              onChange={handleChange}
            />
            {error?.email && <div style={{ color: "red" }}>{error.email}</div>}
          </div>

          <div className="form-group">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
              Signup
            </button>
          </div>

          <p onClick={() => navigate("/")}>Back To Login</p>
        </form>
      )}
    </div>
  );
};

export default SignUp;
