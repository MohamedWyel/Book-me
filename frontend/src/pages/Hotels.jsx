import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";

const Hotels = ({ darkMode }) => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 6;
  const navigate = useNavigate();

  const filterPrice = async (sortBy) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hotel/filter/${sortBy}`
      );
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.log("err");
    }
  };

  const search = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hotel/search/${searchTerm}`
      );
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.log("err");
    }
  };
  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/hotel/");
      const data = await response.json();
      if (data) {
        setHotels(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const star = (rate) => {
    let array = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i) {
        array.push(<FaStar key={i} color={"yellow"} />);
      } else if (rate >= i - 0.5) {
        array.push(<FaStarHalf key={i} color={"yellow"} />);
      } else {
        break;
      }
    }
    return array;
  };
  useEffect(() => {
    fetchHotels();
  }, []);

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  const cities = [...new Set(hotels.map((h) => h.location))];
  const ratings = [...new Set(hotels.map((h) => h.rating))];

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
      <div className="container py-5" style={{ minHeight: "100vh" }}>
        <h2 className="text-center fw-bold mb-4 text-warning">
          Available Hotels
        </h2>

        {/* Search & Filters */}
        <div className="row mb-4 g-3">
          <div className="col-md-4 d-flex ">
            <input
              type="text"
              placeholder="Search by name or location..."
              className="form-control me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-warning"
              onClick={() => {
                search(searchTerm);
              }}
            >
              <span>search</span>
            </button>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                if (e.target.value === "All") {
                  fetchHotels();
                } else {
                  search(e.target.value);
                }
              }}
            >
              <option value="All">All Cities</option>
              {cities.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={selectedRating}
              onChange={(e) => {
                setSelectedRating(e.target.value);
                if (e.target.value === "All") {
                  fetchHotels();
                } else {
                  search(e.target.value);
                }
              }}
            >
              <option value="All">All Ratings</option>
              {ratings.map((rating, i) => (
                <option key={i} value={rating}>
                  {rating} ⭐
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);

                let sign = "";
                if (e.target.value === "price-asc") sign = "lth";
                else if (e.target.value === "price-desc") sign = "htl";
                else if (e.target.value === "rate-low") sign = "rhtl";
                else if (e.target.value === "rate-high") sign = "rltl";
                else sign = "";
                if (sign) filterPrice(sign);
              }}
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rate-low">Rating (High to Low)</option>
              <option value="rate-high">Rating (Low to High)</option>
            </select>
          </div>
        </div>

        {/* Hotel Cards */}
        <div className="row">
          {currentHotels.length > 0 ? (
            currentHotels.map((hotel) => (
              <div className="col-md-4 mb-4" key={hotel._id}>
                <div className="card shadow-sm h-100">
                  <img
                    src={hotel.images || "/default-hotel.jpg"}
                    alt={hotel.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold d-flex justify-content-between">
                      {hotel.name}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {star(hotel.rating)}
                      </div>
                    </h5>
                    <p className="card-text">{hotel.location}</p>
                    <p className="card-text text-muted">
                      Avarage Price: ${hotel.avgPrice}
                    </p>
                    <div className="d-flex justify-content-between">
                      <Link
                        to={`/hotels/${hotel._id}`}
                        className="btn btn-warning fw-bold"
                      >
                        View Hotel
                      </Link>
                      <button
                        onClick={() => {
                          navigate(`/rooms/${hotel._id}`);
                        }}
                        className="btn btn-outline-success"
                      >
                        Book Now
                      </button>
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
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    «
                  </button>
                </li>

                {/* First Page */}
                <li
                  className={`page-item ${currentPage === 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </button>
                </li>

                {/* Dots before middle pages */}
                {currentPage > 3 && (
                  <li className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )}

                {/* Middle Pages  */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page !== 1 &&
                      page !== totalPages &&
                      Math.abs(page - currentPage) <= 1
                  )
                  .map((page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(page)}
                      >
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
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </li>
                )}

                {/* Next Button */}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
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
