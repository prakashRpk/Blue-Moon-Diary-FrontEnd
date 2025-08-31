import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BaseURL } from '../Port';
import axios from 'axios';
import '../Styles/calendar.css';

function CalendarNotes() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  // Fetch current user
  useEffect(() => {
    const user = localStorage.getItem("user"); // adjust key as per your auth
    if (user) {
      setCurrentUser(JSON.parse(user).username); // or .email / .id depending on your model
    }
  }, []);

  // Fetch notes
  useEffect(() => {
    axios.get(`${BaseURL}/api/GetNote`)
      .then(res => setNotes(res.data))
      .catch(err => console.error("Error fetching notes:", err));
  }, []);

  // Filter notes for selected date
  const selectedNotes = notes.filter(
    note =>
      note.username === currentUser &&
      new Date(note.date).toDateString() === selectedDate.toDateString()
  );

  // Dates with notes for the current user
  const datesWithNotes = notes
    .filter(note => note.username === currentUser)
    .map(note => new Date(note.date).toDateString());

  // Tile content to highlight dates
  const tileContent = ({ date, view }) => {
    if (view === "month" && datesWithNotes.includes(date.toDateString())) {
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
          selectedNotes.map(note => (
            <div key={note._id} className="note-card">
              <p><strong>Title:</strong> {note.title}</p>
              <p><strong>Paragraph:</strong> {note.content}</p>
              <p><strong>Tags:</strong> {note.tag}</p>
              <p>{note.text}</p>
              <p>
                <strong>Mood:</strong>{" "}
                <span className={`mood-badge mood-${note.mood.replace(/\s+/g, "-")}`}>
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
