import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CancelBooking = ({ darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const found = bookings.find(b => b.id === id);
        if (!found) {
            navigate('/bookings');
        } else {
            setBooking(found);
        }
    }, [id, navigate]);

    const handleCancel = () => {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const updated = bookings.filter(b => b.id !== id);
        localStorage.setItem('bookings', JSON.stringify(updated));
        navigate('/bookings');
    };

    return (
        <div
            className={`min-vh-100 d-flex flex-column ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: '0.3s ease'
            }}
        >
            {/* Navbar */}
            <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark' : 'navbar-light'} px-4`}
                style={{
                    fontFamily: '"Segoe UI", "Arial Black", sans-serif',
                    fontWeight: '900',
                    fontSize: '24px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                }}

            >
                <span className="navbar-brand fw-bold">
                    <b><b>
                        <i className="bi bi-building-fill-check me-2"></i>
                        Book Me : Your Booking cancelation
                    </b></b></span>
            </nav>

            {/* Main Content */}
            <div className="container my-auto d-flex justify-content-center align-items-center">
                <div
                    className="p-5 rounded-4 shadow-lg text-center animate__animated animate__fadeInUp"
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        backdropFilter: 'blur(14px)',
                        background: 'rgba(0, 0, 0, 0.75)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'white'
                    }}
                >
                    <div className="mb-4 px-5 py-3 rounded-4 shadow text-center border"
                        style={{
                            background: 'linear-gradient(135deg, rgba(33, 37, 41, 1), rgba(255, 255, 255, 0.2))',
                            backdropFilter: 'blur(8px)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <h2 className="text-warning mb-0 fw-bold fs-3">
                            <i className="bi bi-x-circle-fill me-2"></i>Cancel Your Booking
                        </h2>
                    </div>

                    {booking ? (
                        <>
                            <div className="text-start mb-4 fs-5">
                                <p><i className="bi bi-building me-2"></i><strong>Hotel:</strong> {booking.hotel}</p>
                                <p><i className="bi bi-calendar-event me-2"></i><strong>Date:</strong> {booking.date}</p>
                                <p><i className="bi bi-door-closed me-2"></i><strong>Room:</strong> {booking.room}</p>
                                <p><i className="bi bi-people-fill me-2"></i><strong>Guests:</strong> {booking.guests}</p>
                            </div>

                            <div className="d-flex gap-4 justify-content-center mt-4">
                                <button
                                    onClick={handleCancel}
                                    className="btn btn-danger px-4 py-2 fw-semibold shadow-sm"
                                    style={{ borderRadius: '30px' }}
                                >
                                    ❌ Confirm Cancel
                                </button>
                                <button
                                    onClick={() => navigate('/bookings')}
                                    className="btn btn-outline-light px-4 py-2 fw-semibold"
                                    style={{ borderRadius: '30px' }}
                                >
                                    🔙 Go Back
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="mt-4">Loading booking info...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CancelBooking;
