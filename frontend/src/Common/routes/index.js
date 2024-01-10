import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ProductsHomePage from "../../Containers/ProductsHomePage";
import SignIn from "../../Components/SignIn";
import SignUp from "../../Components/SignUp";
import AddUpdateProducts from "../../Containers/AddUpdateProducts";

export const routes = [
  //publicRoute
  <Route exact strict path="/" element={<SignIn />} />,
  <Route path="/signup" element={<SignUp />} />,

  //private Routes

  <Route
    path="/products"
    element={<PrivateRoute component={<ProductsHomePage />} />}
  />,

  <Route
    path="/products/add-edit"
    element={<PrivateRoute component={<AddUpdateProducts />} />}
  />,

  ,
];
