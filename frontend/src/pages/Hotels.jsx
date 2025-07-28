import { useEffect, useState } from 'react';
import hotelsData from '../data/hotels.json';
import { Link } from 'react-router-dom';

const Hotels = ({ darkMode }) => {
    const [hotels, setHotels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('All');
    const [selectedRating, setSelectedRating] = useState('All');
    const [sortBy, setSortBy] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const hotelsPerPage = 6;

    useEffect(() => {
        setHotels(hotelsData);
    }, []);

    const filteredHotels = hotels
        .filter(hotel =>
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(hotel => selectedCity === 'All' || hotel.location === selectedCity)
        .filter(hotel => selectedRating === 'All' || hotel.rating === parseInt(selectedRating));

    const sortedHotels = [...filteredHotels].sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
    });

    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = sortedHotels.slice(indexOfFirstHotel, indexOfLastHotel);
    const totalPages = Math.ceil(sortedHotels.length / hotelsPerPage);

    const cities = [...new Set(hotels.map(h => h.location))];
    const ratings = [...new Set(hotels.map(h => h.rating))];

    return (
        <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
            <div className="container py-5" style={{ minHeight: '100vh' }}>
                <h2 className="text-center fw-bold mb-4 text-warning">Available Hotels</h2>

                {/* Search & Filters */}
                <div className="row mb-4 g-3">
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Search by name or location..."
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                            <option value="All">All Cities</option>
                            {cities.map((city, i) => (
                                <option key={i} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select className="form-select" value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
                            <option value="All">All Ratings</option>
                            {ratings.map((rating, i) => (
                                <option key={i} value={rating}>{rating} ⭐</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="">Sort By</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                            <option value="rating">Rating (High to Low)</option>
                        </select>
                    </div>
                </div>

                {/* Hotel Cards */}
                <div className="row">
                    {currentHotels.length > 0 ? (
                        currentHotels.map(hotel => (
                            <div className="col-md-4 mb-4" key={hotel.id}>
                                <div className="card shadow-sm h-100">
                                    <img
                                        src={hotel.image || "/default-hotel.jpg"}
                                        alt={hotel.name}
                                        className="card-img-top"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold d-flex justify-content-between">
                                            {hotel.name}
                                            <span className="text-warning">{'⭐'.repeat(hotel.rating)}</span>
                                        </h5>
                                        <p className="card-text">{hotel.location}</p>
                                        <p className="card-text text-muted">Price: ${hotel.price}</p>
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/hotels/${hotel.id}`} className="btn btn-warning fw-bold">
                                                View Hotel
                                            </Link>
                                            <button className="btn btn-outline-success">Book Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No hotels found.</p>
                    )}
                </div>

                {/* Pages */}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination custom-pagination">
                                {/* Prev button */}
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    >
                                        «
                                    </button>
                                </li>

                                {/* First Page */}
                                <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(1)}>1</button>
                                </li>

                                {/* Dots before middle pages */}
                                {currentPage > 3 && (
                                    <li className="page-item disabled">
                                        <span className="page-link">...</span>
                                    </li>
                                )}

                                {/* Middle Pages  */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(page =>
                                        page !== 1 &&
                                        page !== totalPages &&
                                        Math.abs(page - currentPage) <= 1
                                    )
                                    .map((page) => (
                                        <li
                                            key={page}
                                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                                        >
                                            <button className="page-link" onClick={() => setCurrentPage(page)}>
                                                {page}
                                            </button>
                                        </li>
                                    ))}

                                {/* Dots after middle pages */}
                                {currentPage < totalPages - 2 && (
                                    <li className="page-item disabled">
                                        <span className="page-link">...</span>
                                    </li>
                                )}

                                {/* Last Page */}
                                {totalPages > 1 && (
                                    <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(totalPages)}>
                                            {totalPages}
                                        </button>
                                    </li>
                                )}

                                {/* Next Button */}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    >
                                        »
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Hotels;