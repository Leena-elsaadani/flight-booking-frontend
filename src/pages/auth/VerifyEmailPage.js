import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Layout/Loader";

const VerifyEmailPage = () => {
  const { verifyEmail, loading, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(email, code);
      setSuccessMsg("Email verified successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify Email</h2>
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      {successMsg && <p className="success">{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="6-digit verification code"
          value={code}
          required
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyEmailPage;