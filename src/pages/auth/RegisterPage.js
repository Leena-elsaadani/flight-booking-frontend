import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Layout/Loader";

const RegisterPage = () => {
  const { register, loading, error } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(name, email, password);
      setSuccessMsg("Registered successfully! Check your email for verification code.");
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/verify-email"), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      {successMsg && <p className="success">{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          required
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;