// src/components/Bookings/BookingCard.js
import React, { useState } from "react";
import axios from "../../api/api";

const BookingCard = ({ booking, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const isConfirmed = booking.status === "confirmed";

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    setLoading(true);
    try {
      const res = await axios.put(`/bookings/${booking._id}/status`, { status: "canceled" });
      onStatusChange(res.data.data); // update parent list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>Flight: {booking.flight.flightNumber}</h3>
      <p>
        {booking.flight.from} → {booking.flight.to}
      </p>
      <p>Date: {new Date(booking.flight.date).toLocaleDateString()}</p>
      <p>Seats Booked: {booking.numberOfSeats}</p>
      <p>Total Price: ${booking.totalPrice}</p>
      <p>Status: {booking.status}</p>
      {isConfirmed && (
        <button onClick={handleCancel} disabled={loading}>
          {loading ? "Cancelling..." : "Cancel Booking"}
        </button>
      )}
    </div>
  );
};

export default BookingCard;