import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SIgnUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Latary from './pages/Latary';
import JoinLottary from './components/JoinLottary';
import ReferralPage from './pages/ReferralPage';
import ReferralCode from './pages/ReferralCode';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('userData');

    if (storedToken && storedUserData) {
      setToken(storedToken);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogin = (token, userData) => {
    setToken(token);
    setUserData(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  };

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/SignUp' element={<SIgnUp />} />
        <Route path='/Login' element={<Login handleLogin={handleLogin} />} />
        {token && userData? (
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path='/wallet/deposit' element={<Deposit />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/wallet/withdraw' element={<Withdraw />} />
            <Route path='/latary' element={<Latary />} />
            <Route path='/latary/join' element={<JoinLottary />} />
            <Route path='/ref' element={<ReferralPage />} />
            <Route path='/referral-code' element={<ReferralCode />} />
          </Route>
        ) : (
          <Navigate to="/Login" replace />
        )}
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

// Add a console log to check if the components are being rendered
console.log('Components rendered!');