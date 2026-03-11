// src/components/Flights/FlightCard.js
import React from "react";

const FlightCard = ({ flight, onBook }) => {
  const isFull = flight.availableSeats === 0;

  return (
    <article className="card-surface flex flex-col justify-between p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Flight
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-50">
            {flight.flightNumber}
          </h3>
        </div>
        <span
          className={
            isFull ? "badge-danger" : "badge-success"
          }
        >
          {isFull ? "Full" : "Available"}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3 text-sm text-slate-200">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
              From
            </p>
            <p className="mt-0.5 font-medium">{flight.from}</p>
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
            <p className="mt-0.5 font-medium">{flight.to}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
          <p className="text-slate-300">
            <span className="text-slate-400">Date:</span>{" "}
            {new Date(flight.date).toLocaleDateString()}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-400">Seats:</span>{" "}
            {flight.availableSeats}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
            From
          </p>
          <p className="mt-1 text-xl font-semibold text-brand-accent">
            ${flight.price}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onBook(flight)}
          disabled={isFull}
          className="primary-btn px-4 py-2 text-sm"
        >
          {isFull ? "Full" : "Book now"}
        </button>
      </div>
    </article>
  );
};

export default FlightCard;