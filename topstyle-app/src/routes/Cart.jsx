import React, { useContext } from "react";
import { AuthContext, CartContext } from "../App";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartProducts, cartSum, setCartProducts, setCartSum } =
    useContext(CartContext);
  const { userID } = useContext(AuthContext);

  const handleRemoveOne = (productId) => {
    const updatedCart = cartProducts.map((product) => {
      if (product._id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });

    const removedProduct = cartProducts.find(
      (product) => product._id === productId
    );
    const newSum = cartSum - removedProduct.productPrice;

    setCartProducts(updatedCart);
    setCartSum(newSum);
  };

  const handleRemoveAll = (productId) => {
    const updatedCart = cartProducts.filter(
      (product) => product._id !== productId
    );
    const removedProduct = cartProducts.find(
      (product) => product._id === productId
    );
    const newSum =
      cartSum - removedProduct.productPrice * removedProduct.quantity;

    setCartProducts(updatedCart);
    setCartSum(newSum);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      user: userID,
      products: cartProducts.map((product) => product._id),
      orderSum: cartSum,
    };

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log("Order placed successfully");
        setCartProducts([]);
        setCartSum(0);
      } else {
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartProducts && cartProducts.length > 0 ? (
        <div className="cart-products">
          {cartProducts.map((product) => (
            <div key={product._id} className="cart-product">
              <p className="cart-product-name">{product.productName}</p>
              <p className="cart-product-price">
                Price: {product.productPrice} kr
              </p>
              <p className="cart-product-quantity">
                Quantity: {product.quantity}
              </p>
              <button
                onClick={() => handleRemoveOne(product._id)}
                disabled={product.quantity < 2}
              >
                Remove One
              </button>
              <button onClick={() => handleRemoveAll(product._id)}>
                Remove All
              </button>
            </div>
          ))}
          <p className="cart-total">Total: {cartSum.toFixed(2)} kr</p>
          {userID ? (
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place order
            </button>
          ) : (
            <Link to="/login">Login to place order</Link>
          )}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
