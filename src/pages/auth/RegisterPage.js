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
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div className="space-y-1">
        <h1 className="page-title">Create your account</h1>
        <p className="page-subtitle">
          Register to start searching and booking flights.
        </p>
      </div>

      <div className="card-surface p-6 sm:p-7">
        {loading && <Loader />}
        {error && <p className="alert-error">{error}</p>}
        {successMsg && <p className="alert-success">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
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
              htmlFor="password"
              className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              required
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="primary-btn w-full mt-2">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-brand-accent hover:text-orange-400"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;