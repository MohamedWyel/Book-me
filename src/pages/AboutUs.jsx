const AboutUs = ({ darkMode }) => {
  return (
    <div className={darkMode ? 'bg-dark text-light' : 'bg-white text-dark'}>
      <div className="d-flex flex-column min-vh-100">

        <main className="flex-grow-1 d-flex align-items-center py-5">
          <div className="container">
            <div className="row shadow-lg overflow-hidden rounded-3" style={{ minHeight: '60vh' }}>
              {/* left section */}
              <div className="col-md-6 p-0">
                <div
                  style={{
                    backgroundImage: "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/2e/2a/b4/caption.jpg?w=900&h=500&s=1')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    width: '100%',
                    boxShadow: darkMode
                      ? 'inset -30px 0px 60px rgba(0, 0, 0, 0.5)'
                      : 'inset -30px 0px 60px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </div>

              {/* right section */}
              <div className="col-md-6 p-5">
                <h1 className="fw-bold text-warning mb-3">About Book Me</h1>
                <p>
                  Book Me is your trusted travel partner. We help users find and book hotels around the world with ease, reliability, and confidence.
                </p>
                <h5 className="fw-bold mt-4">Our Mission</h5>
                <p>
                  To simplify hotel booking with a user-friendly platform that offers great deals, verified reviews, and 24/7 support.
                </p>
                <h5 className="fw-bold mt-4">Why Choose Us?</h5>
                <ul>
                  <li>Thousands of hotels worldwide</li>
                  <li>Smart and fast search filters</li>
                  <li>Competitive prices</li>
                  <li>Dedicated support anytime</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <footer
          className="py-4 text-white text-center mt-auto"
          style={{ backgroundColor: darkMode ? 'rgba(33, 37, 41, 1)' : 'rgb(245, 135, 0)' }}
        >
          <p className="mb-0">&copy; {new Date().getFullYear()} Book Me. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;