import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import FlightsPage from "./pages/flights/FlightsPage";
import MyBookingsPage from "./pages/bookings/MyBookingsPage";
import PrivateRoute from "./utils/PrivateRoute.js";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route
        path="/flights"
        element={
          <PrivateRoute>
            <FlightsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <PrivateRoute>
            <MyBookingsPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/flights" />} />
    </Routes>
  );
}

export default App;