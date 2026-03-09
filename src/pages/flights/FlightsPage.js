// src/pages/flights/FlightsPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // add this
import axios from "../../api/api"; // must use this instance
import FlightCard from "../../components/Flights/FlightCard";

const FlightsPage = () => {
  const navigate = useNavigate(); // add this
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
    <div>
      <h2>Search Flights</h2>

      {/* Navigate to My Bookings */}
      <button
        onClick={() => navigate("/my-bookings")}
        style={{ marginBottom: "1rem" }}
      >
        View My Bookings
      </button>

      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="From"
          value={filters.from}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
        />
        <input
          placeholder="To"
          value={filters.to}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading flights...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && flights.length === 0 && <p>No flights found</p>}

      {flights.map((flight) => (
        <FlightCard
          key={flight._id}
          flight={flight}
          onBook={() => handleBook(flight)}
        />
      ))}
    </div>
  );
};

export default FlightsPage;