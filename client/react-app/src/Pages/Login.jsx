import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    console.log(email);
    console.log(password);

    navigate("/employee");
  };

  return (
    <div className="login-page-container">
      <div className="login-page-image-container"></div>
      <div className="login-page-form-container">
        <h1>Login here</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Please enter your email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? Signup <Link to="signup">here!</Link></p>
      </div>
    </div>
  );
}

export default Login;