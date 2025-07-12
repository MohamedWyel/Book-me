import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUsername, darkMode }) => {
  const [email,setEmail]= useState('');
  const [password ,setPassword]= useState('');
  const navigate = useNavigate();

  const fetchUser= async()=>{
    try{
      const response =await fetch("http://localhost:5000/api/auth/login" ,
        {
          method: "post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify( {
            email,
            password
          })
        }
      )
      const data =await response.json();
      if(response.ok){
        localStorage.setItem('username', data.userName);
        alert("login")
        setUsername(data.userName)
        return data;
      }else{
        alert("email or password incorrect")
        console.log(data.email)
        console.log(data.password)
        return null
      }

    }catch(err){
      console.log(err);
      return null;
    }
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    if (email.trim()&& password.trim()) {
      const user =await fetchUser();
      if(user){
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
          maxWidth: '450px'
        }}
      >
        <h2 className="text-center text-warning mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-warning w-100 fw-bold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;