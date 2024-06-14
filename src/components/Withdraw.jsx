import Header from "../components/Header";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function Withdraw() {
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
                <div className="top_dep container">
                    <div className="columns is-flex-mobile">
                        <div className="column is-6-mobile">
                            <Link to={"/wallet"}>
                                <ArrowLeftIcon style={{ color: 'white', fontSize: 30 }} className="mt-3 ml-4" /></Link>
                        </div>
                        <div className="column is-6-mobile">
                            <h2 className="mt-3">Withdraw</h2>
                        </div>
                    </div>
                </div>

                <div className="container withdraw_p">
                    <div className="inner">
                        <label>Address:</label>
                        <input className="input" type="text" placeholder="Enter address" />

                        <br />

                        <label>Amount:</label>
                        <input className="input" type="number" placeholder="10 TRX" />

                        <p className="mt-3">Network Fee : 1 USDT</p>
                        <p>MaxInvest Fee : 4%</p>

                        <div className=" columns has-text-centered mt-5">
                            <div className="column">
                                <button >Send</button>
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
                            <Link to="#" className={selected === 'eferrals' ? 'selected' : ''} onClick={() => handleClick('referrals')}>
                                <SupervisorAccountIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className={selected === 'lotarry' ? 'selected' : ''} onClick={() => handleClick('lottery')}>
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