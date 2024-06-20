import React, { useState } from 'react';
import { Tree } from 'react-d3-tree';
import { Link } from 'react-router-dom';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Header from '../components/Header';

const ReferralPage = () => {
  const [data, setData] = useState({
    "name": "CEO",
    "children": [
      {
        "name": "Manager",
        "attributes": {
          "deposit": "100TRX"
        },
        "children": [
          {
            "name": "Foreman",
            "attributes": {
              "deposit": "100TRX"
            },
            "children": [
              {
                "name": "Workers"
              }
            ]
          },
          {
            "name": "Foreman",
            "attributes": {
              "deposit": "100TRX"
            },
            "children": [
              {
                "name": "Workers"
              }
            ]
          }
        ]
      },
      {
        "name": "Manager",
        "attributes": {
          "deposit": "Marketing"
        },
        "children": [
          {
            "name": "Sales Officer",
            "attributes": {
              "deposit": "100TRX"
            },
            "children": [
              {
                "name": "Salespeople"
              }
            ]
          },
          {
            "name": "Sales Officer",
            "attributes": {
              "deposit": "100TRX"
            },
            "children": [
              {
                "name": "Salespeople"
              }
            ]
          },
          {
            "name": "Sales Officer",
            "attributes": {
              "deposit": "100TRX"
            },
            "children": [
              {
                "name": "Salespeople"
              }
            ]
          }
        ]
      }
    ]
  });

  const [selected, setSelected] = useState(null);

  const handleClick = (item) => {
    setSelected(item);
  };

  const NodeLabel = ({ node }) => {
    return (
      <div>
        <span>{node.name}</span>
        {node.attributes && node.attributes.deposit && (
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
              <Link to="/ref" className={selected === 'eferrals' ? 'selected' : ''} onClick={() => handleClick('referrals')}>
                <SupervisorAccountIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
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
            <li>
              <Link to="#" className={selected === 'ettings' ? 'selected' : ''} onClick={() => handleClick('settings')}>
                <SettingsIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
              </Link>
            </li>
          </ul>
        </nav>
      </main>





    </>

  );
};

export default ReferralPage;