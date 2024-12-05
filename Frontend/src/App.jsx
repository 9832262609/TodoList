import React from 'react'
import { BrowserRouter as Router, Routes,Route,Navigate } from 'react-router-dom';
import NotFound from './Components/NotFound';
import Login from './Components/Login';
import Signup  from './Components/Signup';
import Home from './Components/Home';
const token = localStorage.getItem('token')
const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home/> : <Navigate to={"/login"}/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App