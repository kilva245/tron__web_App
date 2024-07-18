import React, { useState, useEffect } from 'react';
import { Tree } from 'react-d3-tree';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Header from '../components/Header';
import axios from 'axios';
import Notification from '../components/Notification';

const ReferralPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [token, setToken] = useState(null); // Initialize token state
  const [expiresAt, setExpiresAt] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userDataJson = JSON.parse(storedUserData);
      setUserData(userDataJson);
      setToken(userDataJson.token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.get('https://luckyx.cloud/api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.data.code === 1) {
            const userData = response.data.user;
            localStorage.setItem('userData', JSON.stringify(userData));
            setUserData(userData);
            setToken(userData.token);
          } else {
            // Token has changed, display modal and redirect to login page
            handleTokenChanged();
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [token]);
  const handleTokenChanged = () => {
    setIsOpen(true);
    setNotificationMessage('Token axpired, Login again');
    setShowNotification(true);
    setTimeout(() => {
      localStorage.removeItem('userData');
      navigate('/login', { replace: true });
    }, 3000); // Wait 3 seconds before redirecting to login page
  };



  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData.token;
    const authHeader = {
      'Authorization': `Bearer ${token}`,
    };

    const fetchChildren = async (userId) => {
      try {
        const response = await axios.get(`https://luckyx.cloud/api/v1/user/subtree`, {
          headers: authHeader,
          params: { user_id: userId },
        });
        const { user, sub_left, sub_right } = response.data;
        const children = [];


        if (sub_left) {
          children.push({
            name: sub_left.name,
            children: await fetchChildren(sub_left.id),
          });
        }

        if (sub_right) {
          children.push({
            name: sub_right.name,
            children: await fetchChildren(sub_right.id),
          });
        }

        return children;
      } catch (error) {
        console.error(error);
      }
    };

    axios.get('https://luckyx.cloud/api/v1/user/tree', { headers: authHeader })
      .then(async response => {
        const { parent, user, sub_left, sub_right } = response.data;
        const referralData = {
          name: parent ? parent.name : 'no parent',
          children: [{
            name: 'you',
            children: [
              {
                name: sub_left ? sub_left.name : 'no ref',
                children: await fetchChildren(sub_left ? sub_left.id : null),
              },
              {
                name: sub_right ? sub_right.name : 'no ref',
                children: await fetchChildren(sub_right ? sub_right.id : null),
              },
            ],
          }],
        };
        setData(referralData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [token]);


  const [data, setData] = useState({});


  const handleClick = (item) => {
    setSelected(item);
  };

  const NodeLabel = ({ node }) => {
    return (
      <div>
        {node && <span>{node.name}</span>}
        {node?.attributes?.deposit && (
          <button style={{ borderRadius: '50%', padding: '5px', fontSize: '12px' }}>
            <span style={{ fontSize: '16px' }}>&#33;</span>
            {node.attributes.deposit}
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <Notification message={notificationMessage} open={showNotification} />
      <header>
        <Header />

      </header>

      <main style={{ backgroundColor: '#f070e8' }}>
        {loading ? (
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 'bold', color: '#000' }}>Loading...</div>
        ) : (
          <div style={{ height: '100vh', width: '100vw' }} className='container ref_page'>
            <Tree
              data={data}
              orientation="vertical"
              translate={{
                x: window.innerWidth / 3,
                y: window.innerHeight / 3,
              }}
              nodeLabelComponent={NodeLabel}
            />

          </div>
        )}


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

export default ReferralPage;