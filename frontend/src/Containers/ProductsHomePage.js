import React, { useEffect, useState } from "react";
import ProductsHomePageView from "../Views/ProductsHomePageView";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../Common";

const ProductsHomePage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [productList, setProductList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [deleteId, setDeleteId] = useState();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortKey, setSortKey] = useState(null);

  const [sortOrder, setSortOrder] = useState("");

  const [isPopupVisible, setPopupVisible] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState({});

  const [isImageLoaded, setImageLoaded] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleButtonClick = (item) => {
    setSelectedProduct(item);
    setPopupVisible(true);
  };

  const handleCloseClick = () => {
    setPopupVisible(false);
    setImageLoaded(false);
    setSelectedProduct({});
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteId();
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteProduct();
  };

  const getProducts = () => {
    setLoading(true);
    let token = getCookie("token");
    fetch("http://localhost:5000/shopify-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setProductList(res?.products);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setSnackbarMessage(err);
        setSnackbarOpen(true);
      });
  };

  const deleteProduct = async () => {
    let token = getCookie("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/delete-product/${deleteId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      setDeleteModalOpen(false);
      getProducts();
      setSnackbarMessage("Product Deleted Successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setDeleteModalOpen(false);
      setSnackbarMessage("Error deleting product");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Filter data based on search term
  const filteredData =
    productList &&
    productList?.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.product_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Sort data based on the selected key and order
  const sortedData = filteredData?.sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleProtected = () => {
    let token = getCookie("token");
    if (!token) {
      navigate("/");
    }
  };

  const handleUpdate = (item) => {
    navigate("/products/add-edit", {
      state: {
        product: item,
      },
    });
  };

  useEffect(() => {
    // Update body overflow when the popup visibility changes
    document.body.style.overflow = isPopupVisible ? "hidden" : "auto";

    // Cleanup effect
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopupVisible]);

  useEffect(() => {
    getProducts();
    handleProtected();
    handleSort("id");
    if (location?.state?.snackbarMessage) {
      setSnackbarOpen(true);
      setSnackbarMessage(location?.state?.snackbarMessage);
    }
  }, []);

  return (
    <ProductsHomePageView
      handleDeleteClick={handleDeleteClick}
      loading={loading}
      handleCancelDelete={handleCancelDelete}
      handleConfirmDelete={handleConfirmDelete}
      isDeleteModalOpen={isDeleteModalOpen}
      sortedData={sortedData}
      handleUpdate={handleUpdate}
      searchTerm={searchTerm}
      handleSearchChange={handleSearchChange}
      handleSort={handleSort}
      navigate={navigate}
      selectedProduct={selectedProduct}
      handleButtonClick={handleButtonClick}
      handleCloseClick={handleCloseClick}
      isPopupVisible={isPopupVisible}
      handleImageLoad={handleImageLoad}
      isImageLoaded={isImageLoaded}
      snackbarOpen={snackbarOpen}
      handleSnackbarClose={handleSnackbarClose}
      snackbarMessage={snackbarMessage}
    />
  );
};

export default ProductsHomePage;
