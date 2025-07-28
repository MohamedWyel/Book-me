import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Bookings = ({ darkMode }) => {
    const [bookings, setBookings] = useState([]);
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    const storedName = localStorage.getItem('username');
    let storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];

    if (!storedName) {
        navigate('/login');
    } else {
        const dummyBooking = {
            id: '5751',
            hotel: 'Four Seasons',
            date: '2025-08-10',
            room: 'Suite Room',
            guests: 2
        };

        const exists = storedBookings.some(b => b.id === dummyBooking.id);
        if (!exists) {
            storedBookings.push(dummyBooking);
            localStorage.setItem('bookings', JSON.stringify(storedBookings));
        }

        setBookings(storedBookings);
        setTimeout(() => setAnimate(true), 100);
    }
}, [navigate]);


    return (
        <div
            className={`min-vh-100 w-100 d-flex justify-content-center align-items-center ${darkMode ? 'text-light bg-dark' : 'text-dark bg-light'}`}
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1561501900-3701fa6a0864?fm=jpg&q=60&w=3000')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px'
            }}
        >
            <div
                className="p-4 rounded-4 shadow-lg text-center d-flex flex-column align-items-center"
                style={{
                    width: '100%',
                    maxWidth: '700px',
                    backdropFilter: animate ? 'blur(12px)' : 'blur(0px)',
                    opacity: animate ? 1 : 0,
                    transition: 'backdrop-filter 1s ease, opacity 1s ease',
                    background: 'linear-gradient(to bottom right, rgba(33, 37, 41, 1), rgba(0, 0, 0, 0.7))',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 1
                }}
            >
                <div className="mb-4 px-5 py-3 rounded-4 shadow text-center border"
                    style={{
                        background: 'linear-gradient(135deg, rgba(33, 37, 41, 1), rgba(255, 255, 255, 0.2))',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <h2 className="text-warning mb-0 fw-bold fs-3">Your Bookings</h2>
                </div>

                {bookings.length === 0 ? (
                    <p className="text-light">You have no bookings yet.</p>
                ) : (
                    bookings.map((booking, index) => (
                        <div
                            key={booking.id || index}
                            className="text-start w-100 mb-3 px-4 py-3 rounded-3 shadow-sm"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: 'white'
                            }}
                        >
                            <p className="mb-1"><strong>Hotel:</strong> {booking.hotel}</p>
                            <p className="mb-1"><strong>Date:</strong> {booking.date}</p>
                            <p className="mb-1"><strong>Room:</strong> {booking.room}</p>
                            <p className="mb-2"><strong>Guests:</strong> {booking.guests}</p>

                            <button
                                className="btn btn-sm btn-outline-danger fw-semibold"
                                onClick={() => navigate(`/cancel-booking/${booking.id}`)}
                            >
                                ❌ Cancel Booking
                            </button>
                        </div>
                    ))
                )}

                <button className="btn btn-outline-warning mt-4" onClick={() => navigate('/profile')}>
                    🔙 Back to Profile
                </button>
            </div>
        </div>
    );
};

export default Bookings;
