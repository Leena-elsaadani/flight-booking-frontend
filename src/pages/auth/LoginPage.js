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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;