import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import userStore from "../store/user";
import Profile from "./profile";
import Register from "./register";
import Cart from "./cart";
import { useEffect } from "react";
import Product from "../pages/products";
import LayOut from "../Layout";
import Shipping from "./shipping";
import Checkout from "./checkout";

const ProtectRoute = (props) => {
  const { user } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <div>{props.children}</div>;
};

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Home />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/profile"
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          />

          <Route
            path="/shipping"
            element={
              <ProtectRoute>
               <Shipping />
              </ProtectRoute>
            }
          />
           <Route
            path="/checkout"
            element={
              <ProtectRoute>
               <Checkout />
              </ProtectRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectRoute>
                <Cart />
              </ProtectRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
export default AppRouter;
