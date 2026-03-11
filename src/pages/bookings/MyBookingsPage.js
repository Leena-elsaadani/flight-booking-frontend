// src/pages/bookings/MyBookingsPage.js
import React, { useState, useEffect, useContext } from "react";
import axios from "../../api/api";
import BookingCard from "../../components/Bookings/BookingCard";
import { AuthContext } from "../../context/AuthContext";

const MyBookingsPage = () => {
  const { token } = useContext(AuthContext); // Auth token from context
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user's bookings
  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/bookings/my-bookings");
      setBookings(res.data.data);
    } catch (err) {
      console.log("Fetch bookings error:", err.response);
      setError(err.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Cancel booking
  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await axios.put(`/bookings/${bookingId}/status`, {
        status: "canceled",
      });

      console.log("Cancel response:", res.data); // Debugging

      // Show success alert
      if (res.status === 200 || res.data.success) {
        alert(res.data.message || "Booking canceled successfully!");
        // Update only the canceled booking in state
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: "canceled" } : b
          )
        );
      } else {
        alert("Failed to cancel booking");
      }
    } catch (err) {
      console.log("Cancel booking error:", err.response);
      alert(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>My Bookings</h2>

      {loading && <p>Loading bookings...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && bookings.length === 0 && <p>No bookings yet.</p>}

      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          onCancel={
            booking.status === "confirmed"
              ? () => cancelBooking(booking._id)
              : null
          }
        />
      ))}
    </div>
  );
};

export default MyBookingsPage;