import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Login = () => {
  const [_username, set_Username] = useState("");
  const [_password, set_Password] = useState("");

  const { setUserID, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    set_Username(event.target.value);
  };

  const handlePasswordChange = (event) => {
    set_Password(event.target.value);
  };

  const handleLogin = () => {
    console.log("Username:", _username);
    console.log("Password:", _password);

    const data = {
      username: _username,
      password: _password,
    };
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.userID) {
          setUserID(data.userID);
          setUsername(_username);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <p>Username:</p>
        <input
          type="text"
          name="username"
          id="username"
          value={_username}
          onChange={handleUsernameChange}
        />
        <p>Password:</p>
        <input
          type="password"
          name="password"
          id="password"
          value={_password}
          onChange={handlePasswordChange}
        />
      </form>
      <Link to="/createUser">
        <button>Create user</button>
      </Link>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
