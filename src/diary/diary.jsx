import { useState,useEffect, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from '../nav/nav'
import UserContext from "../Context/context";
import './diary.css'
function Diary(){ 
  const location = useLocation();
    let users = useContext(UserContext);
    let [editId, setEditId] = useState(null);
    let [formData, setFormData] = useState({ title: "", date: "", time: "", paragraph: "", pgcolor:"" });
    let [data,setData]=useState([])  
    let [viewtap,setViewtap]=useState()
    let [username,setUsername]=useState()
    let [box,setBox]=useState([])
    const [userdata, setUserdata] = useState([]);
    const name = location.state;
    console.log(users)
    useEffect(() => {
        async function axiosProd() {
            try {
                const response = await axios.get('https://blue-moon-diary-backend.onrender.com/note');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        axiosProd();
    }, []); 

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

  useEffect(()=>{
    userdata.map((item)=>{
      if(item.userstatus === true){ setUsername(item.name)}
    })
  },[userdata])

  useEffect(()=>{
    data.map((item)=>{
      if(item.username === username){box.push(item)}
    })
  },[username])

    async function handleDelete(id) {
        console.log(id)
        try {
          await axios.delete(`https://blue-moon-diary-backend.onrender.com/delete/${id}`);
          setData(data.filter((item) => item._id !== id));
          setViewtap(<div></div>)
        } catch (error) {
          console.error("Error deleting:", error);
        }
      }

      function handleEdit(item) {
        setEditId(item._id);
        setFormData({title: item.title, date: item.date, time: item.time, paragraph: item.paragraph, pgcolor: item.pgcolor });
        setViewtap()
      }
    
      async function handleUpdate() {
        try {
          await axios.put(`https://blue-moon-diary-backend.onrender.com/update/${editId}`, formData);
          setData(data.map((item) => (item._id === editId ? { ...item, ...formData } : item)));
          setEditId(null);
          alert("Updated successfully!");
        } catch (error) {
          console.error("Error updating:", error);
        }
      }

const handleviewtap =(index,id,item)=>{
console.log(id)
setViewtap(<div id='view' style={{backgroundColor:box[index].pgcolor}} >
    <h1>{box[index].title}</h1>
    <h4>Date:{box[index].date}</h4>
    <h4>Time:{box[index].time}</h4>
    <p>{box[index].paragraph}</p>
    <h4>Mood: {box[index].mood}</h4>
    <h4>Tag: {box[index].tag}</h4>
    <button onClick={()=>setViewtap(<div></div>)}><i class="fa-solid fa-right-from-bracket"></i></button>
    <button onClick={()=>handleDelete(id)}><i class="fa-solid fa-trash"></i></button>
    <button onClick={() => handleEdit(item)}><i class="fa-solid fa-pen-to-square"></i></button>
</div>
)


}
    return(<>
    <Nav></Nav>
    <div id="diary">
    {box.map((item,index)=>
    <div id='box' style={{backgroundColor:item.pgcolor}} onClick={()=>handleviewtap(index,item._id,item)}>
    <h3>{item.title}</h3>
    <h5>{item.date}</h5>
    <h5>{item.time}</h5>
    <h5>Mood: {item.mood}</h5>
    <h5>Tag: {item.tag}</h5>
</div>)}
    </div>
            {viewtap}
            {editId && (
        <div id='edit' style={{backgroundColor:formData.pgcolor}} >
          <h2>Edit Data</h2>
          <input type="text"  value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <input type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <input type="text" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
          <input type="text" value={formData.paragraph} onChange={(e) => setFormData({ ...formData, paragraph: e.target.value })} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </>)
}
export default Diary;