import Header from "../components/Header";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from "axios";

export default function Wallet() {
    const [selected, setSelected] = useState(null);
    const [showInfo, setShowInfo] = useState(null);


    const handleClick = (item) => {
        setSelected(item);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData.token;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`, // send the token as a Bearer token
                'Content-Type': 'ultipart/form-data', // set the content type to multipart/form-data
            },
        };
        axios.get('https://luckyx.cloud/api/v1/user/deposits', config)
            .then(response => {
                const data = response.data.deposits
                setDeposits(data);
            })
            .catch(error => {
                // console.error(error);
            })

        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsLoggedIn(true);
        }
    }, []);


    return (
        <>
            <header>
                <Header />
            </header>

            <main >
                <span className="wallet_page_back"></span>
                <div className="wallet_page container">
                    <div className="columns is-flex-mobile top_wal">
                        
                        <div className="column ">
                            <h3 className="has-text-left" style={{color: 'yellow'}}>Hello {userData.name}</h3>
                            <h2>Main Wallet</h2>
                        </div>
                        
                        <div className="column has-text-right">
                            
                            <Link to={'/Profile'}>
                                <PersonIcon className="top_wal_icon" /></Link>
                        </div>
                    </div>

                    <div className="columns wallet__have">
                        <div className="column ">
                            <h2>{userData && userData.balance ? userData.balance.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 }) : '0.0000'} TRX</h2>
                        </div>
                    </div>

                    <div className="columns is-flex-mobile wallet__btn mt-4">
                        <div className="column has-text-centered">
                            <Link to={"/wallet/withdraw"}>
                                <button>
                                    Withdraw
                                </button>
                            </Link>

                        </div>

                        <div className="column has-text-centered">

                            <Link to={'/wallet/deposit'}>
                                <button>
                                    Deposit
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>

                <div className="columns container">
                    <div className="column in__info">
                        <button
                            onClick={() => setShowInfo('deposits')}
                            className="button is-primary"
                        >
                            Deposits
                        </button>

                        <button
                            onClick={() => setShowInfo('withdraw')}
                            className="button is-primary"
                        >
                            Withdraw
                        </button>
                    </div>
                </div>

                <div className="columns container">
                    {showInfo === 'deposits' && (
                        <div className="card" style={{ width: '100%', marginBottom: '6em' }}>
                            <div className="card-header">
                                <p className="card-header-title">Deposits Information</p>
                            </div>
                            <div className="card-content">
                                <table className="table" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    {deposits.map((deposit, index) => (
                                        <tr key={index}>
                                            <td>{new Date(deposit.date * 1000).getFullYear() + '/' + (new Date(deposit.date * 1000).getMonth() + 1) + '/' + new Date(deposit.date * 1000).getDate()}</td>
                                            <td>
                                                <span className={`tag ${deposit.status === 'pending' ? 'is-warning' : 'is-success'}`}>
                                                    {deposit.status}
                                                </span>
                                            </td>
                                            <td>{deposit.amount} TRX</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                    )}
                    {showInfo === 'withdraw' && (
                        <div className="card" style={{ width: '100%', marginBottom: '6em' }}>
                            <div className="card-header">
                                <p className="card-header-title">Withdraw Information</p>
                            </div>
                            {/* <div className="card-content">
                                <table className="table" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2022-01-05</td>
                                            <td>
                                                <span className="tag is-success">Done</span>
                                            </td>
                                            <td>$50</td>
                                        </tr>
                                        <tr>
                                            <td>2022-01-20</td>
                                            <td>
                                                <span className="tag is-warning">Pending</span>
                                            </td>
                                            <td>$100</td>
                                        </tr>
                                        <tr>
                                            <td>2022-02-10</td>
                                            <td>
                                                <span className="tag is-success">Done</span>
                                            </td>
                                            <td>$200</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> */}
                        </div>
                    )}
                </div>

                {/* <div className="wallet_all_info container">
                    <div className="columns">
                        <div className="column">
                            <div className="columns">
                                <div className="column">

                                </div>
                                <div className="column">

                                </div>
                                <div className="column">

                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

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

            <footer>

            </footer>

        </>
    )
}