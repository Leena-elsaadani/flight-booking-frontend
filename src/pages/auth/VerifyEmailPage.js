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
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div className="space-y-1">
        <h1 className="page-title">Verify your email</h1>
        <p className="page-subtitle">
          Enter the 6-digit code we sent to your inbox.
        </p>
      </div>

      <div className="card-surface p-6 sm:p-7">
        {loading && <Loader />}
        {error && <p className="alert-error">{error}</p>}
        {successMsg && <p className="alert-success">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="verify-email"
              className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
            >
              Email
            </label>
            <input
              id="verify-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="code"
              className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
            >
              Verification code
            </label>
            <input
              id="code"
              type="text"
              placeholder="6-digit code"
              value={code}
              required
              onChange={(e) => setCode(e.target.value)}
              className="form-input tracking-[0.3em] text-center"
            />
          </div>

          <button type="submit" className="primary-btn w-full mt-2">
            Verify email
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;