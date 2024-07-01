import React, { useState, useEffect } from 'react';
import { Tree } from 'react-d3-tree';
import { Link } from 'react-router-dom';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Header from '../components/Header';
import axios from 'axios';

const ReferralPage = () => {
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData.token;
    const authHeader = {
      'Authorization': `Bearer ${token}`,
    };
    axios.get('https://luckyx.cloud/api/v1/user/tree', { headers: authHeader })
      .then(response => {
        const { parent, user, sub_left, sub_right } = response.data;
        const referralData = {

          name: parent ? parent.name : 'no parent' ,
          children: [{
            name: 'you',
            children: [
              {
                name: sub_left ? sub_left.name : 'no ref',
                // attributes: {
                //   deposit: sub_left ? sub_left.balance : 'no ref'
                // },
                children: sub_left ? sub_left.children || [] : []
              },
              {
                name: sub_right ? sub_right.name : 'no ref',
                // attributes: {
                //   deposit: sub_right ? sub_right.balance : 'no ref'
                // },
                children: sub_right ? sub_right.children || [] : []
              }
            ]
          }]
        };
        setData(referralData);
      })
      .catch(error => {
        // console.error(error);
      });
  }, []);
  const [data, setData] = useState({});

  const [selected, setSelected] = useState(null);

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

      <header>
        <Header />

      </header>

      <main>
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


        <nav className="mobile-navbar">
          <ul>
            <li>
              <Link to={"/"} className={selected === 'home' ? 'selected' : ''} onClick={() => handleClick('home')}>
                <HouseIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
              </Link>
            </li>

            <li>
              <Link to="/latary" className={selected === 'lotarry' ? 'selected' : ''} onClick={() => handleClick('lottery')}>
                <HowToVoteIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
              </Link>
            </li>
            <li>
              <Link to="/Profile" className={selected === 'Profile' ? 'selected' : ''} onClick={() => handleClick('Profile')}>
                <AccountCircleIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
              </Link>
            </li>
            <li>
              <Link to="/wallet" className={selected === 'Profile' ? 'selected' : ''} onClick={() => handleClick('Wallet')}>
                <AccountBalanceWalletIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
              </Link>
            </li>

          </ul>
        </nav>
      </main>





    </>

  );
};

export default ReferralPage;