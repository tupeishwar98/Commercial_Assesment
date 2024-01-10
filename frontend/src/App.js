import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./Common/routes";

function App() {
  return (
    <div>
      <Routes>{routes}</Routes>
    </div>
  );
}

export default App;
