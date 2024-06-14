import Header from "../components/Header";
import React, { useState } from 'react';
import { Link } from "react-router-dom"; import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function Latary() {

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
                <div className="columns px-3 mb-5">
                    <div className="column"></div>
                    <div className="column lottary_info px-5">
                        <span className="inner_icon"></span>
                        <span className="inner_icon"></span>
                        <span className="inner_icon"></span>
                        <div className="columns is-flex-mobile">
                            <div className="column is-8-mobile lottary__info_heads ">
                                <p>Super Enalotto</p>
                                <h3>$ 69.9 Million</h3>
                                <button className="timer">1hr 31min</button>
                            </div>
                            <div className="column tron__dep">
                                <Link to={'/latary/join'}>
                                    <button className="has-text-light">BET HERE</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="column"></div>
                </div>

                <div className="container columns">
                    <div className="column">
                        <table className="table is-fullwidth" style={{ borderRadius: 20 }}>
                            <thead>
                                <tr>
                                    <th className="has-text-centered">Name</th>
                                    <th className="has-text-centered">Number of Tickets</th>
                                    <th className="has-text-centered">Union Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="has-text-centered">John</td>
                                    <td className="has-text-centered">5 ($50.00)</td>
                                    <td className="has-text-centered">joined</td>
                                </tr>
                                <tr>
                                    <td className="has-text-centered">Emily</td>
                                    <td className="has-text-centered">3 ($30.00)</td>
                                    <td className="has-text-centered">joined</td>
                                </tr>
                                <tr>
                                    <td className="has-text-centered">Michael</td>
                                    <td className="has-text-centered">2 ($20.00)</td>
                                    <td className="has-text-centered">joined</td>
                                </tr>
                                <tr>
                                    <td className="has-text-centered">Sarah</td>
                                    <td className="has-text-centered">4 ($40.00)</td>
                                    <td className="has-text-centered">joined</td>
                                </tr>
                            </tbody>
                        </table>
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
                            <Link to="#" className={selected === 'eferrals' ? 'selected' : ''} onClick={() => handleClick('referrals')}>
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

            <footer>

            </footer>
        </>
    )
}