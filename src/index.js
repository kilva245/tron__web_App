import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
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
import NotFound from './pages/NotFound';
import Setting from './pages/setting';
import Rewards from './pages/Rewards';
import TicketsInfo from './pages/TicketsInfo';
import ParentTable from './pages/ParentTable';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/allRef" element={<ParentTable />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/sign-up" element={<SIgnUp />} />
      <Route path="/sign-up/:referralCode" element={<SIgnUp />} />
      <Route path='/Login' element={<Login />} />
      
      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path='/wallet/deposit' element={
        <ProtectedRoute>
          <Deposit />
        </ProtectedRoute>
      } />
      <Route path='/wallet' element={
        <ProtectedRoute>
          <Wallet />
        </ProtectedRoute>
      } />
      <Route path='/wallet/withdraw' element={
        <ProtectedRoute>
          <Withdraw />
        </ProtectedRoute>
      } />
      <Route path='/latary' element={
        <ProtectedRoute>
          <Latary />
        </ProtectedRoute>
      } />
      <Route path='/latary/join' element={
        <ProtectedRoute>
          <JoinLottary />
        </ProtectedRoute>
      } />
      <Route path='/ref' element={
        <ProtectedRoute>
          <ReferralPage />
        </ProtectedRoute>
      } />
      <Route path='/referral-code' element={
        <ProtectedRoute>
          <ReferralCode />
        </ProtectedRoute>
      } />
      <Route path='/setting' element={
        <ProtectedRoute>
          <Setting />
        </ProtectedRoute>
      } />
      <Route path='/profile/rewards' element={
        <ProtectedRoute>
          <Rewards />
        </ProtectedRoute>
      } />
      <Route path='/profile/tickets' element={
          <TicketsInfo />
      } />
      
      
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
