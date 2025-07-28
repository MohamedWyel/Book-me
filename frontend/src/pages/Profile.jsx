import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const Profile = ({ darkMode, setUsername }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editingName, setEditingName] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPhone, setEditingPhone] = useState(false);
    const [image, setImage] = useState(null);
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');
        const storedPhone = localStorage.getItem('phone');
        const storedImage = localStorage.getItem('profileImage');

        if (!storedName) {
            navigate('/login');
        } else {
            setFullName(storedName);
            setEmail(storedEmail || '');
            setPhone(storedPhone || '');
            if (storedImage) setImage(storedImage);
            setTimeout(() => setAnimate(true), 100);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        setUsername('');
        navigate('/login');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                localStorage.setItem('profileImage', reader.result);
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveName = () => {
        localStorage.setItem('username', fullName);
        setUsername(fullName);
        setEditingName(false);
    };

    const saveEmail = () => {
        localStorage.setItem('email', email);
        setEditingEmail(false);
    };

    const savePhone = () => {
        localStorage.setItem('phone', phone);
        setEditingPhone(false);
    };

    return (
        <div
            className={`min-vh-100 w-100 d-flex justify-content-center align-items-center ${darkMode ? 'text-light bg-dark' : 'text-dark bg-light'}`}
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1561501900-3701fa6a0864?fm=jpg&q=60&w=3000')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                padding: '20px'
            }}
        >
            <div
                className="p-4 rounded-4 shadow-lg text-center d-flex flex-column justify-content-start align-items-center"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    backdropFilter: animate ? 'blur(12px)' : 'blur(0px)',
                    opacity: animate ? 1 : 0,
                    transition: 'backdrop-filter 1s ease, opacity 1s ease',
                    background: 'linear-gradient(to bottom right, rgba(33, 37, 41, 1), rgba(0, 0, 0, 0.7))',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 1
                }}
            >
                {/* Title */}
                <div
                    className="mb-5 px-5 py-3 rounded-4 shadow text-center border"
                    style={{
                        background: 'linear-gradient(135deg, rgba(33, 37, 41, 1), rgba(255, 255, 255, 0.2))',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <h2 className="text-warning mb-0 fw-bold fs-3">Your Profile</h2>
                </div>

                {/* Profile Image */}
                <div className="mb-4">
                    <img
                        src={image || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: '120px', height: '120px', objectFit: 'cover', border: '3px solid white' }}
                    />
                    <div>
                        <label className="btn btn-sm btn-outline-warning mt-2">
                            Change Photo
                            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                        </label>
                    </div>
                </div>

                {/* Full Name */}
                <div className="mb-3 d-flex align-items-center justify-content-center">
                    {editingName ? (
                        <>
                            <input
                                className="form-control me-2"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                style={{ maxWidth: '250px' }}
                            />
                            <button onClick={saveName} className="btn btn-success btn-sm">Save</button>
                        </>
                    ) : (
                        <>
                            <p className="mb-0"><strong>Name:</strong> {fullName}</p>
                            <FaEdit className="ms-2 text-primary" style={{ cursor: 'pointer' }} onClick={() => setEditingName(true)} />
                        </>
                    )}
                </div>

                {/* Email */}
                <div className="mb-3 d-flex align-items-center justify-content-center">
                    {editingEmail ? (
                        <>
                            <input
                                className="form-control me-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ maxWidth: '250px' }}
                            />
                            <button onClick={saveEmail} className="btn btn-success btn-sm">Save</button>
                        </>
                    ) : (
                        <>
                            <p className="mb-0"><strong>Email:</strong> {email || 'Not Provided'}</p>
                            <FaEdit className="ms-2 text-primary" style={{ cursor: 'pointer' }} onClick={() => setEditingEmail(true)} />
                        </>
                    )}
                </div>

                {/* Phone */}
                <div className="mb-3 d-flex align-items-center justify-content-center">
                    {editingPhone ? (
                        <>
                            <input
                                className="form-control me-2"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={{ maxWidth: '250px' }}
                                placeholder="Enter your phone"
                            />
                            <button onClick={savePhone} className="btn btn-success btn-sm">Save</button>
                        </>
                    ) : (
                        <>
                            <p className="mb-0"><strong>Phone:</strong> {phone || 'Not Provided'}</p>
                            <FaEdit className="ms-2 text-primary" style={{ cursor: 'pointer' }} onClick={() => setEditingPhone(true)} />
                        </>
                    )}
                </div>

                {/* Bookings Section */}
                <div className="mt-5 w-100 d-flex flex-column align-items-center">
                    <h4 className="mb-3 fw-bold text-warning">Manage Your Bookings</h4>
                    <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                        <button
                            className="btn btn-outline-warning px-4 py-2 fw-semibold rounded-4 shadow-sm"
                            onClick={() => navigate('/bookings')}
                        >
                            📅 View All Bookings
                        </button>
                    </div>
                </div>
                {/* Logout */}
                <button className="btn btn-danger mt-4 fw-bold" onClick={handleLogout}>Logout</button>
            </div>

        </div>
    );
};

export default Profile;
