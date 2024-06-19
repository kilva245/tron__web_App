import Header from "../components/Header";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


export default function Home() {
    const [selected, setSelected] = useState(null);

    const handleClick = (item) => {
        setSelected(item);
    };

    const users = [
        { id: 1, name: 'John', family: 'Doe', email: 'john@example.com', balance: 20 },
        { id: 2, name: 'Jane', family: 'Smith', email: 'jane@example.com', balance: 20 },
        { id: 3, name: 'Bob', family: 'Johnson', email: 'bob@example.com', balance: 20 },
        //...
    ];

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
                        <div className="columns px-3 mb-5">
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
                <div className="px-3">
                    <div className="columns container users px-0">
                        <ul>
                            <li className="user-item">
                                <span>name</span>
                                <span className="mr-6">family</span>
                                <span className="mr-5">Email</span>
                                <span className="ml-2">Balance</span>
                            </li>
                            {users.map((user) => (
                                <>

                                    <li key={user.id} className="user-item">

                                        <span className="user-name">{user.name}</span>
                                        <span className="user-family">{user.family}</span>
                                        <span className="user-email">{user.email}</span>
                                        <span className="user-balance">${user.balance}</span>
                                    </li>
                                </>
                            ))}
                        </ul>
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

            <footer>

            </footer>
        </>
    )
}