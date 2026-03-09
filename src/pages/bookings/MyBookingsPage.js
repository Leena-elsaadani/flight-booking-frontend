// src/pages/bookings/MyBookingsPage.js
import React, { useEffect, useState } from "react";
import axios from "../../api/api";
import BookingCard from "../../components/Bookings/BookingCard";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleStatusChange = updatedBooking => {
    setBookings(prev =>
      prev.map(b => (b._id === updatedBooking._id ? updatedBooking : b))
    );
  };

  return (
    <div>
      <h2>My Bookings</h2>
      {loading && <p>Loading bookings...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map(b => (
        <BookingCard key={b._id} booking={b} onStatusChange={handleStatusChange} />
      ))}
    </div>
  );
};

export default MyBookingsPage;