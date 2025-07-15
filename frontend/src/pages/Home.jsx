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
            className="hero-section d-flex align-items-center justify-content-center text-white text-center mb-4"
            style={{
              background: "url('https://images.unsplash.com/photo-1561501900-3701fa6a0864?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D') no-repeat center center",
              backgroundSize: "cover",
              height: "60vh",
              position: "relative"
            }}
          >
            <div
              className="p-5 rounded-4 shadow-lg"
              style={{
                backdropFilter: 'blur(10px)',
                backgroundColor: darkMode ? 'rgba(0,0,0,0.55)' : 'rgba(255, 255, 255, 0.7)',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0,0,0,0.1)',
                maxWidth: '600px',
                color: darkMode ? 'white' : 'black',
                transition: 'all 0.3s ease-in-out',
                borderRadius: '20px'
              }}
            >
              <h1 className="display-5 fw-bold mb-3">Welcome to <span className="text-warning">Book Me</span></h1>
              <p className="lead mb-4">
                Your trusted platform to search, compare, and book the best hotels across the globe.
              </p>
              <button 
                className="btn btn-warning btn-lg fw-bold"
                onClick={() => navigate('/hotels')}
              >
                Find a Hotel
              </button>
            </div>
          </section>

          {/* Why Use Section */}
          <section className={`pt-4 pb-5 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} text-center`}>
            <div className="container">
              <h2 className="mb-4 fw-bold text-warning">Why Use Book Me?</h2>
              <div className="row">
                <div className="col-md-4 mb-4">
                  <img src="/room1.jpg" alt="Wide Selection" className="img-fluid w-100 shadow" style={{ height: '220px', objectFit: 'cover' }} />
                  <h4 className="mt-3 fw-bold">Thousands of Hotels</h4>
                  <p>Wide range of hotels to suit every style and budget in any destination.</p>
                </div>
                <div className="col-md-4 mb-4">
                  <img src="/hotel1.jpg" alt="Easy Booking" className="img-fluid w-100 shadow" style={{ height: '220px', objectFit: 'cover' }} />
                  <h4 className="mt-3 fw-bold">Smart Search</h4>
                  <p>Filter by city, price, rating, or amenities to find the perfect stay.</p>
                </div>
                <div className="col-md-4 mb-4">
                  <img src="/hotel2.jpg" alt="Support" className="img-fluid w-100 shadow" style={{ height: '220px', objectFit: 'cover' }} />
                  <h4 className="mt-3 fw-bold">24/7 Support</h4>
                  <p>Need help? Our team is here for you anytime, anywhere.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call To Action */}
          <section className="py-5 text-center" style={{ backgroundColor: darkMode ? "#1e1e1e" : "#f5f5f5" }}>
            <h2 className="fw-bold mb-3">Ready to Book Your Next Stay?</h2>
            <p className="mb-4">Sign up now and explore amazing hotel deals all over the world.</p>
            <button 
              className="btn btn-warning btn-lg fw-bold"
              onClick={() => navigate('/hotels')}
            >
              Get Started
            </button>
          </section>
        </main>

        {/* Footer */}
        <footer
          className="py-4 text-white text-center"
          style={{ backgroundColor: darkMode ? 'rgba(33, 37, 41, 1)' : 'rgb(245, 135, 0)' }}
        >
          <p className="mb-1">&copy; {new Date().getFullYear()} Book Me. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
export default Home;