import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Screens/nav';
import { BaseURL } from '../Port';
import '../Styles/profile.css';
import profileImg from '../Images/profile-images/profile-default.png';

function Profile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId,setUserId] = useState('')
    const [userdata, setUserdata] = useState([]);
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState('');


  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Unauthorized. Please login first.");
          navigate("/");
          return;
        }

        const response = await axios.get(`${BaseURL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCurrentUser(response.data.user);
        setUserId(response.data.user._id); 
        setLoading(false);
      } catch (error) {
        console.error("Fetch user failed:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please login again.");
        } else {
          alert("Something went wrong. Please try again later.");
        }
        localStorage.removeItem("token");
        navigate("/");
      }
    }

    fetchCurrentUser();
  }, [navigate]);

async function handleFeedbackSubmit(e) {
    e.preventDefault();
    try {
        await axios.post(`${BaseURL}/api/CreateFeedback`, {
            userId: currentUser._id,
            message: feedback
        });
        alert("Feedback submitted!");
        setFeedback('');
    } catch (err) {
        console.error("Feedback submission failed:", err);
    }
}


    async function handleUpdateProfile(e) {
    e.preventDefault();
    try {
        await axios.put(`${BaseURL}/updateUser/${currentUser._id}`, {
            name: currentUser.name,
            gmail: currentUser.gmail
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
                    <h4>Name: {currentUser?.name || 'Loading...'}</h4>
                    <h4>Email: {currentUser?.gmail || 'Loading...'}</h4>
                    <h4>Account Created: {currentUser?.date || 'Loading...'}</h4>
                </div>

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
