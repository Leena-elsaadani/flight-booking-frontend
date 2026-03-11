import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/flights" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-accent to-amber-400 text-slate-950 shadow-lg shadow-brand-accent/40">
            <span className="text-lg font-black leading-none">✈</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-[0.18em] text-slate-300/90 uppercase">
              SkyRoute
            </span>
            <span className="text-xs text-slate-400">
              Flight Booking
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-sm font-medium">
          {user && (
            <>
              <Link
                to="/flights"
                className="hidden rounded-full px-3 py-1.5 text-slate-200 hover:bg-slate-800/80 sm:inline-flex"
              >
                Flights
              </Link>
              <Link
                to="/my-bookings"
                className="hidden rounded-full px-3 py-1.5 text-slate-200 hover:bg-slate-800/80 sm:inline-flex"
              >
                My Bookings
              </Link>
            </>
          )}

          <div className="ml-1 flex items-center gap-2">
            {user ? (
              <>
                <span className="hidden text-xs text-slate-300/90 sm:inline">
                  Hello,{" "}
                  <span className="font-semibold text-slate-50">
                    {user.name}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="secondary-btn px-3 py-1.5 text-xs sm:text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="primary-btn px-3 py-1.5 text-xs sm:text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;