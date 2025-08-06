import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Book({ darkMode }) {
  const { roomId } = useParams();
  const [room, setRoom] = useState([]);
  const [user, setUser] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setpayment] = useState("");
  const [done, setDone] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("email");
      console.log(email);
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/getuser/${email}`
        );
        const data = await response.json();
        // console.log(data._id);
        if (!data._id) {
          navigate("/login");
          return;
        }
        setUser(data);
      } catch (err) {}
    };
    fetchUser();
  }, []);

  const fetchRoom = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/room/${roomId}`);
      const data = await response.json();
      setRoom(data);
      console.log(data.hotel);
      //   setHotelId(data.hotel);
    } catch (err) {
      console.log(err);
    }
  };

  const booking = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/book/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId,
          userId: user._id,
          checkOut,
          checkIn,
          paymentMethod: payment,
          isPaid: true,
        }),
      });
      const data = await response.json();
      if (data.message === "booking successful") {
        setPrice(data.book.totalPrice);
        console.log(data.body.totalPrice);
        console.log(data);
        return data;
      } else if (data.message === "room already booked") {
        alert("This room is already booked for the selected dates.");
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRoom();
  }, []);
  const book = async () => {
    const bookingData = await booking();
    if (bookingData) {
      alert("Booking successful");
    } else {
      // alert("Booking failed");
    }
  };
  const confirm = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/book/confirm", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId,
          userId: user._id,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "confirmed") {
        setDone(true);
        console.log(data + " confirmed");
      }
    } catch (err) {}
  };

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
      <div className="container py-5" style={{ minHeight: "100vh" }}>
        <h2 className="text-center fw-bold mb-4 text-warning">
          Booking Room Number {room.number}
        </h2>

        {!price && (
          <div className="row justify-content-center">
            <div className="col-md-6 bg-white p-4 rounded shadow">
              <div className="mb-3">
                <label className="form-label">Check In</label>
                <input
                  type="date"
                  className="form-control"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Check Out</label>
                <input
                  type="date"
                  className="form-control"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select
                  className="form-select"
                  value={payment}
                  onChange={(e) => setpayment(e.target.value)}
                >
                  <option> Select you payment </option>
                  <option value="cash">Cash</option>
                  <option value="credit card">credit card</option>
                  <option value="mobile wallet">Mobile Wallet</option>
                </select>
              </div>

              <button className="btn btn-primary w-100" onClick={book}>
                Next
              </button>
            </div>
          </div>
        )}
        {price && (
          <div className="text-center mt-5">
            <h4 className="text-success mb-3">
              Your Total Price is {price} EGP
            </h4>
            {!done ? (
              <button
                className="btn btn-success"
                onClick={() => {
                  confirm();
                }}
              >
                Confirm Booking
              </button>
            ) : (
              <span className="fw-bold text-success">
                You have successfully booked!
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
