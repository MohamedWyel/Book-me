import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Rooms({ darkMode }) {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const fetchRooms = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/room/hotel/${id}`
      );
      const data = await response.json();
      console.log(data);
      console.log(id);
      setRooms(data);
    } catch (err) {
      console.error(err);
    }
  };
  const [hotelName, setHotelName] = useState("");
  const fetchHotelName = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/hotel/${id}`);
      const data = await response.json();
      setHotelName(data.name);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRooms();
    fetchHotelName();
  }, [id]);

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
      <div className="container py-5" style={{ minHeight: "100vh" }}>
        <h2 className="text-center fw-bold mb-4 text-warning">
          Available Rooms in {hotelName}
        </h2>

        <div className="row">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div key={room._id} className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <img
                    src={room.images || "default.jpg"}
                    className="card-img-top"
                    alt={`Room ${room.number}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{room.type}</h5>
                    <p className="card-text">Beds: {room.bed}</p>
                    <p className="card-text">Price: ${room.price}</p>
                    <p className="card-text">Meals: {room.meals?.join(", ")}</p>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Link
                      to={`/book/${room._id}`}
                      className="btn btn-outline-success text-center"
                      style={{ width: "45%", marginBottom: 20 }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No Rooms Available</p>
          )}
        </div>
      </div>
    </div>
  );
}
