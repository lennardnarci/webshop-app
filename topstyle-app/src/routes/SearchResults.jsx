import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../App";

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const { cartProducts, setCartProducts, cartSum, setCartSum } =
    useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:5000/search/${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [query]);

  const addToCart = (product) => {
    const existingProductIndex = cartProducts.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cartProducts];
      updatedCart[existingProductIndex].quantity++;
      setCartProducts(updatedCart);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCartProducts([...cartProducts, newProduct]);
    }

    setCartSum(cartSum + product.productPrice);
  };

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      <div className="product-list">
        {searchResults.map((product) => (
          <div key={product._id} className="product">
            <h3>{product.productName}</h3>
            <p>Description: {product.productDescription}</p>
            <p>Price: {product.productPrice} kr</p>
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

export default SearchResults;
