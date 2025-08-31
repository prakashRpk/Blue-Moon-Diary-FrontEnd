import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './nav';
import { BaseURL } from '../Port';
import '../Styles/Cuztomise.css';

function Input() {
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState(new Date());
  const [moodList, setMoodList] = useState([]);
  const [bgcolorList, setBgcolorList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [mood, setMood] = useState('');
  const [tag, setTag] = useState('');
  const [addMood,setAddMood] = useState('')
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [location, setLocation] = useState('');
  const [pgcolor, setBgcolor] = useState('');
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  // Fetch current user
  useEffect(() => {
    let isMounted = true;

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

        if (isMounted) {
          setCurrentUser(response.data.user);
          setUserId(response.data.user._id);
          setMoodList(response.data.user.moodList || []);
          setTagList(response.data.user.tagList || []);
          setBgcolorList(response.data.user.bgColorList || []);
          setLoading(false);
        }
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

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  function createMood(){

  }

  return (
    <>
      <Nav />
      <div id="input">

          <label>Mood/Emotion</label>
          <div className="mood">
            <button
                type="button"
                onClick={createMood}
                id="mood"
                style={{
                  backgroundColor: 'blue',
                  color: 'white'
                }}
              >Create + </button>
            {moodList.map((m, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setMood(m)}
                id="mood"
                style={{
                  backgroundColor: mood === m ? 'blue' : 'black',
                  color: 'white'
                }}
              >
                {m}
              </button>
            ))}
          </div>

          <label>Tags/Categories</label>
          <div className="tags">
            {tagList.map((t, index) => (
              <button
                type="button"
                key={index}
                id="tags"
                onClick={() => setTag(t)}
                style={{
                  backgroundColor: tag === t ? 'blue' : 'black',
                  color: 'white'
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <label>Background Colour</label>
          <div className="pgcolor">
            {bgcolorList.map((color, index) => (
              <button
                type="button"
                id="pgcolor"
                key={index}
                style={{
                  backgroundColor: color,
                  border: pgcolor === color ? "3px solid black" : "none",
                  color: 'white'
                }}
                onClick={() => setBgcolor(color)}
              >
                {color}
              </button>
            ))}
          </div>

      </div>
    </>
  );
}

export default Input;
