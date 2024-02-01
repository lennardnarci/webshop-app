import { useState, createContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./routes/MainPage";
import Login from "./routes/Login";
import CreateUser from "./routes/CreateUser";
import NavBar from "./components/NavBar";
import ProductDetails from "./components/ProductDetails";
import Cart from "./routes/Cart";
import SearchResults from "./routes/SearchResults";

export const AuthContext = createContext(null);
export const CartContext = createContext(null);

function App() {
  const [userID, setUserID] = useState();
  const [username, setUsername] = useState();
  const [cartProducts, setCartProducts] = useState([]);
  const [cartSum, setCartSum] = useState(0);

  return (
    <>
      <AuthContext.Provider
        value={{ userID, setUserID, username, setUsername }}
      >
        <CartContext.Provider
          value={{ cartProducts, setCartProducts, cartSum, setCartSum }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </Routes>
        </CartContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
