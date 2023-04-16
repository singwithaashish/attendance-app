import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Attendance from './components/Attendance';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const onCapture = (imageSrc) => {
    // Handle the captured image here
    console.log('Image captured:', imageSrc);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/attendance" element={<Attendance onCapture={onCapture} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
