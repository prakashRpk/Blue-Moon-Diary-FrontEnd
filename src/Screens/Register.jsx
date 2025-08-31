import React, { useState } from "react";
import axios from "axios";
import { BaseURL } from "../Port";
import "../Styles/Reg.css";

export default function RegisterScreen({ navigate }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [phoneNo, setPhoneNo] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phoneNo.trim() || !gmail.trim() || !password.trim()) {
      alert("⚠ Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${BaseURL}/api/CreateUser`,
        { 
          name, 
          phoneNo, 
          gmail, 
          password,
          date: date.toDateString(),
          pgColorList: ["lightgreen", "lightblue"],
          moodList: ["happy", "sad", "heart break"],
          tagList: ["work", "personal", "home"]
         },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("✅ Registration successful! Please login.");
      if (navigate) navigate("/"); 
    } catch (err) {
      console.error("Register error:", err?.response?.data || err.message);
      const message =
        err?.response?.data?.message ||
        (err.message.includes("Network")
          ? "Server not reachable"
          : "Something went wrong");
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-body">
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-title">Register</h2>


        <input
          type="text"
          placeholder="User Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-input"
        />

        <input
          type="number"
          placeholder="Phone Number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="register-input"
        />

        <input
          type="email"
          placeholder="Email"
          value={gmail}
          onChange={(e) => setGmail(e.target.value.toLowerCase())}
          className="register-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="register-footer">
          Already have an account?{" "}
          <a href="/" className="login-link">Login</a>
        </p>
      </form>
    </div>
    </div>
  );
}
