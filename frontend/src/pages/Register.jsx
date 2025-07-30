import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUsername, darkMode }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [wrongEmail, setWrongEmail] = useState(false);  
  const [wrongPassword, setWrongPassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const creatUser=async()=>{
    try{
    const response =await fetch('http://localhost:5000/api/auth/register',
     { method:"post",
      headers:{
        "Content-Type" :"application/json"
      },
      body:JSON.stringify({
        userName:fullName ,
        email,
        password
      })
     }
    )
    const data =await response.json();
    if(response.ok){
      alert("account created")
      return data;
    }else{
      if(data.message ==="User already exist"){
        setEmailExists(true);
      }
      else if(data.message ==="email not vaild"){
        setWrongEmail(true);
      }
      else if(data.message ==="password not vaild"){
        setWrongPassword(true);
      }

      return null;
    }
  }catch(err){
    setEmailExists(false);
    setWrongEmail(false);
    setWrongPassword(false);
    return null;
  }
    
  }
  

  const handleRegister = async(e) => {
    e.preventDefault();
    if (fullName.trim() && email.trim() && password.trim()) {
      const user =await creatUser();
      if(user){
      localStorage.setItem('username', fullName);
      localStorage.setItem('email', email);
      setUsername(fullName);
      navigate('/');
      }
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1561501900-3701fa6a0864?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px'
      }}
    >
      <div
        className="p-5 rounded-4 shadow-lg"
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px'
        }}
      >
        <h2 className="text-center text-warning mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {setEmail(e.target.value)
                setWrongEmail(false);
                setEmailExists(false);
              }}
              required
              backgroundColor={wrongEmail? "red" :"white"}
            />
            {wrongEmail && (
              <div className="text-danger mt-2">
                Please enter a valid email address.
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {setPassword(e.target.value)
                setWrongPassword(false);
                setEmailExists(false);
              }}
              required
              backgroundColor={wrongPassword? "red" :"white"}
            />
            {wrongPassword && (
              <div className="text-danger mt-2">
                Password must contain at least one uppercase letter and one lowercase letter
              </div>
            )}
          </div>
          {emailExists && (
            <div className="text-danger mb-3">
              Email already exists. go to login page
            </div>
          )}

          <button type="submit" className="btn btn-warning w-100 fw-bold">Register</button>
        </form>
      </div>
    </div>
  );
};
export default Register;