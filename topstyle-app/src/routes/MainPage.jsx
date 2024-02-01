import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";

const MainPage = () => {
  return (
    <>
      <div className="hero">
        <h1 className="header-title">TopStyle</h1>
        <p className="header-desc">
          Welcome to TopStyle, your ultimate destination for premium clothing
          and shoes. At TopStyle, we are passionate about providing you with the
          latest trends, high-quality products, and exceptional customer
          service. Whether you're looking for stylish apparel, trendy footwear,
          or fashionable accessories, we've got you covered. Explore our
          extensive collection, curated with care to cater to every style and
          occasion. Elevate your wardrobe and step out in style with TopStyle!
        </p>
      </div>
      <div className="content-list">
        <ContentContainer />
      </div>
      <div className="footer">
        <div></div>
      </div>
    </>
  );
};

export default MainPage;
