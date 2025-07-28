import { useNavigate } from 'react-router-dom';

const Home = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-white text-dark"}>
      <div className="d-flex flex-column min-vh-100">

        {/* MAIN */}
        <main className="flex-grow-1">

          {/* Hero Section */}
          <section
            className="d-flex align-items-center justify-content-center text-white text-center mb-4"
            style={{
              background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1561501900-3701fa6a0864?fm=jpg&q=60&w=3000') center/cover no-repeat`,
              height: '80vh',
              position: 'relative'
            }}
          >
            <div className="p-5 rounded-4 shadow-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                maxWidth: '700px',
              }}
            >
              <h1 className="display-4 fw-bold mb-3">Welcome to <span className="text-warning">Book Me</span></h1>
              <p className="lead mb-4">
                Discover and book top-rated hotels in just a few clicks. Simple. Fast. Secure.
              </p>
              <button
                className="btn btn-warning btn-lg fw-bold px-4 py-2"
                onClick={() => navigate('/hotels')}
              >
                🔍 Find a Hotel
              </button>
            </div>
          </section>

          {/* Why Use Book Me */}
          <section className={`pt-5 pb-5 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} text-center`}>
            <div className="container">
              <h2 className="mb-4 fw-bold text-warning">Why Choose Book Me?</h2>
              <div className="row">
                <div className="col-md-4 mb-4">
                  <i className="bi bi-globe2 display-4 text-warning mb-3"></i>
                  <h4 className="fw-bold">Global Network</h4>
                  <p>Explore thousands of hotels in every major city around the world.</p>
                </div>
                <div className="col-md-4 mb-4">
                  <i className="bi bi-funnel display-4 text-warning mb-3"></i>
                  <h4 className="fw-bold">Smart Filters</h4>
                  <p>Search by rating, amenities, location, and more with powerful filters.</p>
                </div>
                <div className="col-md-4 mb-4">
                  <i className="bi bi-shield-lock-fill display-4 text-warning mb-3"></i>
                  <h4 className="fw-bold">Secure Booking</h4>
                  <p>Your data is safe with us. Fast and secure transactions guaranteed.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className={`py-4 ${darkMode ? 'bg-black' : 'bg-light'}`}>
            <div className="container text-center">
              <h2 className="fw-bold text-warning mb-5">What Our Users Say</h2>
              <div className="row justify-content-center">
                <div className="col-md-4 mb-4">
                  <div className="p-4 bg-white shadow rounded text-dark">
                    <p className="mb-3">"Best booking platform I've ever used. Clean interface and reliable results!"</p>
                    <h6 className="fw-bold mb-0">— Sarah M.</h6>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="p-4 bg-white shadow rounded text-dark">
                    <p className="mb-3">"Fast and easy to compare prices. I saved time and money!"</p>
                    <h6 className="fw-bold mb-0">— Ahmed K.</h6>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-5 text-center" style={{ backgroundColor: darkMode ? "#1e1e1e" : "#fef6e4" }}>
            <h2 className="fw-bold mb-3">Ready to Book Your Next Stay?</h2>
            <p className="mb-4">Sign up now and unlock exclusive hotel deals just for you.</p>
            <button
              className="btn btn-warning btn-lg fw-bold px-4 py-2"
              onClick={() => navigate('/hotels')}
            >
              ✨ Get Started
            </button>
          </section>
        </main>

        {/* Footer */}
        <footer
          className={`py-4 ${darkMode ? 'bg-dark text-light' : 'bg-warning text-dark'}`}
        >
          <div className="container text-center">
            <p className="mb-1 fw-semibold">&copy; {new Date().getFullYear()} Book Me. All rights reserved.</p>
            <div>
              <a href="#" className="text-decoration-none me-3 text-reset"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-decoration-none me-3 text-reset"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-decoration-none me-3 text-reset"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-decoration-none text-reset"><i className="bi bi-envelope"></i></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;