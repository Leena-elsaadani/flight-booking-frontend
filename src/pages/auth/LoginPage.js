import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/api"; // make sure this points to your axios instance

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", { email, password });

      // check success field from backend
      if (!res.data.success) {
        alert(res.data.message || "Login failed");
        return;
      }

      const token = res.data.data.token;
      localStorage.setItem("token", token);

      navigate("/flights");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div className="space-y-1">
        <h1 className="page-title">Welcome back</h1>
        <p className="page-subtitle">
          Sign in to manage your flights and bookings.
        </p>
      </div>

      <div className="card-surface p-6 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-4">
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
              onChange={(e) => setEmail(e.target.value)}
              required
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="primary-btn w-full mt-2">
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-brand-accent hover:text-orange-400"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;