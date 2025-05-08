import { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import Nav from '../nav/nav';
import './analytics.css';

function Analytics() {
    const [userdata, setUserdata] = useState([]);
    const [data, setData] = useState([]);
    const [currentname, setCurrentname] = useState('');
    const [moods, setMoods] = useState({
        Fun: 0,
        happy: 0,
        Smile: 0,
        Meh: 0,
        Sad: 0,
        Cry: 0,
        'Heart-break': 0,
    });

    // Fetch user data
    useEffect(() => {
        axios.get('https://blue-moon-diary-backend.onrender.com/Userdata')
            .then(res => setUserdata(res.data))
            .catch(err => console.error("Error fetching userdata:", err));
    }, []);

    // Fetch notes
    useEffect(() => {
        axios.get('https://blue-moon-diary-backend.onrender.com/note')
            .then(res => setData(res.data))
            .catch(err => console.error("Error fetching notes:", err));
    }, []);

    // Get current active user
    useEffect(() => {
        const activeUser = userdata.find(user => user.userstatus === true);
        if (activeUser) {
            setCurrentname(activeUser.name);
        }
    }, [userdata]);

    // Count moods
    useEffect(() => {
        if (!currentname) return;

        const moodCounts = {
            Fun: 0,
            Happy: 0,
            Smile: 0,
            Meh: 0,
            Sad: 0,
            Cry: 0,
            'Heart-break': 0,
        };

        data.forEach(note => {
            if (note.username === currentname && moodCounts.hasOwnProperty(note.mood)) {
                moodCounts[note.mood]++;
            }
        });

        setMoods(moodCounts);
    }, [currentname, data]);

    return (
        <>
            <Nav />
            <div id='analytics'>
                <div id='mood-analytics'>
                    <h1>Mood:- </h1>
                    {Object.entries(moods).map(([mood, count]) =>
                        <>
                        <h5 key={mood}>{mood}: {count}</h5>
                        <ProgressBar animated now={count} variant="info" /><br />
                    </>)}
                </div>
            </div>
        </>
    );
}
export default Analytics;
