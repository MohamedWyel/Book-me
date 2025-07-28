import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels"
import HotelDetails from "./pages/HotelDetails";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings"
import CancelBooking from "./pages/CancelBooking";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
  };

  return (
    <Router>
      <div className={darkMode ? "bg-dark text-light" : "bg-white text-dark"}>
        <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
          <div className="container">
            <Link className="navbar-brand fw-bold text-warning" to="/">
              <img src="bookme-logo-grayscale-transparent.png" alt="Logo" style={{ width: "auto", height: "40px" }} />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/aboutUs">About</Link>
                </li>
              </ul>
              {username ? (
                <>
                  <Link to="/profile" className="me-3 text-decoration-none text-warning fw-bold">
                    👋 {username}
                  </Link>
                  <button onClick={handleLogout} className="btn btn-sm btn-outline-warning">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-sm btn-outline-primary me-2">Login</Link>
                  <Link to="/register" className="btn btn-sm btn-warning">Register</Link>
                </>
              )}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`btn btn-sm btn-${darkMode ? "light" : "dark"} me-3`}
              >
                {darkMode ? "Light ☀️" : "Dark 🌙"}
              </button>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/aboutUs" element={<AboutUs darkMode={darkMode} />} />
          <Route path="/login" element={<Login setUsername={setUsername} darkMode={darkMode} />} />
          <Route path="/register" element={<Register setUsername={setUsername} darkMode={darkMode} />} />
          <Route path="/hotels" element={<Hotels setUsername={setUsername} darkMode={darkMode} />} />
          <Route path="/hotels/:id" element={<HotelDetails setUsername={setUsername} darkMode={darkMode} />} />
          <Route path="/profile" element={<Profile darkMode={darkMode} setUsername={setUsername} />} />
          <Route path="/bookings" element={<Bookings darkMode={darkMode} setUsername={setUsername} />} />
          <Route path="/cancel-booking/:id" element={<CancelBooking darkMode={darkMode} setUsername={setUsername} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
