import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../nav/nav';
import './profile.css';
import profileImg from './profile-images/profile-default.png';

function Profile() {
    const [userdata, setUserdata] = useState([]);
    const [currentuser, setCurrentuser] = useState(null);
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState('');

async function handleFeedbackSubmit(e) {
    e.preventDefault();
    try {
        await axios.post('https://blue-moon-diary-backend.onrender.com/CreateFeedback', {
            userId: currentuser._id,
            message: feedback
        });
        alert("Feedback submitted!");
        setFeedback('');
    } catch (err) {
        console.error("Feedback submission failed:", err);
    }
}


    // Fetch all users
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get('https://blue-moon-diary-backend.onrender.com/Userdata');
                setUserdata(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchUserData();
    }, []);

    // Find current user with userstatus = true
    useEffect(() => {
        const activeUser = userdata.find(user => user.userstatus === true);
        if (activeUser) {
            setCurrentuser(activeUser);
            console.log("Logged-in User:", activeUser.name);
        }
    }, [userdata]);

    // Handle logout
    async function handleLogout() {
        if (!currentuser) return;
        try {
            await axios.put(`https://blue-moon-diary-backend.onrender.com/logindate/${currentuser._id}`, {
                userstatus: false
            });
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    async function handleUpdateProfile(e) {
    e.preventDefault();
    try {
        await axios.put(`https://blue-moon-diary-backend.onrender.com/updateUser/${currentuser._id}`, {
            name: currentuser.name,
            gmail: currentuser.gmail
        });
        alert('Profile updated!');
    } catch (err) {
        console.error('Update failed:', err);
    }
}


    return (
        <>
            <Nav />
            <div id='profile-page'>
                <div className='profile'>
                    <h1>Profile</h1>
                    <img src={profileImg} alt="Profile" />
                    <h4>Name: {currentuser?.name || 'Loading...'}</h4>
                    <h4>Email: {currentuser?.gmail || 'Loading...'}</h4>
                    <h4>Account Created: {currentuser?.createDate || 'Loading...'}</h4>
                    <button onClick={handleLogout}>
                        Logout <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>

<div className='history'>
  <h2>History</h2>
  {currentuser?.history?.length > 0 ? (
    <ul>
      {currentuser.history.map((entry, index) => (
        <li key={index}>
          <strong>{entry.date}</strong> - {entry.activity}
        </li>
      ))}
    </ul>
  ) : (
    <p>No history available.</p>
  )}</div>


{
<div className='settings'>
  <h2>Settings</h2>
  <form onSubmit={handleUpdateProfile}>
    <label>
      Name: <br />
      <input
        type="text"
        value={currentuser?.name || ''}
        onChange={(e) => setCurrentuser({ ...currentuser, name: e.target.value })}
      />
    </label>
    <label>
      Email: <br />
      <input
        type="email"
        value={currentuser?.gmail || ''}
        onChange={(e) => setCurrentuser({ ...currentuser, gmail: e.target.value })}
      />
    </label>
    <button type="submit">Update Profile</button>
  </form>
</div>
}

{
<div className='feedback'>
  <h2>Feedback</h2>
  <form onSubmit={handleFeedbackSubmit}>
    <textarea
      placeholder="Write your feedback here..."
      value={feedback}
      onChange={(e) => setFeedback(e.target.value)}
    />
    <button type="submit">Submit Feedback</button>
  </form>
</div>
}
                </div>
        </>
    );
}

export default Profile;
