import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../App";

const ContentContainer = () => {
  const [products, setProducts] = useState([]);
  const { cartProducts, setCartProducts, cartSum, setCartSum } =
    useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        //console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const addToCart = (product) => {
    // Kolla om produkten redan finns i Cart
    const existingProductIndex = cartProducts.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      // Isåfall, ändra dens antal
      const updatedCart = [...cartProducts];
      updatedCart[existingProductIndex].quantity++;
      setCartProducts(updatedCart);
      //console.log("uppdatera" + updatedCart);
    } else {
      // annars lägg till den
      const newProduct = { ...product, quantity: 1 };
      setCartProducts([...cartProducts, newProduct]);
      //console.log("ny" + newProduct);
    }

    // uppdatera totala summan
    setCartSum(cartSum + product.productPrice);
    //console.log(cartProducts);
  };

  return (
    <div className="content">
      <h2>All Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product">
            <h3>{product.productName}</h3>
            {
              //<p>{product.productDescription}</p>
            }
            <p>{product.productPrice} kr</p>
            <Link to={`/products/${product._id}`}>
              <button>View</button>
            </Link>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentContainer;
