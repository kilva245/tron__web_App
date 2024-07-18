import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TelegramIcon from '@mui/icons-material/Telegram';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import Notification from "../components/Notification";

export default function TicketsInfo() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [expiresAt, setExpiresAt] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [token, setToken] = useState(null); // Initialize token state
    const [showNotification, setShowNotification] = useState(false);
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userDataJson = JSON.parse(storedUserData);
            setUserData(userDataJson);
            setToken(userDataJson.token);
        }
    }, []);

    const handleClick = (item) => {
        setSelected(item);
    };


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

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsLoggedIn(true);
        }
    }, []);

    const [tickets, setTickets] = useState('');

    useEffect(() => {
        const token = userData
        axios.get('https://luckyx.cloud/api/v1/user/mytickets', {
            headers: {
                Authorization: `Bearer ${token.token}`
            },
        })
            .then(response => {
                setTickets(response.data.tickets);
            })
            .catch(error => {
                console.error(error);
            });
    }, [token]);

    const [data2, setData2] = useState(false)

    useEffect(() => {
        axios.get('https://luckyx.cloud/api/v1/findlottery', {
            params: {
                id: 3
            }
        })
            .then(response => {
                setData2(response.data);
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);





    return (
        <>
            <header>
                <Header />
            </header>

            <main className="ticketinfo-main" style={{backgroundColor: '#f070e8', height: '100vh'}}>


                <div className="container ticket_page" style={{ width: '100%', overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>email</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets?.length > 0 ? (
                                tickets.map(currentTicket => (
                                    <tr key={currentTicket.id}>
                                        <td>{currentTicket.name}</td>
                                        <td>{currentTicket.email}</td>
                                        <td>{new Date(currentTicket.date * 1000).toLocaleDateString('en-CA')}</td>
                                        
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>No tickets found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="navbar-end">
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
                                                        <div className="column is-12">
                                                            <div className="user__info is-flex" style={{ position: 'relative', left: '-20px' }}>
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
                                    {isLoggedIn ? (
                                        <div className="d" style={{ display: 'none' }}></div>
                                    ) : (
                                        <>
                                            <div className="buttonn">
                                                <Link to={'/SignUp'} className="btnn fx01">
                                                    <span>Sign up</span>
                                                </Link>
                                            </div>
                                            <div className="buttonn">
                                                <Link href="#" to={'/Login'} className="btnn fx01">
                                                    <span>Log in</span>
                                                </Link>
                                            </div>
                                        </>
                                    )}

                                </div>
                            </span>
                        </>
                    ) : (
                        <div className="navbar-item">
                            <div className="buttons">
                                <div className="buttonn">
                                    <Link to={'/SignUp'} className="btnn fx01">
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
        </>
    )
}