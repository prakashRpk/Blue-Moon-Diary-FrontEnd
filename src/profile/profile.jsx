import Nav from '../nav/nav'
import './profile.css'
import axios from 'axios';
import profileImg from './profile-images/profile-default.png'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Profile(){
    let [userdata,setUserdata]=useState([])
    let [currentuser,setCurrentuser]=useState({})

    useEffect(() => {
        async function axiosProd() {
            try {
                const response = await axios.get('https://blue-moon-diary-backend.onrender.com/Userdata');
                setUserdata(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        axiosProd();
    }, []);

    useEffect(()=>{
        userdata.map((item)=>{
            if(item.userstatus===true){
                setCurrentuser(item)
                console.log(item.name)
            }
        })
    },[userdata])

    async function handleUpdate() {
                axios.put(`https://blue-moon-diary-backend.onrender.com/logindate/${currentuser._id}`,{
                    userstatus:false
                    
                });
            }

    return(<>
    <Nav></Nav>
    <div id='profile-page'>
        <div className='profile'>
        <h1>Profile</h1>
        <img src={profileImg} alt="" />
        <h4>Name : {currentuser.name}</h4>
        <h4>Gmail-id : {currentuser.gmail}</h4>
        <h4>Account Creating Date : {currentuser.createDate}</h4>
        <button onClick={handleUpdate}><Link to={"/"}>logout  <i class="fa-solid fa-right-from-bracket"></i></Link></button>
        
        </div>
        <div className='history'>

        </div>
        <div className='settings'>

        </div>
        <div className='feedback'>

        </div>
    </div>
    </>)
}
export default Profile;