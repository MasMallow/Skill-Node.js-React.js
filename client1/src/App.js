import "./App.css";
import "./index.css";
import { Fromproduct } from "./components/Fromproduct";
import { FromEditProduct } from "./components/FromEditProduct";
import LoginUser from "./components/LoginUser";
import Register from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="">
          <div className="name-text">MasMallowZz<span className="zzz">z</span></div>
          <Header/>
        <Routes>
          <Route path="/edit/:id" element={<FromEditProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LoginUser />} />
          <Route
            path="/menu"
            element={<ProtectedRoute element={Fromproduct} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;