import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotels] = useState([]);
  const fetchone = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/hotel/${id}`);
      const data = await response.json();
      setHotels(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchone();
  });

  if (!hotel) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <h3 className="text-danger fw-bold">Hotel not found ❌</h3>
          <a href="/hotels" className="btn btn-outline-dark mt-3">
            ⬅ Back to Hotels
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${hotel.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
      }}
    >
      <div
        className="card shadow-lg text-white"
        style={{
          maxWidth: "800px",
          width: "100%",
          borderRadius: "20px",
          backdropFilter: "blur(8px)",
          background: "rgba(0, 0, 0, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <img
          src={hotel.images}
          alt={hotel.name}
          className="card-img-top rounded-top"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div className="card-body p-4">
          <h2 className="card-title fw-bold text-warning mb-2">
            <i className="bi bi-house-fill me-2"></i>
            {hotel.name}
          </h2>
          <p className="text-light mb-3">
            <i className="bi bi-geo-alt-fill me-2"></i>
            {hotel.location}
          </p>
          <p className="card-text text-white-50 fs-5">{hotel.description}</p>
          <p className="card-text">
            <span>Features:</span> {hotel.features?.join(",")}
          </p>

          {/* ✅ الزرين تحت */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Link
              to={`/rooms/${hotel._id}`}
              className="btn btn-warning text-dark fw-semibold px-3 py-2 rounded-pill shadow-sm"
            >
              Show Avaliable Rooms
            </Link>

            <a
              href="/hotels"
              className="btn btn-outline-light px-3 py-2 rounded-pill shadow-sm"
            >
              ⬅ Back to Hotels
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
