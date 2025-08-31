import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './nav';
import { BaseURL } from '../Port';
import '../Styles/diary.css';

function Diary() {
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    paragraph: "",
    pgcolor: ""
  });
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [viewtap, setViewtap] = useState(null);
  const [box, setBox] = useState([]);

  // ✅ Fetch current user
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
        setUserId(response.data.user._id);
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

  // ✅ Fetch all notes
  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get(`${BaseURL}/api/GetNote`);
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchNotes();
  }, []);

  // ✅ Filter notes for logged-in user
  useEffect(() => {
    if (userId && notes.length > 0) {
      const userNotes = notes.filter((item) => item.currentUserId === userId);
      setBox(userNotes);
    }
  }, [userId, notes]);

  // ✅ Delete note
  async function handleDelete(id) {
    try {
      await axios.delete(`${BaseURL}/api/DeleteNote/${id}`);
      setNotes(notes.filter((item) => item._id !== id));
      setViewtap(null);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }

  // ✅ Edit note
  function handleEdit(item) {
    setEditId(item._id);
    setFormData({
      title: item.title,
      date: item.date,
      time: item.time,
      paragraph: item.paragraph,
      pgcolor: item.pgcolor,
    });
    setViewtap(null);
  }

  // ✅ Update note
  async function handleUpdate() {
    try {
      await axios.put(`${BaseURL}/api/UpdateNote/${editId}`, formData);
      setNotes(notes.map((item) => (item._id === editId ? { ...item, ...formData } : item)));
      setEditId(null);
      alert("Updated successfully!");
    } catch (error) {
      console.error("Error updating:", error);
    }
  }

  // ✅ View note
  const handleviewtap = (item) => {
    setViewtap(
      <div id="view" style={{ backgroundColor: item.pgcolor }}>
        <h1>{item.title}</h1>
        <h4>Date: {item.date}</h4>
        <h4>Time: {item.time}</h4>
        <p>{item.content}</p>
        <h4>Mood: {item.mood}</h4>
        <h4>Tag: {item.tag}</h4>
        <button onClick={() => setViewtap(null)}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
        <button onClick={() => handleDelete(item._id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
        <button onClick={() => handleEdit(item)}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
    );
  };

  return (
    <>
      <Nav />
      <div id="diary">
        {box.map((item) => (
          <div
            key={item._id}
            id="box"
            style={{ backgroundColor: item.pgcolor }}
            onClick={() => handleviewtap(item)}
          >
            <h3>{item.title}</h3>
            <h5>{item.date}</h5>
            <h5>{item.time}</h5>
            <h5>Mood: {item.mood}</h5>
            <h5>Tag: {item.tag}</h5>
          </div>
        ))}
      </div>

      {viewtap}

      {editId && (
        <div id="edit" style={{ backgroundColor: formData.pgcolor }}>
          <h2>Edit Data</h2>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            type="text"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
          <input
            type="text"
            value={formData.paragraph}
            onChange={(e) => setFormData({ ...formData, paragraph: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </>
  );
}

export default Diary;
