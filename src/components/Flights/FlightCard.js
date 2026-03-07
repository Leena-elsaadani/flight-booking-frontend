// src/components/Flights/FlightCard.js
import React from "react";

const FlightCard = ({ flight, onBook }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>Flight: {flight.flightNumber}</h3>
      <p>
        {flight.from} → {flight.to}
      </p>
      <p>Date: {new Date(flight.date).toLocaleDateString()}</p>
      <p>Price: ${flight.price}</p>
      <p>Available Seats: {flight.availableSeats}</p>
      <button onClick={() => onBook(flight)} disabled={flight.availableSeats === 0}>
        {flight.availableSeats === 0 ? "Full" : "Book Now"}
      </button>
    </div>
  );
};

export default FlightCard;