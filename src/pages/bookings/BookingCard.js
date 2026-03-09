import React, { useState, useEffect, useContext } from "react";
import axios from "../../api/api";
import BookingCard from "../../components/Bookings/BookingCard";
import { AuthContext } from "../../context/AuthContext";

const MyBookingsPage = () => {
  const { token } = useContext(AuthContext);
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
      if (res.data.success) {
        alert("Booking canceled successfully!");
        fetchBookings(); // refresh list
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>
      {loading && <p>Loading bookings...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && bookings.length === 0 && <p>No bookings yet.</p>}

      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          onCancel={() => cancelBooking(booking._id)}
        />
      ))}
    </div>
  );
};

export default MyBookingsPage;