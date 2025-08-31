import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './nav';
import { BaseURL } from '../Port';
import '../Styles/input.css';

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

  // Save note
  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !mood || !tag || !paragraph || !pgcolor) {
      alert("Please fill in all fields.");
      return;
    }

    const input = {
      date: date.toDateString(),
      time: date.toLocaleTimeString(),
      title,
      content:paragraph,
      pgcolor,
      mood,
      tag,
      location,
      currentUserId: userId,
    };

    try {
      setSaving(true);
      await axios.post(`${BaseURL}/api/CreateNote`, input);
      alert("Saved successfully");

      // reset form
      setTitle('');
      setParagraph('');
      setDate(new Date());
      setBgcolor('');
      setMood('');
      setTag('');
      setLocation('');
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Nav />
      <div id="input">
        <h1>Hello, {currentUser.name}</h1>
        <form onSubmit={handleSubmit}>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /><br />

          <label>Mood/Emotion</label>
          <div className="mood">
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

          <label>Weather/Location</label><br />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          /><br />

          <label>Paragraph:</label><br />
          <textarea
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          ></textarea><br />

          <button type="submit" id="btn" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>

          <Link to="/diary">
            <button type="button" id="btn">
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Input;
