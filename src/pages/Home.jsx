import Header from "../components/Header";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';
import TelegramIcon from '@mui/icons-material/Telegram';
import GroupsIcon from '@mui/icons-material/Groups';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function Home() {
    const [selected, setSelected] = useState(null);

    const handleClick = (item) => {
        setSelected(item);
    };



    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }

        setIsMenuClicked(!isMenuClicked)
    }

    const close1 = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(false)
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [joinedUsersCount, setJoinedUsersCount] = useState(1);

    useEffect(() => {
        function handleUserJoined() {
            setJoinedUsersCount(prevCount => prevCount + 1);
        }
    }, []);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsLoggedIn(true);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    const [data, setData] = useState({});

    useEffect(() => {
        axios.get('https://luckyx.cloud/api/v1/lastlottery')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const wl = localStorage.getItem('userData');


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

                                <div className="navbar-end navbar-end2 ">
                                    {isLoggedIn ? (
                                        <>

                                            <span className="mobile__signUp">
                                                <div className="navbar-item has-text-right">

                                                    <div className="logout-icon">
                                                        <a onClick={handleLogout}>
                                                            <LogoutIcon style={{ color: '#fff', fontSize: 24, marginRight: 10 }} />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="buttons">
                                                    <div className="mobile__nav_left">
                                                        <nav className=" is-flex is-justify-content-space-between">
                                                            <div className="burger-menu" onClick={updateMenu}>
                                                                <div className={burger_class}></div>
                                                                <div className={burger_class}></div>
                                                                <div className={burger_class}></div>
                                                            </div>

                                                        </nav>

                                                        <div className={menu_class}>
                                                            <div className="mnn">
                                                                <div className="mnu" onClick={close1}>
                                                                </div>

                                                                <div className="menu__mob">
                                                                    <div className="columns">
                                                                        <div className="column is-12" style={{ position: 'relative', left: '-20px' }}>
                                                                            <div className="user__info is-flex">
                                                                                <img src={userData.avatar} width={100} alt="user" />
                                                                                <p style={{ color: 'yellow', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Hello,<br /> <strong style={{ color: '#000', fontWeight: 'bold' }}>{userData.name}</strong></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ position: 'relative', left: '-1em', marginBottom: 10, marginTop: 0 }} />
                                                                    <div style={{ height: '100%', overflow: '-moz-scrollbars-vertical', overflowX: 'hidden', overflowY: 'auto' }}>
                                                                        <ul className="is-flex is-flex-direction-column columns "  style={{ height: '580px', overflow: '-moz-scrollbars-vertical', overflowX: 'hidden', overflowY: 'auto'}}>
                                                                            <Link to={'/wallet'}>
                                                                                <li className="is-flex column">
                                                                                    <AccountBalanceWalletIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                                                    <h2>Wallet</h2>
                                                                                </li>
                                                                            </Link>
                                                                            <Link to={'/referral-code'}>
                                                                                <li className="is-flex column">
                                                                                    <SupervisorAccountIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                                                    <h2>Invite Friends</h2>
                                                                                </li>
                                                                            </Link>
                                                                            <a href="https://t.me/upporteronline24">
                                                                                <li className="is-flex column">
                                                                                    <TelegramIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                                                    <h2>Help Us</h2>
                                                                                </li>
                                                                            </a>
                                                                            <a href="https://t.me/iranairdrop17">
                                                                                <li className="is-flex column">
                                                                                    <TelegramIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                                                    <h2>Telegram channel</h2>
                                                                                </li>
                                                                            </a>
                                                                            <Link to={'/ref'}>
                                                                                <li className="is-flex column">
                                                                                    <GroupsIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                                                    <h2>my team</h2>
                                                                                </li>
                                                                            </Link>

                                                                            <li className="is-flex column">
                                                                                <PriorityHighIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                                                <h2>Privacy policy</h2>
                                                                            </li>
                                                                            <Link to={'/setting'}>
                                                                                <li className="is-flex column">
                                                                                    <SettingsIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                                                    <h2>setting</h2>
                                                                                </li>
                                                                            </Link>
                                                                            <li onClick={handleLogout} className="is-flex column">
                                                                                <LogoutIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                                                <h2>Logout</h2>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>

                                                </div>
                                            </span>
                                        </>
                                    ) : (
                                        <div className="navbar-item">
                                            <div className="buttons">
                                                <div class="buttonn">
                                                    <Link to={'/sign-up'} class="btnn fx01">
                                                        <span>Sign up</span>
                                                    </Link>
                                                </div>
                                                <div class="buttonn">
                                                    <Link href="#" to={'/Login'} class="btnn fx01">
                                                        <span>Log in</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>


                                <h1>PLAY TO WIN</h1>
                                <p>play lottery to win big price <br /> deposit tron and play game</p>
                                <div class="button_ti mt-5">
                                    <Link to={'/sign-up'} class="btnn fx01">
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
                                        <span>
                                            <p>Balance</p>
                                            <h3>{userData.balance}TRX</h3>
                                            <h4 style={{ color: 'yellow' }}>Available Balance</h4>
                                        </span>
                                        <div className=" tron__dep">
                                            <Link to={'/wallet/deposit'}>
                                                <button>deposit</button>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="column"></div>
                        </div>
                    </div>
                </div>
                <div className="px-3 info__lattary">
                    <div className="columns container users px-0">
                        <table className="table lot_table is-fullwidth" style={{ borderRadius: 20 }}>
                            <thead>
                                <tr>
                                    <th className="has-text-centered" style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>user</th>
                                    <th className="has-text-centered" style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Name</th>
                                    <th className="has-text-centered" style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Tickets</th>
                                    <th className="has-text-centered" style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Status</th>
                                    <th className="has-text-centered" style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.tickets && data.tickets.map((ticket, index) => (
                                    <tr key={index}>
                                        <td className="has-text-centered" style={{ color: '#000', fontSize: 12 }}>{joinedUsersCount}</td>
                                        <td className="has-text-centered" style={{ color: '#000', fontSize: 12 }}>{ticket.name}</td>
                                        <td className="has-text-centered" style={{ color: '#000', fontSize: 12 }}>1 (100 TRX)</td>
                                        <td className="has-text-centered" style={{ color: '#000', fontSize: 12 }}>joined</td>
                                        <td className="has-text-centered" style={{ color: '#000', fontSize: 12 }}>
                                            {new Date(ticket.date * 1000).getFullYear() + '/' + (new Date(ticket.date * 1000).getMonth() + 1) + '/' + new Date(ticket.date * 1000).getDate()}
                                        </td>
                                    </tr>
                                ))}
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