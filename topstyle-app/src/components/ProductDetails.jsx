import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../App";

const ProductDetails = () => {
  const { id } = useParams();
  const { cartProducts, setCartProducts, setCartSum } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  const addToCart = () => {
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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2 className="product-details-title">{product.productName}</h2>
      <p className="product-details-desc">
        Description: {product.productDescription}
      </p>
      <p className="product-details-price">Price: {product.productPrice} kr</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
