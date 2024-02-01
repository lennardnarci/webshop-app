import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const { userID, username } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navbar-items">
        <NavLink to="/">Browse</NavLink>
        <SearchBar />
        {userID ? (
          <p className="login">{username}</p>
        ) : (
          <NavLink to="/login" className="login">
            Login
          </NavLink>
        )}
        <NavLink to="/cart">Cart</NavLink>
      </div>
    </div>
  );
};

export default NavBar;
