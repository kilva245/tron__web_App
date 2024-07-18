import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Notification from '../components/Notification';
import Header from '../components/Header';

const ParentTable = () => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userDataJson = JSON.parse(storedUserData);
      setUserData(userDataJson);
      setToken(userDataJson.token);
    }
  }, []);

  const handleTokenChanged = () => {
    setIsOpen(true);
    setNotificationMessage('Token axpired, Login again');
    setShowNotification(true);
    setTimeout(() => {
      localStorage.removeItem('userData');
      navigate('/login', { replace: true });
    }, 3000); // Wait 3 seconds before redirecting to login page
  };

  const authHeader = {
    'Authorization': `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get('https://luckyx.cloud/api/v1/user/box', {
          headers: authHeader,
        });
        const children = response.data.children;
        setParents(children);
      } catch (error) {
        // console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchChildren();
  }, [token]);

  const [selected, setSelected] = useState(null);

  const handleClick = (item) => {
    setSelected(item);
  };



  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div style={{ backgroundColor: '#f070e8' }} className='container'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className='reftb' style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Name</th>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Image</th>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Side</th>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Reward</th>
                </tr>
              </thead>
              <tbody>
                {parents && parents.length > 0 ? (
                  parents.map((parent, index) => (
                    <tr key={index}>
                      
                      <td style={{ padding: '10px', color: '#000' }}>
                        <strong>{index + 1} - </strong> {parent.name}
                      </td>
                      <td>
                        <img src={parent.avatar} alt={parent.name} style={{ width: '20px', height: '20px', borderRadius: '50%', marginLeft: '10px' }} />
                      </td>
                      <td style={{ padding: '10px', color: '#000' }}>{parent.parent_type === 'L' ? 'Left' : 'Right'}</td>
                      <td style={{ padding: '10px',color: 'yellow'}}>{parent.reward} TRX</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '10px' }}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <nav className="mobile-navbar">
          <ul>
            <li>
              <Link to={"/"} className={selected === 'home' ? 'selected' : ''} onClick={() => handleClick('home')}>
                <img alt="icon" src="../assets/icon/homepn.png" width={40} className="mobileMenu_icons" />
                {/* <HouseIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} /> */}
              </Link>
            </li>

            <li>
              <Link to="/latary" className={selected === 'lotarry' ? 'selected' : ''} onClick={() => handleClick('lottery')}>
                <img alt="icon" src="../assets/icon/lottery.png" width={50} className="mobileMenu_icons" />
                {/* <HowToVoteIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} /> */}
              </Link>
            </li>
            <li>
              <Link to="/Profile" className={selected === 'Profile' ? 'selected' : ''} onClick={() => handleClick('Profile')}>
                <img alt="icon" src="../assets/icon/data-management.png" width={50} className="mobileMenu_icons" />
                {/* <AccountCircleIcon sx={{ fontSize: 30 }} /> */}
              </Link>
            </li>
            <li>
              <Link to="/wallet" className={selected === 'Profile' ? 'selected' : ''} onClick={() => handleClick('Wallet')}>
                <img alt="icon" src="../assets/icon/wallet.png" width={50} className="mobileMenu_icons" />
                {/* <AccountBalanceWalletIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} /> */}
              </Link>
            </li>

          </ul>

        </nav>
      </main>
    </>

  );
};

export default ParentTable;