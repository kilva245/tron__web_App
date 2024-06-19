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
        name: 'You',
        image: 'https://via.placeholder.com/100x100',
        assets: 1000,
        children: [
            {
                name: 'amir',
                image: 'https://via.placeholder.com/100x100?text=Referral+1',
                assets: 500,
                children: [
                    {
                        name: 'ali (20$)',
                        image: 'https://via.placeholder.com/100x100?text=Referral+1.1',
                        assets: 200,
                    },
                    {
                        name: 'akane',
                        image: 'https://via.placeholder.com/100x100?text=Referral+1.2',
                        assets: 300,
                    },
                ],
            },
            {
                name: 'alireza',
                image: 'https://via.placeholder.com/100x100?text=Referral+2',
                assets: 800,
                text: '(20$)',
                children: [
                    {
                        name: 'reza',
                        image: 'https://via.placeholder.com/100x100?text=Referral+2.1',
                        assets: 400,
                    },
                ],
            },
        ],
    });


    const nodeSvgShape = {
        shape: 'image',
        shapeProps: {
            width: 100,
            height: 100,
            x: -50,
            y: -50,
        },
    };
    const nodeLabel = () => {
        return (
            <div style={{ position: 'relative', backgroundColor: 'white' }}>
                <img src={data.image} alt={data.name} style={{ width: '100px', height: '100px' }} />
                <p style={{ color: 'yellow' }}>{data.name}</p>
                <p style={{ color: 'lime' }}>{data.assets ? `${data.assets}$` : ''}</p>
            </div>
        );
    };
    
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
                <div style={{ height: '100vh', width: '100vw' }} className='container ref_page'>
                    <Tree
                        data={data}
                        nodeSvgShape={nodeSvgShape}
                        nodeLabel={nodeLabel}
                        orientation="vertical"
                        translate={{
                            x: window.innerWidth / 3,
                            y: window.innerHeight / 3,
                          }}
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