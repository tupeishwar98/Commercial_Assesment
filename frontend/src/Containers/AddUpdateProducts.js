import React, { useEffect, useState } from "react";
import AddUpdateProductView from "../Views/AddUpdateProductView";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../Common";

const AddUpdateProducts = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    vendor: "",
    status: "",
    body_html: "",
    product_type: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    vendor: "",
    status: "",
    body_html: "",
    product_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    let token = getCookie("token");
    e.preventDefault();

    const newErrors = {};
    const fieldsToCheck = [
      "title",
      "product_type",
      "body_html",
      "status",
      "vendor",
    ];

    fieldsToCheck.forEach((field) => {
      if (product[field].length === 0) {
        newErrors[field] = `${field} cannot be empty`;
        setLoading(false);
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      setLoading(false);
    } else {
      if (location?.state?.operation === "create") {
        try {
          const response = await axios.post(
            "http://localhost:5000/create-product",
            {
              ...product,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            }
          );
          setLoading(false);
          navigate("/products", {
            state: {
              snackbarMessage: "Product Created Successfully",
            },
          });
        } catch (error) {
          console.error("Error creating product:", error);
        }
      } else {
        try {
          const productId = `${location?.state?.product?.id}`;
          const response = await axios.put(
            `http://localhost:5000/update-product/${productId}`,
            {
              ...product,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            }
          );
          navigate("/products", {
            state: {
              snackbarMessage: "Product Updated Successfully",
            },
          });
        } catch (error) {
          console.error("Error updating product:", error);
        }
      }
    }
  };

  useEffect(() => {
    location?.state?.product && setProduct(location?.state?.product);
  }, []);

  return (
    <AddUpdateProductView
      product={product}
      formErrors={formErrors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      navigate={navigate}
      location={location}
      loading={loading}
    />
  );
};

export default AddUpdateProducts;
