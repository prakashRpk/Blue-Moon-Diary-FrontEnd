import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Screens/Login'
import Register from './Screens/Register'
import Diary from './Screens/diary'
import Input from './Screens/input';
import Home from './Screens/home';
import Profile from './Screens/profile';
import Analytics from './Screens/analytics';
// import Cuztomise from './Screens/cuztomise'
import './App.css'

function App(){    
    return(<>
<div id='screen'></div>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/Diary" element={<Diary />}></Route>
        <Route path="/Input" element={<Input />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Analytics" element={<Analytics/>}></Route>
        {/* <Route path="/Cuztomise" element={<Cuztomise/>}></Route> */}
      </Routes>
</BrowserRouter>

    </>)
}
export default App;