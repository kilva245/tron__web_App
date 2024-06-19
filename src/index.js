import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SIgnUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Latary from './pages/Latary';
import JoinLottary from './components/JoinLottary';
import StatusPage from './pages/StatusPage';
import ReferralPage from './pages/ReferralPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/SignUp' element={<SIgnUp />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Profile' element={<Profile />} />
      <Route path='/wallet' element={<Wallet />} />
      <Route path='/wallet/deposit' element={<Deposit />} />
      <Route path='/wallet/withdraw' element={<Withdraw />} />
      <Route path='/latary' element={<Latary />} />
      <Route path='/latary/join' element={<JoinLottary />} />
      <Route path='/status' element={<StatusPage />} />
      <Route path='/ref' element={<ReferralPage />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
