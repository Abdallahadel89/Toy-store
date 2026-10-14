import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Header from "./components/layout/header";
import StuffedProductDetailsPage from "./pages/StuffedProductDetailsPage";
import WoodenProductDetailsPage from "./pages/WoodenProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartDrawer from "./components/cart/CartDrawer";
import Fotter from "./components/layout/Fotter";
function App() {
  return (
    <>
      <Header />
      <CartDrawer />
      <Routes>
        <Route path="/Toy-store" element={<Home />} />
        <Route
          path="/Toy-store/products/stuffed/:slugOrId"
          element={<StuffedProductDetailsPage />}
        />
        <Route
          path="/Toy-store/products/wooden/:slugOrId"
          element={<WoodenProductDetailsPage />}
        />
        <Route path="/Toy-store/cart" element={<CartPage />} />
        <Route path="/Toy-store/checkout" element={<CheckoutPage />} />
      </Routes>
      <Fotter />
    </>
  );
}

export default App;
