import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './calendar.css'; // Create your own styles

function CalendarNotes() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [notes, setNotes] = useState([]);
    const [currentUser, setCurrentUser] = useState('');

    // Fetch user and notes
    useEffect(() => {
        axios.get('https://blue-moon-diary-backend.onrender.com/Userdata')
            .then(res => {
                const activeUser = res.data.find(user => user.userstatus === true);
                if (activeUser) setCurrentUser(activeUser.name);
            });

        axios.get('https://blue-moon-diary-backend.onrender.com/note')
            .then(res => setNotes(res.data));
    }, []);

    // Filter notes for selected date
    const selectedNotes = notes.filter(note =>
        note.username === currentUser &&
        new Date(note.date).toDateString() === selectedDate.toDateString()
    );

    // Dates with notes
    const datesWithNotes = notes
        .filter(note => note.username === currentUser)
        .map(note => new Date(note.date).toDateString());

    // Tile content to highlight dates
    const tileContent = ({ date, view }) => {
        if (view === 'month' && datesWithNotes.includes(date.toDateString())) {
            return <div className="dot"></div>; // small dot to indicate a note
        }
        return null;
    };

    return (
        <div className="calendar-notes-container">
            <h2>My Calendar Notes</h2>
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={tileContent}
            />

            <div className="notes-display">
                <h3>Notes for {selectedDate.toDateString()}</h3>
                {selectedNotes.length > 0 ? (
                    selectedNotes.map((note, index) => (
                        <div key={index} className="note-card">
                            <p><strong>Title:</strong> {note.title}</p>
                            <p><strong>paragraph:</strong> {note.paragraph}</p>
                            <p><strong>Tags:</strong> {note.tag}</p>
                            <p>{note.text}</p>
                            <p>
  <strong>Mood:</strong>{' '}
  <span className={`mood-badge mood-${note.mood.replace(' ', '-')}`}>
    {note.mood}
  </span>
</p>

                        </div>
                    ))
                ) : (
                    <p>No notes for this day.</p>
                )}
            </div>
        </div>
    );
}

export default CalendarNotes;
