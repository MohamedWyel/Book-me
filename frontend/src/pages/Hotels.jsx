import { useEffect, useState } from 'react';
import hotelsData from '../data/hotels.json'
import { Link } from 'react-router-dom';
const Hotels = ({ darkMode }) => {
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        setHotels(hotelsData);
    }, []);
    return (
        <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
            <div className="container py-5">
                <h2 className="text-center fw-bold mb-4 text-warning">Available Hotels</h2>
                <div className="row">
                    {hotels.map(hotel => (
                        <div className="col-md-4 mb-4" key={hotel.id}>
                            <div className="card shadow-sm h-100">
                                <img
                                    src={hotel.image || "/default-hotel.jpg"}
                                    alt={hotel.name}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{hotel.name}</h5>
                                    <p className="card-text">{hotel.location}</p>
                                    <Link to={`/hotels/${hotel.id}`} className="btn btn-warning fw-bold">
                                        View Hotel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hotels;
