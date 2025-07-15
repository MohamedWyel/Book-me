import { useParams } from 'react-router-dom';
import hotelsData from '../data/hotels.json';

const HotelDetails = () => {
  const { id } = useParams();
  const hotel = hotelsData.find(h => h.id === id);

  if (!hotel) {
    return <div className="text-center mt-5">Hotel not found ❌</div>;
  }

  return (
    <div className="container py-5">
      <div className="card shadow">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="card-img-top"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h2 className="card-title fw-bold text-warning">{hotel.name}</h2>
          <p className="card-text text-muted">{hotel.location}</p>
          <p className="card-text">
            Welcome to {hotel.name}! Experience luxury and comfort at its finest.  
            Book your stay now and enjoy premium services and an unforgettable atmosphere.
          </p>
          <a href="/hotels" className="btn btn-dark">⬅ Back to Hotels</a>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
