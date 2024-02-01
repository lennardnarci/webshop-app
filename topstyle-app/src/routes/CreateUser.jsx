import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCreateUser = () => {
    console.log("Username:", username);
    console.log("Password:", password);

    const data = {
      username: username,
      password: password,
    };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User created successfully");
          navigate("/login");
        } else {
          console.error("Failed to create user");
        }
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div>
      <h1>Create User</h1>
      <form>
        <p>Username:</p>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <p>Password:</p>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </form>
      <div className="create-user-btns">
        <button onClick={handleCreateUser}>Create User</button>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default CreateUser;
