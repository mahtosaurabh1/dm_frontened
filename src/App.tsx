import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/auth/register";
import Login from "./pages/auth/login";
import MainLayout from "./pages/main-layout";
import Product from "./pages/module/product/product";
import Shop from "./pages/module/shop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Shop />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </Router>

    
  );
}

export default App;
