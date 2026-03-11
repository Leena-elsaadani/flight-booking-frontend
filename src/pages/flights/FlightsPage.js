// src/pages/flights/FlightsPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/api"; // must use this instance
import FlightCard from "../../components/Flights/FlightCard";

const FlightsPage = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ from: "", to: "", date: "" });

  // Fetch flights
  const fetchFlights = async (query = {}) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams(query).toString();
      const res = await axios.get(`/flights/search?${params}`);
      setFlights(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights(); // initial load
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights(filters);
  };

  // Booking function
  const handleBook = async (flight) => {
    const seats = prompt(
      `Enter number of seats to book (available: ${flight.availableSeats}):`
    );
    if (!seats || isNaN(seats) || seats <= 0) return;

    try {
      const res = await axios.post("/bookings", {
        flightId: flight._id,
        numberOfSeats: Number(seats),
      });

      if (res.data.success) {
        alert("Booking successful!");
        // Update flights to reflect new available seats
        fetchFlights(filters);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-title">Search flights</h1>
          <p className="page-subtitle">
            Find the best routes and prices for your next trip.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/my-bookings")}
          className="secondary-btn self-start sm:self-auto"
        >
          View my bookings
        </button>
      </div>

      <div className="card-surface p-4 sm:p-5">
        <form
          onSubmit={handleSearch}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="from"
              className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
            >
              From
            </label>
            <input
              id="from"
              placeholder="City or airport"
              value={filters.from}
              onChange={(e) =>
                setFilters({ ...filters, from: e.target.value })
              }
              className="form-input"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="to"
              className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
            >
              To
            </label>
            <input
              id="to"
              placeholder="City or airport"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="date"
              className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="flex items-end">
            <button type="submit" className="primary-btn w-full">
              Search flights
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <p className="text-sm text-slate-300/90">Loading flights...</p>
      )}
      {error && <p className="alert-error">{error}</p>}
      {!loading && flights.length === 0 && (
        <p className="text-sm text-slate-300/80">No flights found.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {flights.map((flight) => (
          <FlightCard
            key={flight._id}
            flight={flight}
            onBook={() => handleBook(flight)}
          />
        ))}
      </div>
    </div>
  );
};

export default FlightsPage;