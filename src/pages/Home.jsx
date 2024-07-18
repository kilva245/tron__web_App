import Header from "../components/Header";
import { Link, Navigate ,useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';
import TelegramIcon from '@mui/icons-material/Telegram';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import Notification from "../components/Notification";

export default function Home() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
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
    const [joinedUsersCount, setJoinedUsersCount] = useState(0);


    const handleUserJoined = () => {
        setJoinedUsersCount(prevCount => prevCount + 1);
    };

    // ...


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
                setJoinedUsersCount(response.data.tickets.length); // Update joinedUsersCount here
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const wl = localStorage.getItem('userData');


    return (
        <>
            <Notification message={notificationMessage} open={showNotification} />
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
                                                                                <img src={userData.avatar} width={100} alt="user" style={{ maxWidth: '80%', marginRight: 10 }} />
                                                                                <p style={{ color: 'yellow', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Hello,<br /> <strong style={{ color: '#000', fontWeight: 'bold' }}>{userData.name}</strong></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ position: 'relative', left: '-1em', marginBottom: 10, marginTop: 0 }} />
                                                                    <div style={{ height: '100%', overflow: '-moz-scrollbars-vertical', overflowX: 'hidden', overflowY: 'auto' }}>
                                                                        <ul className="is-flex is-flex-direction-column columns " style={{ height: '510px', overflow: '-moz-scrollbars-vertical', overflowX: 'hidden', overflowY: 'auto' }}>
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
                                                                                    <PsychologyAltIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                                                    <h2>Help Us</h2>
                                                                                </li>
                                                                            </a>
                                                                            <a href="https://t.me/LuckyX2500Trx">
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
                                                <div className="buttonn">
                                                    <Link to={'/sign-up'} className="btnn fx01">
                                                        <span>Sign up</span>
                                                    </Link>
                                                </div>
                                                <div className="buttonn">
                                                    <Link href="#" to={'/Login'} className="btnn fx01">
                                                        <span>Log in</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>


                                <h1>PLAY TO WIN</h1>
                                <p>play lottery to win big price <br /> deposit tron and play game</p>
                                <div className="button_ti mt-5">
                                    <Link to={'/sign-up'} className="btnn fx01">
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
                                        <td className="has-text-centered" style={{ color: '#000', fontSize: 12 }}>{index + 1}</td>
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
                                <img src="../assets/icon/homepn.png" width={40} className="mobileMenu_icons" />
                                {/* <HouseIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} /> */}
                            </Link>
                        </li>

                        <li>
                            <Link to="/latary" className={selected === 'lotarry' ? 'selected' : ''} onClick={() => handleClick('lottery')}>
                                <img src="../assets/icon/lottery.png" width={50} className="mobileMenu_icons" />
                                {/* <HowToVoteIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} /> */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/Profile" className={selected === 'Profile' ? 'selected' : ''} onClick={() => handleClick('Profile')}>
                                <img src="../assets/icon/data-management.png" width={50} className="mobileMenu_icons" />
                                {/* <AccountCircleIcon sx={{ fontSize: 30 }} /> */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/wallet" className={selected === 'Profile' ? 'selected' : ''} onClick={() => handleClick('Wallet')}>
                                <img src="../assets/icon/wallet.png" width={50} className="mobileMenu_icons" />
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