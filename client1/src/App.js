import "./App.css";
import "./index.css";
import { Fromproduct } from "./components/Fromproduct";
import { FromEditProduct } from "./components/FromEditProduct";
import LoginUser from "./components/LoginUser";
import Register from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  ProtectedRoute  from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1 className="">From react</h1>
        <Routes>
          <Route path="/edit/:id" element={<FromEditProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LoginUser />} />
          <Route path="/menu" element={<ProtectedRoute element={Fromproduct} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;