import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Diary from './diary/diary'
import Input from './input/input';
import Home from './home/home';
import Profile from './profile/profile';
import Analytics from './analytics/analytics';
import './App.css'

function App(){    
    return(<>
<div id='screen'></div>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/diary" element={<Diary />}></Route>
        <Route path="/input" element={<Input />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/analytics" element={<Analytics/>}></Route>
      </Routes>
</BrowserRouter>

    </>)
}
export default App;