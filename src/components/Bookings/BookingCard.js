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
      const res = await axios.put(`/bookings/${booking._id}/status`, {
        status: "canceled",
      });
      onStatusChange(res.data.data); // update parent list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="card-surface flex flex-col justify-between p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Booking
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-50">
            {booking.flight.flightNumber}
          </h3>
        </div>
        <span
          className={
            booking.status === "confirmed"
              ? "badge-success"
              : booking.status === "canceled"
              ? "badge-danger"
              : "badge-warning"
          }
        >
          {booking.status}
        </span>
      </div>

      <div className="mt-4 space-y-3 text-sm text-slate-200">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
              From
            </p>
            <p className="mt-0.5 font-medium">{booking.flight.from}</p>
          </div>
          <div className="flex flex-1 items-center justify-center text-slate-500">
            <span className="mx-1 h-px w-6 bg-slate-700" />
            <span className="text-lg">✈</span>
            <span className="mx-1 h-px w-6 bg-slate-700" />
          </div>
          <div className="text-right">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
              To
            </p>
            <p className="mt-0.5 font-medium">{booking.flight.to}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <p className="text-slate-300">
            <span className="text-slate-400">Date:</span>{" "}
            {new Date(booking.flight.date).toLocaleDateString()}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-400">Seats:</span>{" "}
            {booking.numberOfSeats}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-400">Total:</span> $
            {booking.totalPrice}
          </p>
        </div>
      </div>

      {isConfirmed && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="secondary-btn px-4 py-2 text-xs sm:text-sm text-rose-100 border-rose-500/50 hover:bg-rose-500/10"
          >
            {loading ? "Cancelling..." : "Cancel booking"}
          </button>
        </div>
      )}
    </article>
  );
};

export default BookingCard;
