import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SIgnUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/SignUp' element={<SIgnUp />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Profile' element={<Profile />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
