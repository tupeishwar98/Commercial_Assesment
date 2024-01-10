import React from "react";
import "./popup.css";
import DOMPurify from "dompurify";
import Spinner from "../Spinner/Spinner";

const ViewPopup = (props) => {
  let { handleCloseClick, selectedProduct, isImageLoaded, handleImageLoad } =
    props;

  const sanitizedHtml = DOMPurify.sanitize(selectedProduct?.body_html);
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <button className="close-button" onClick={handleCloseClick}>
            X
          </button>
        </div>
        <div className="popup-body">
          <div className="image-container">
            {!isImageLoaded && <Spinner />}
            <img
              src={selectedProduct?.images[0]?.src}
              alt={selectedProduct?.images[0]?.alt}
              onLoad={handleImageLoad}
              style={{ display: isImageLoaded ? "block" : "none" }}
            />
          </div>
          <div className="content-container">
            <h2>{selectedProduct?.title}</h2>
            <p>
              <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPopup;
