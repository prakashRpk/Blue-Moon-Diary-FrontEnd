import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../Port";
import "../Styles/Login.css";

export default function Login() {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const LogSubmit = async (e) => {
    e.preventDefault();

    const trimmedGmail = gmail.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedGmail || !trimmedPassword) {
      return alert("Please fill all fields.");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${BaseURL}/api/login`,
        { gmail: trimmedGmail, password: trimmedPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));


      navigate("/Diary", { replace: true });
      console.log(user);
    } catch (err) {
      console.error("Login error:", err?.response?.data || err.message);
      const message =
        err?.response?.data?.message ||
        (err.message.includes("Network")
          ? "Server not reachable"
          : "Login failed. Please check your credentials.");
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login-body">
    <div className="Login-container">
      <form onSubmit={LogSubmit} className="form">
        <h2 className="title">Login</h2>
        <input
          type="email"
          placeholder="Gmail"
          value={gmail}
          onChange={(e) => setGmail(e.target.value.toLowerCase())}
          className="input"
        />

        <div className="password-wrapper">
          <input
            type={secure ? "password" : "text"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input flex-input"
          />
          <button
            type="button"
            onClick={() => setSecure(!secure)}
            className="show-btn"
          >
            {secure ? "Show" : "Hide"}
          </button>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="Login-footer">
          Create a account?{" "}
          <a href="Register" className="login-link">Register</a>
        </p>
      </form>
    </div>
    </div>
  );
}
