import React, { useState } from 'react';

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-white text-dark"}>

      {/* Toggle Button */}
      <div className="text-end p-3">
        <button
          onClick={toggleMode}
          className={`btn btn-${darkMode ? 'light' : 'dark'} fw-bold`}
        >
          {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </button>
      </div>

      {/* Hero Section */}
      <section
        className="hero-section d-flex align-items-center justify-content-center text-white text-center mb-4"
        style={{
          background: "url('/hotel.jpg') no-repeat center center",
          backgroundSize: "cover",
          height: "50vh"
        }}
      >
        <div
          className="p-4 rounded"
          style={{
            backgroundColor: darkMode ? 'rgba(0,0,0,0.7)' : 'rgb(245, 135, 0)',
            maxWidth: '600px'
          }}
        >
          <h1 className="display-4 fw-bold mb-3">Welcome to Book Me</h1>
          <p className="lead">
            Your trusted platform to search, compare, and book the best hotels across the globe.
          </p>
          <button className="btn btn-warning btn-lg mt-4 fw-bold">Find a Hotel</button>
        </div>
      </section>

      {/* Features */}
      <section className={`pt-4 pb-2 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} text-center`}>
        <div className="container">
          <h2 className="mb-4 fw-bold text-warning">Why Use Book Me?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <img src="/room1.jpg" alt="Wide Selection" className="img-fluid w-100 shadow" style={{ height: '220px', objectFit: 'cover' }} />
              <h4 className="mt-3 fw-bold">Thousands of Hotels</h4>
              <p>Discover a wide range of hotels to suit every style and budget, in any destination.</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src="/hotel1.jpg" alt="Easy Booking" className="img-fluid w-100 shadow" style={{ height: '220px', objectFit: 'cover' }} />
              <h4 className="mt-3 fw-bold">Smart Search</h4>
              <p>Filter by city, price, rating, or amenities to find the perfect stay quickly and easily.</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src="/hotel2.jpg" alt="Support" className="img-fluid w-100 shadow" style={{ height: '220px', objectFit: 'cover' }} />
              <h4 className="mt-3 fw-bold">24/7 Customer Support</h4>
              <p>Need help with your reservation? Our team is here for you anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-4 text-white text-center"
        style={{ backgroundColor: darkMode ? 'rgba(33, 37, 41, 1)' : 'rgb(245, 135, 0)' }}
      >
        <p className="mb-1">&copy; {new Date().getFullYear()} Book Me. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
