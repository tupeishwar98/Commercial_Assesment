import React from "react";
import { getCookie } from "..";
import { Navigate } from "react-router-dom";
import Header from "../../Components/Header/Header";

const PrivateRoute = ({ component }) => {
  const isToken = getCookie("token");

  if (!isToken) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <Header />
        {component}
      </>
    );
  }
};

export default PrivateRoute;
