import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TelegramIcon from '@mui/icons-material/Telegram';
import GroupsIcon from '@mui/icons-material/Groups';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LogoutIcon from '@mui/icons-material/Logout';


export default function MyTeam() {
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <header>
                <Header />
            </header>
            <main>

                <div className="container" style={{ marginTop: '6em' }}>
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <th className="has-text-centered">Picture</th>
                                <th className="has-text-centered">Name</th>
                                <th className="has-text-centered">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="has-text-centered">
                                    <figure className="image has-text-centered is-48x48">
                                        <img src="https://via.placeholder.com/48" alt="User Profile Picture" />
                                    </figure>
                                </td>
                                <td className="has-text-centered">John Doe</td>
                                <td className="has-text-centered">
                                    <button className="button is-small is-primary" onClick={handleOpenModal}>
                                        <span className="icon">
                                            <AccountCircleIcon />
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="modal is-active">
                            <div className="modal-background"></div>
                            <div className="modal-content">
                                <div className="box">
                                    <h4 className="title is-4">User Information</h4>
                                    <table className="table is-fullwidth">
                                        <tr>
                                            <th>Time of Entry</th>
                                            <td>2022-01-01 12:00:00</td>
                                        </tr>
                                        <tr>
                                            <th>Assets</th>
                                            <td>$1000</td>
                                        </tr>
                                        <tr>
                                            <th>Commission</th>
                                            <td>10%</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <button className="modal-close is-large" aria-label="close" onClick={handleCloseModal}></button>
                        </div>
                    )}
                </div>


                <span className="mobile__signUp">

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
                                                <div className="user__info is-flex">
                                                    <img src="./assets/images/picw.png" width={100} alt="user" />
                                                    <p style={{ color: 'yellow', fontWeight: 'bold' }}>Hello,<br /> <strong style={{ color: '#000', fontWeight: 'bold' }}>{userData.name}</strong></p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr style={{ position: 'relative', left: '-1em' }} />
                                        <ul className="is-flex is-flex-direction-column columns">
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
                                            <Link to={'#'}>
                                                <li className="is-flex column">
                                                    <GroupsIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                    <h2>my team</h2>
                                                </li>
                                            </Link>

                                            <li className="is-flex column">
                                                <PriorityHighIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                <h2>Privacy policy</h2>
                                            </li>
                                            <li onClick={handleLogout} className="is-flex column">
                                                <LogoutIcon style={{ color: '#fff', fontSize: 30, marginRight: 10, borderRadius: 60, padding: 5, backgroundColor: '#F070E8' }} />
                                                <h2>Logout</h2>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                            </div>
                        </div>
                        {isLoggedIn ? (
                            <div className="d" style={{ display: 'none' }}></div>
                        ) : (
                            <>
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
                            </>
                        )}

                    </div>
                </span>
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
                            <Link to="/setting" className={selected === 'settings' ? 'selected' : ''} onClick={() => handleClick('settings')}>
                                <SettingsIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </main>
        </>
    )



}