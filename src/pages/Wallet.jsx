import Header from "../components/Header";
import PersonIcon from '@mui/icons-material/Person';
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import Notification from "../components/Notification";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function Wallet() {
    const [selected, setSelected] = useState(null);
    const [showInfo, setShowInfo] = useState(null);
    const navigate = useNavigate();
    const [token, setToken] = useState(null); // Initialize token state
    const [expiresAt, setExpiresAt] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

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
            <Notification message={notificationMessage} open={showNotification} />
            <header>
                <Header />
            </header>

            <main >
                <span className="wallet_page_back"></span>
                <div className="wallet_page container">
                    <div className="columns is-flex-mobile top_wal">

                        <div className="column ">
                            <h3 className="has-text-left" style={{ color: 'yellow' }}>Hello {userData.name}</h3>
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
                                <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    Withdraw
                                    <ArrowCircleUpIcon className="ml-4" />
                                </button>
                            </Link>

                        </div>

                        <div className="column has-text-centered">

                            <Link to={'/wallet/deposit'}>
                                <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    Deposit
                                    <ArrowCircleDownIcon className="ml-4" />
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
                            <div className="card-content">
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
                            </div>
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

            <footer>

            </footer>

        </>
    )
}