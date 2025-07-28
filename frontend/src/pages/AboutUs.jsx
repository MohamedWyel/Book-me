const AboutUs = ({ darkMode }) => {
  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/2e/2a/b4/caption.jpg?w=900&h=500&s=1')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px',
      }}
    >
      <div
        className="card shadow-lg text-white"
        style={{
          maxWidth: '900px',
          width: '100%',
          borderRadius: '20px',
          backdropFilter: 'blur(8px)',
          background: 'rgba(0, 0, 0, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="card-body p-5">
          <h1 className="fw-bold text-warning mb-4">
            <i className="bi bi-info-circle-fill me-2"></i>About Book Me
          </h1>
          <p className="fs-5 text-white-50 mb-4">
            Book Me is your trusted travel partner. We help users find and book hotels around the world with ease, reliability, and confidence.
          </p>

          <h4 className="fw-bold text-light mt-4">🎯 Our Mission</h4>
          <p className="text-white-50">
            To simplify hotel booking with a user-friendly platform that offers great deals, verified reviews, and 24/7 support.
          </p>

          <h4 className="fw-bold text-light mt-4">✨ Why Choose Us?</h4>
          <ul className="text-white-50 fs-6">
            <li>Thousands of hotels worldwide</li>
            <li>Smart and fast search filters</li>
            <li>Competitive prices</li>
            <li>Dedicated support anytime</li>
          </ul>

          <div className="d-flex justify-content-end mt-5">
            <a
              href="/hotels"
              className="btn btn-warning text-dark fw-semibold px-4 py-2 rounded-pill shadow-sm"
            >
              🏨 Explore Hotels
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
