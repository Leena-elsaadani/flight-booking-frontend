// src/pages/flights/FlightsPage.js
import React, { useState, useEffect } from "react";
import axios from "../../api/api";
import FlightCard from "../../components/Flights/FlightCard";

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ from: "", to: "", date: "" });

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

  const handleSearch = e => {
    e.preventDefault();
    fetchFlights(filters);
  };

  const handleBook = flight => {
    alert(`Booking for flight ${flight.flightNumber} (API integration next step)`);
  };

  return (
    <div>
      <h2>Search Flights</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="From"
          value={filters.from}
          onChange={e => setFilters({ ...filters, from: e.target.value })}
        />
        <input
          placeholder="To"
          value={filters.to}
          onChange={e => setFilters({ ...filters, to: e.target.value })}
        />
        <input
          type="date"
          value={filters.date}
          onChange={e => setFilters({ ...filters, date: e.target.value })}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading flights...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && flights.length === 0 && <p>No flights found</p>}

      {flights.map(flight => (
        <FlightCard key={flight._id} flight={flight} onBook={handleBook} />
      ))}
    </div>
  );
};

export default FlightsPage;