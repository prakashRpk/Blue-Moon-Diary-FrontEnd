import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../nav/nav';
import './input.css';

function Input() {
    const [date, setDate] = useState(new Date());
    const [mood, setMood] = useState('');
    const [tag, setTag] = useState('');
    const [title, setTitle] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [location, setLocation] = useState('');
    const [pgcolor, setBgcolor] = useState('');
    const [userdata, setUserdata] = useState([]);

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

    function handleClick(e) {
        e.preventDefault();

        if (!title || !mood || !tag || !paragraph || !pgcolor) {
            alert("Please fill in all fields.");
            return;
        }

        const activeUser = userdata.find(user => user.userstatus === true);
        if (activeUser) {
            store(activeUser.name);
        } else {
            alert("No active user found!");
        }
    }

    function store(currentUsername) {
        const input = {
            date: date.toDateString(),
            time: date.toLocaleTimeString(),
            title,
            paragraph,
            pgcolor,
            mood,
            tag,
            location,
            username: currentUsername
        };

        axios.post('https://blue-moon-diary-backend.onrender.com/CreateNote', input)
            .then(() => {
                alert("Saved successfully");
                setTitle('');
                setParagraph('');
                setDate(new Date());
                setBgcolor('');
                setMood('');
                setTag('');
                setLocation('');
            })
            .catch(error => {
                console.error("Error saving note:", error);
                alert("Failed to save note.");
            });
    }

    return (
        <>
            <Nav />
            <div id="input">
                <h1>Hello</h1>
                <form>
                    <label>Title:</label><br />
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />

                    <label>Mood/Emotion</label>
                    <div className='mood'>
                        {["Fun", "Happy", "Smile", "Meh", "Sad", "Cry", "Heart-break"].map((m, index) => (
                            <button
                                key={index}
                                onClick={(e) => { e.preventDefault(); setMood(m); }}
                                id='mood'
                                style={{ backgroundColor: mood === m ? 'blue' : 'black' }}
                            >
                                {m} <i className={`fa-solid ${getMoodIcon(m)}`}></i>
                            </button>
                        ))}
                    </div>

                    <label>Tags/Categories</label>
                    <div className='tags'>
                        {["Travel", "Work", "Personal"].map((t, index) => (
                            <button
                                key={index}
                                id='tags'
                                onClick={(e) => { e.preventDefault(); setTag(t); }}
                                style={{ backgroundColor: tag === t ? "blue" : "black" }}
                            >
                                {t} <i className={getTagIcon(t)}></i>
                            </button>
                        ))}
                    </div>

                    <label>Background Colour</label>
                    <div className='pgcolor'>
                        {["skyblue", "lightgreen"].map((color, index) => (
                            <button
                                id='pgcolor'
                                key={index}
                                style={{ backgroundColor: color, border: pgcolor === color ? "3px solid black" : "none" }}
                                onClick={(e) => { e.preventDefault(); setBgcolor(color); }}
                            >
                                {color}
                            </button>
                        ))}
                    </div>

                    <label>Weather/Location</label><br />
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /><br />

                    <label>Paragraph:</label><br />
                    <textarea value={paragraph} onChange={(e) => setParagraph(e.target.value)}></textarea><br />

                    <button type='submit' id='btn' onClick={handleClick}>Save</button>

                    <Link to="/diary">
                        <button type="button" id='btn' >
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </Link>
                </form>
            </div>
        </>
    );
}

// Helper functions
function getMoodIcon(mood) {
    switch (mood) {
        case "Fun": return "fa-face-grin-squint-tears";
        case "Happy": return "fa-face-laugh-beam";
        case "Smile": return "fa-face-smile-beam";
        case "Meh": return "fa-face-meh";
        case "Sad": return "fa-face-frown";
        case "Cry": return "fa-face-sad-cry";
        case "Heart-break": return "fa-heart-crack";
        default: return "";
    }
}

function getTagIcon(tag) {
    switch (tag) {
        case "Travel": return "fa-solid fa-compass";
        case "Work": return "fa-solid fa-briefcase";
        case "Personal": return "fa-solid fa-house-chimney-window";
        default: return "";
    }
}

export default Input;
