import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Profile = ({ darkMode, setUsername }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [image, setImage] = useState(null);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedPhone = localStorage.getItem("phone");
    const storedImage = localStorage.getItem("profileImage");

    if (!storedName) {
      navigate("/login");
    } else {
      setFullName(storedName);
      setEmail(storedEmail || "");
      setPhone(storedPhone || "");
      if (storedImage) setImage(storedImage);
      setTimeout(() => setAnimate(true), 100);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setUsername("");
    navigate("/login");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("profileImage", reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveName = () => {
    localStorage.setItem("username", fullName);
    setUsername(fullName);
    setEditingName(false);
  };

  const saveEmail = () => {
    localStorage.setItem("email", email);
    setEditingEmail(false);
  };

  const savePhone = () => {
    localStorage.setItem("phone", phone);
    setEditingPhone(false);
  };

  return (
    <div
      className={`min-vh-100 w-100 d-flex justify-content-center align-items-center ${
        darkMode ? "text-light bg-dark" : "text-dark bg-light"
      }`}
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1561501900-3701fa6a0864?fm=jpg&q=60&w=3000')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "30px",
      }}
    >
      <div
        className="p-4 rounded-4 shadow-lg text-center d-flex flex-column justify-content-start align-items-center"
        style={{
          width: "100%",
          maxWidth: "1000px",
          backdropFilter: animate ? "blur(12px)" : "blur(0px)",
          opacity: animate ? 1 : 0,
          transition: "backdrop-filter 1s ease, opacity 1s ease",
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Title */}
        <h2 className="text-warning mb-4 fw-bold fs-3">Your Profile</h2>

        <div className="row w-100">
          {/* Left Side Info */}
          <div className="col-md-3 text-start">
            <p>
              <FaMapMarkerAlt className="me-2 text-info" />
              Cairo, Egypt
            </p>
            <p>
              <FaCalendarAlt className="me-2 text-info" />
              Joined: Jan 2024
            </p>
            <p>
              <FaCalendarAlt className="me-2 text-info" />
              Last Login: July 27, 2025
            </p>
          </div>

          {/* Center Info */}
          <div className="col-md-6 text-center">
            {/* Profile Image */}
            <div className="mb-4">
              <img
                src={image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  border: "3px solid white",
                }}
              />
              <div>
                <label className="btn btn-sm btn-outline-warning mt-2">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            {/* Name */}
            <div className="mb-2">
              {editingName ? (
                <>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-control d-inline-block me-2"
                    style={{ width: "200px" }}
                  />
                  <button className="btn btn-success btn-sm" onClick={saveName}>
                    Save
                  </button>
                </>
              ) : (
                <p>
                  <strong>Name:</strong> {fullName}{" "}
                  <FaEdit
                    onClick={() => setEditingName(true)}
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                  />
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-2">
              {editingEmail ? (
                <>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control d-inline-block me-2"
                    style={{ width: "200px" }}
                  />
                  <button
                    className="btn btn-success btn-sm"
                    onClick={saveEmail}
                  >
                    Save
                  </button>
                </>
              ) : (
                <p>
                  <FaEnvelope className="me-1" />
                  <strong>Email:</strong> {email || "Not Provided"}{" "}
                  <FaEdit
                    onClick={() => setEditingEmail(true)}
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                  />
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-4">
              {editingPhone ? (
                <>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control d-inline-block me-2"
                    style={{ width: "200px" }}
                  />
                  <button
                    className="btn btn-success btn-sm"
                    onClick={savePhone}
                  >
                    Save
                  </button>
                </>
              ) : (
                <p>
                  <FaPhone className="me-1" />
                  <strong>Phone:</strong> {phone || "Not Provided"}{" "}
                  <FaEdit
                    onClick={() => setEditingPhone(true)}
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                  />
                </p>
              )}
            </div>
          </div>

          {/* Right Side Info */}
          <div className="col-md-3 text-end">
            <p>
              <strong>Status:</strong> Active
            </p>
            <p>
              <strong>Membership:</strong> Premium
            </p>
            <p>
              <strong>Bookings:</strong> 8
            </p>
          </div>
        </div>

        {/* Booking Actions */}
        <div className="mt-4">
          <button
            className="btn btn-outline-warning me-3"
            onClick={() => navigate("/bookings")}
          >
            📅 View All Bookings
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
