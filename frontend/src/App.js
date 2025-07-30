import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels"
import HotelDetails from "./pages/HotelDetails";
import Profile from "./pages/Profile";
import Books from "./pages/Bookings"
import CancelBooking from "./pages/CancelBooking";
import Rooms from "./pages/Rooms";

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
      <div className={darkMode ? "bg-black text-light" : "bg-white text-dark"}>
        <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-black" : "navbar-light bg-white shadow-sm"} py-3`}>
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold text-warning" to="/">
              <img src="bookme-logo-grayscale-transparent.png" alt="BookMe Logo" style={{ width: "auto", height: "40px" }} />
              <span className="fs-4">Book Me</span>
            </Link>
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/aboutUs">About</Link>
                </li>
              </ul>

              <div className="d-flex align-items-center gap-2">
                {username ? (
                  <>
                    <Link to="/profile" className="text-decoration-none text-warning fw-semibold me-2">
                      👋 {username}
                    </Link>
                    <button onClick={handleLogout} className="btn btn-sm btn-outline-warning rounded-pill">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-sm btn-outline-primary rounded-pill">Login</Link>
                    <Link to="/register" className="btn btn-sm btn-warning rounded-pill">Register</Link>
                  </>
                )}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`btn btn-sm rounded-pill btn-${darkMode ? "light" : "dark"}`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>
              </div>
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
          <Route path="/books" element={<Books darkMode={darkMode} setUsername={setUsername} />} />
          <Route path="/cancel-booking/:id" element={<CancelBooking darkMode={darkMode} setUsername={setUsername} />} />
          <Route path="/rooms/:id" element={<Rooms darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
