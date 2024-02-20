import React from 'react';
import './App.css';
import { Route, Routes, Navigate, useNavigate, BrowserRouter as Router, BrowserRouter } from "react-router-dom";
import LoginSignup from './pages/LoginSignup/LoginSignUp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginSignup />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
