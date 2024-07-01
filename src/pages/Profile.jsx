import Header from "../components/Header";
import { Link, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from "axios";

export default function Profile() {
    const [selected, setSelected] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        } else {
            // If no user data is found in local storage, redirect to login page
            return <Navigate to="/login" replace />;
        }
    }, []);

    const [tickets, setTickets] = useState([]);
    const userData2 = localStorage.getItem('userData');
    const token = userData2

    useEffect(() => {
        axios.get('https://luckyx.cloud/api/v1/user/mytickets', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setTickets(response.data.tickets);
            })
            .catch(error => {
                console.error(error);
            });
    }, [token]);

    if (!userData) {
        return null; // or return a loading indicator
    }

    const handleClick = (item) => {
        setSelected(item);
    };

    return (
        <>
            <header>
                <Header />
            </header>

            <main>
                
                <div className="wallet">
                    <div className="top_wallet ">
                        <div className="top_wallet_inner container px-3">
                            <h3>welcome Back!</h3>
                            <div className="columns">
                                <div className="column">
                                    <div className="wallet_top_image">
                                        <img src={userData.avatar} alt="" />
                                    </div>
                                </div>
                                <div className="column is-flex is-justify-content-center top_inf">
                                    <span className="has-text-left">
                                        <h4 className="has-text-light">{userData.name}</h4>
                                        <h2 style={{ color: 'yellow' }}>{userData.balance} TRX</h2>
                                        <p className="has-text-light">Available Balance</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="columns container is-justify-content-space-between is-flex-mobile bottom_wallet px-3">
                        <div className="column is-6-mobile">
                            <h2>Activities</h2>
                            <div>
                                <div className="info_pending ">
                                    <div className="columns is-flex-mobile  has-text-centered">
                                        <div className="column">
                                            <p style={{fontSize: 14, fontWeight: 'bold'}}> rewards <br /> <strong style={{fontSize: 16, color: 'yellow'}}>{userData.reward} </strong></p>
                                        </div>
                                        
                                    </div>
                                </div>

                                <div className="info_pending mt-2 ">
                                    <div className="has-text-centered tickets">
                                        <h3>Tickets Buy</h3>
                                        <h2>{tickets?.length ?? 1}</h2>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="column  is-6-mobile">
                            <h2 className="has-text-centered">Reports Of Ref</h2>
                            <div className="referalls">
                                <h2>12</h2>
                                <p>Referalls</p>
                                <p className="mt-4">
                                    referalls have
                                </p>

                                <span className="is-flex mt-5">
                                    <img src="./assets/images/wallet.jpg" alt="" />
                                    <img src="./assets/images/wallet.jpg" alt="" />
                                    <img src="./assets/images/wallet.jpg" alt="" />
                                    <div className="info_image">
                                        <p className="has-text-light">+12</p>
                                    </div>
                                </span>
                                {/* <div class="buttonn">
                                    <Link href="#" to={'/'} class="btnn fx01">
                                        <span>more</span>
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                    </div>

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

            <footer>

            </footer>
        </>
    )
}