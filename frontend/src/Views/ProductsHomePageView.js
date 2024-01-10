import React from "react";
import Spinner from "../Components/Spinner/Spinner";
import DeleteConfirmationModal from "../Components/Popup/DeletePopup";
import ViewPopup from "../Components/Popup/ViewPopup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ProductsHomePageView = (props) => {
  let {
    sortedData,
    loading,
    handleDeleteClick,
    handleCancelDelete,
    handleConfirmDelete,
    isDeleteModalOpen,
    handleUpdate,
    searchTerm,
    handleSearchChange,
    handleSort,
    navigate,
    selectedProduct,
    handleButtonClick,
    handleCloseClick,
    isPopupVisible,
    handleImageLoad,
    isImageLoaded,
    snackbarOpen,
    handleSnackbarClose,
    snackbarMessage,
  } = props;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="table-container">
          <div className="header">
            <div className="row my-3">
              <div className="col-md-11 col-10">
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
              <div
                className="col-md-1 col-2"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div className="dropdown">
                  <button
                    className="dropdown-button"
                    style={{ borderRadius: "25%" }}
                  >
                    <i className="fa-solid fa-gear"></i>
                  </button>

                  <div className="dropdown-content">
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/products/add-edit", {
                          state: {
                            operation: "create",
                          },
                        });
                      }}
                    >
                      Add New Product
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {sortedData?.length ? (
            <div className="row">
              <div className="col-md-12 col-12">
                <table className="colorful-table">
                  <thead>
                    <tr style={{ cursor: "pointer" }}>
                      <th>Image</th>
                      <th onClick={() => handleSort("title")}>Title</th>
                      <th onClick={() => handleSort("product_type")}>
                        Product Type
                      </th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item?.image?.src}
                            alt={`Image for ${item.title}`}
                            style={{ width: "100px", height: "100px" }}
                          />
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => handleButtonClick(item)}
                        >
                          {item.title}
                        </td>
                        <td>{item.product_type}</td>
                        <td onClick={() => handleUpdate(item)}>
                          <i className="fa-regular fa-pen-to-square"></i>
                        </td>
                        <td onClick={() => handleDeleteClick(item?.id)}>
                          <i className="fa-solid fa-trash"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h4 className="text-center">No Data Available</h4>
          )}

          {isPopupVisible && (
            <ViewPopup
              handleCloseClick={handleCloseClick}
              isImageLoaded={isImageLoaded}
              handleImageLoad={handleImageLoad}
              selectedProduct={selectedProduct}
            />
          )}

          {
            <DeleteConfirmationModal
              isOpen={isDeleteModalOpen}
              onCancel={handleCancelDelete}
              onConfirm={handleConfirmDelete}
            />
          }
          {
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000} // Adjust the duration as needed
              onClose={handleSnackbarClose}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity={
                  snackbarMessage && snackbarMessage?.includes("Successfully")
                    ? "success"
                    : "error"
                }
                onClose={handleSnackbarClose}
              >
                {snackbarMessage}
              </MuiAlert>
            </Snackbar>
          }
        </div>
      )}
    </>
  );
};

export default ProductsHomePageView;
