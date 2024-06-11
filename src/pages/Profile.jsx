import Header from "../components/Header";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Profile() {
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
                <div className="wallet">
                    <div className="top_wallet ">
                        <div className="top_wallet_inner container px-3">
                            <h3>welcome Back!</h3>
                            <div className="columns">
                                <div className="column">
                                    <div className="wallet_top_image">
                                        <img src="./assets/images/wallet.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="column is-flex is-justify-content-center top_inf">
                                    <span className="has-text-left">
                                        <h4>Alireza R.</h4>
                                        <h2>$24.793</h2>
                                        <p>Available Balance</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="columns container bottom_wallet px-3">
                        <div className="column ">
                            <h2>Activities</h2>
                            <div className="is-flex-mobile ">
                                <div className="info_pending ">
                                    <div className="columns has-text-centered">
                                        <div className="column">
                                            <h3 className="mb-3">Loan</h3>
                                            <p>pending</p>
                                        </div>
                                        <div className="column">
                                            <p className="mb-3">Details</p>
                                            <h3>$2,839.2</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="info_pending mt-6 ">
                                    <div className="has-text-centered tickets">
                                        <h3>Tickets Buy</h3>
                                        <h2>18</h2>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="column">
                            <h2>Reports Of Ref</h2>
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