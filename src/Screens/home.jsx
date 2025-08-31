import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../Port';
import '../Styles/home.css';
  import axios from 'axios';

function Home() {

  const navigate = useNavigate(); // Hook for navigation

  return (
    <>
      <div id='home'>
        <nav>
          <i className="fa-solid fa-cloud-moon img"></i>
          <h1 className='title1'>Blue-Moon</h1>
        </nav>
        <section>
                <p>Blue Moon Diary is a beautifully crafted online diary application designed for anyone who wants to capture thoughts, ideas, 
          and memories in a secure and elegant way. Whether you're journaling your daily experiences, planning your week, or expressing your creativity,
           Blue Moon Diary offers a seamless and distraction-free environment that keeps your stories safe and accessible anytime, anywhere.</p>
        </section>
      </div>

        <div id='login'>
          <i className="fa-solid fa-cloud-moon img"></i>
          <button className='login-btn' onClick={() => navigate('/Login')}>Login</button>
          <button className='register-btn' onClick={() => navigate('/Register')}>Register</button>
        </div>
    </>
  );
}

export default Home;
