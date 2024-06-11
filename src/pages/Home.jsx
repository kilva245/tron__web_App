import Header from "../components/Header";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Home() {
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
                <div className="hero">
                    <span className="hero_it"></span>
                    <span className="hero_it1"></span>
                    <div className="container px-3">
                        <div className="columns mt-5">
                            <div className="column hero__title">
                                <span className="mobile__signUp">
                                    <div className="buttons">
                                        <div class="buttonn">
                                            <Link to={'/SignUp'} class="btnn fx01">
                                                <span>Sign up</span>
                                            </Link>
                                        </div>
                                        <div class="buttonn">
                                            <Link href="#" to={'/Login'} class="btnn fx01">
                                                <span>Log in</span>
                                            </Link>
                                        </div>
                                    </div>
                                </span>
                                <h1>PLAY TO WIN</h1>
                                <p>play lottery to win big price <br /> deposit tron and play game</p>
                                <div class="button_ti mt-5">
                                    <Link to={'/SignUp'} class="btnn fx01">
                                        <span>see more</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="column">
                                <img src="./assets/images/banner.png" className="hero__image" alt="" />
                            </div>
                        </div>
                        <div className="columns px-3 mb-6">
                            <div className="column"></div>
                            <div className="column wallet__info px-5">
                                <span className="inner_icon"></span>
                                <span className="inner_icon"></span>
                                <span className="inner_icon"></span>
                                <div className="columns">
                                    <div className="column wallet__info_heads ">
                                        <p>Balance</p>
                                        <h3>0$</h3>
                                        <h4>0.0000000 TRX</h4>
                                    </div>
                                    <div className="column tron__dep">
                                        <button>deposit</button>
                                    </div>
                                </div>
                            </div>
                            <div className="column"></div>
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