import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyNavbar() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem("name"));
    setUsername(name);
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Bus Booking
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
            {username ? (
              <ul className="navbar-nav ml-auto me-4">
                <li className="nav-item ">
                  <a
                    className="nav-link dropdown-toggle active"
                    // to="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {username}
                  </a>

                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/profile" className="dropdown-item dropdown">
                      My Profile
                    </Link>
                    <Link to="/tickets" className="dropdown-item dropdown">
                      My Tickets
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={() => {
                        localStorage.removeItem("userId");
                        localStorage.removeItem("email");
                        localStorage.removeItem("name");
                        navigate("/login");
                      }}
                    >
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto me-4">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default MyNavbar;
