import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import axios from 'axios';

function Home() {
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [pass, setPass] = useState('');
  const createdate = new Date();
  const [userdata, setUserdata] = useState([]);
  const [routebtn, setRoutebtn] = useState();
  const [currentView, setCurrentView] = useState('default'); // 'default', 'login', 'register'

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    async function axiosProd() {
      try {
        const response = await axios.get('https://blue-moon-diary-backend.onrender.com/Userdata');
        setUserdata(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    axiosProd();
  }, []);

  useEffect(() => {
    async function handleUpdate() {
      for (let i = 0; i < userdata.length; i++) {
        if (userdata[i].name === name && userdata[i].pass === pass) {
          axios.put(`https://blue-moon-diary-backend.onrender.com/logindate/${userdata[i]._id}`, {
            userstatus: true
          });
          console.log(userdata[i]);
          setRoutebtn(
            <button className='route' type='submit' onClick={() => navigate('/diary', { state: { user: userdata[i] } })}>
              Start
            </button>
          );
        }
      }
    }
    handleUpdate();
  }, [name, pass, userdata]);

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      name,
      gmail,
      pass,
      createDate: createdate.toDateString()
    }

    
    axios.post('https://blue-moon-diary-backend.onrender.com/createUser', user)
      .then(() => {
        alert('Registered successfully!');
        setCurrentView('login');
      })
      .catch((err) => {
        console.error(err);
        alert('Registration failed.');
      });
  };

  return (
    <>
      <div id='home'>
        <i className="fa-solid fa-cloud-moon img"></i>
        <h1 className='title1'>Blue-Moon</h1>
      </div>

      {currentView === 'default' && (
        <div id='login'>
          <i className="fa-solid fa-cloud-moon img"></i>
          <button className='login-btn' onClick={() => setCurrentView('login')}>Login</button>
          <button className='register-btn' onClick={() => setCurrentView('register')}>Register</button>
        </div>
      )}

      {currentView === 'login' && (
        <div id='login'>
          <h1>Login</h1>
          <form>
            <label>Name:</label><br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />

            <label>Password:</label><br />
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} /><br />

            {routebtn}

            <button type='button' onClick={() => setCurrentView('default')} className='exit-logo'>
              Exit <i className="fa-solid fa-door-open"></i>
            </button>

            <h5 className='log-link' onClick={() => setCurrentView('register')}>I don't have Account</h5>
          </form>
        </div>
      )}

      {currentView === 'register' && (
        <div id='login'>
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <label>Name:</label><br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />

            <label>Gmail ID:</label><br />
            <input type="text" value={gmail} onChange={(e) => setGmail(e.target.value)} /><br />

            <label>Password:</label><br />
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} /><br />

            <button type='submit' className='route'>Submit</button>

            <button type='button' onClick={() => setCurrentView('default')} className='exit-logo'>
              Exit <i className="fa-solid fa-door-open"></i>
            </button>

            <h5 className='reg-link' onClick={() => setCurrentView('login')}>I'm already have an Account</h5>
          </form>
        </div>
      )}
    </>
  );
}

export default Home;
