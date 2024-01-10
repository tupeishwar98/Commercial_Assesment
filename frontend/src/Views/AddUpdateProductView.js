import React from "react";
import Spinner from "../Components/Spinner/Spinner";

const AddUpdateProductView = (props) => {
  let {
    handleChange,
    handleSubmit,
    product,
    navigate,
    formErrors,
    location,
    loading,
  } = props;
  return (
    <div className="container">
      <div className="my-3" style={{ display: "flex", alignItems: "center" }}>
        <span onClick={() => navigate("/products")}>
          <i
            style={{ fontSize: "20px", cursor: "pointer" }}
            className="fa-solid fa-angle-left mt-1"
          ></i>
        </span>
        <h5 className="m-1">
          {location?.state?.product?.title
            ? location?.state?.product?.title
            : "Create New Product"}
        </h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Title<span className="red">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={product?.title}
                onChange={handleChange}
              />
              {formErrors?.title && (
                <div className="red">{formErrors?.title}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Product Type<span className="red">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="product_type"
                value={product?.product_type}
                onChange={handleChange}
              />
              {formErrors?.product_type && (
                <div className="red">{formErrors?.product_type}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>
              Body Html<span className="red">*</span>
            </label>
            <textarea
              type="text"
              className="form-control"
              onChange={handleChange}
              name="body_html"
              value={product?.body_html}
            />
            {formErrors?.body_html && (
              <div className="red">{formErrors?.body_html}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Handle</label>
              <input
                type="text"
                className="form-control"
                name="handle"
                value={product?.handle}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                vendor<span className="red">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="vendor"
                value={product?.vendor}
                onChange={handleChange}
              />
              {formErrors?.vendor && (
                <div className="red">{formErrors?.vendor}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Tags</label>
              <input
                type="text"
                className="form-control"
                name="tags"
                value={product?.tags}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Status<span className="red">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="status"
                value={product?.status}
                onChange={handleChange}
              />
              {formErrors?.status && (
                <div className="red">{formErrors?.status}</div>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddUpdateProductView;
