import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from "react-router-dom";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TelegramIcon from '@mui/icons-material/Telegram';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { CircularProgressbar } from 'react-circular-progressbar';
import Notification from "../components/Notification";

export default function Rewards() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [token, setToken] = useState(null); // Initialize token state
    const [expiresAt, setExpiresAt] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const handleClick = (item) => {
        setSelected(item);
    };

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userDataJson = JSON.parse(storedUserData);
            setUserData(userDataJson);
            setToken(userDataJson.token);
        }
    }, []);

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

    // Add some sample data
    // const [dailyIncome, setDailyIncome] = useState(700);
    const [activeUsers, setActiveUsers] = useState(1000);
    const [inactiveUsers, setInactiveUsers] = useState(500);
    const [ticketSalesVolume, setTicketSalesVolume] = useState(10000);
    const targetIncome = 1000;
    // const progress = (dailyIncome / targetIncome) * 100;

    const [dailyIncome, setDailyIncome] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isRed, setIsRed] = useState(false);
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [leftDailyIncome, setLeftDailyIncome] = useState(0);
    const [rightDailyIncome, setRightDailyIncome] = useState(0);
    const totalRewards = leftDailyIncome + rightDailyIncome;


    const authHeader = {
        'Authorization': `Bearer ${token}`,
    };

    const [leftActiveUsers, setLeftActiveUsers] = useState(0);
    const [leftInactiveUsers, setLeftInactiveUsers] = useState(0);
    const [rightActiveUsers, setRightActiveUsers] = useState(0);
    const [rightInactiveUsers, setRightInactiveUsers] = useState(0);

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const response = await axios.get('https://luckyx.cloud/api/v1/user/box', {
                    headers: authHeader,
                });
                const children = response.data.children;
                if (Array.isArray(children)) {
                    const leftActiveUsers = children.filter(child => child.parent_type === 'L' && child.reward > 0).length;
                    const leftInactiveUsers = children.filter(child => child.parent_type === 'L' && child.reward === 0).length;
                    const rightActiveUsers = children.filter(child => child.parent_type === 'R' && child.reward > 0).length;
                    const rightInactiveUsers = children.filter(child => child.parent_type === 'R' && child.reward === 0).length;

                    setLeftDailyIncome(children.filter(child => child.parent_type === 'L').reduce((acc, current) => acc + current.reward, 0));
                    setRightDailyIncome(children.filter(child => child.parent_type === 'R').reduce((acc, current) => acc + current.reward, 0));

                    setLeftActiveUsers(leftActiveUsers);
                    setLeftInactiveUsers(leftInactiveUsers);
                    setRightActiveUsers(rightActiveUsers);
                    setRightInactiveUsers(rightInactiveUsers);

                } else {
                    console.error('Invalid response data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching children:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchChildren();
    }, [token]);

    return (
        <>
            <header>
                <Header />
            </header>

            <main className="reward-main" style={{ backgroundColor: '#f070e8', height: '100vh', marginBottom: 0 }}>
                <div className=" has-text-centered top_rewards_head">
                    <h2 style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }} >MAX daily reward: 1000TRX</h2>
                </div>
                <div className="chart-container">
                    <CircularProgressbar
                        value={totalRewards}
                        maxValue={1000}
                        text={`${totalRewards} TRX`}
                        styles={{
                            path: {
                                stroke: totalRewards >= 1000 ? 'red' : 'yellow',
                                strokeWidth: 10,
                            },
                            trail: {
                                stroke: 'transparent',
                                strokeWidth: 20,
                            },
                            text: {
                                fill: '#1fd8f2',
                                fontSize: '12px',
                                textAnchor: 'middle',
                                dominantBaseline: 'middle',
                                fontWeight: 'bold',
                            },
                        }}
                    >
                        <span style={{ fontSize: '12px' }}>{leftDailyIncome} Left</span>
                        <span style={{ fontSize: '12px' }}>{rightDailyIncome} Right</span>
                    </CircularProgressbar>
                    {/* <CircularProgressbar
                        value={progress}
                        text={`${dailyIncome} TRX`}
                        styles={{
                            path: {
                                stroke: isRed ? 'red' : 'yellow',
                                strokeWidth: 10,
                            },
                            trail: {
                                stroke: 'transparent',
                                strokeWidth: 20,
                            },
                            text: {
                                fill: '#1fd8f2',
                                fontSize: '12px',
                                textAnchor: 'middle',
                                dominantBaseline: 'middle',
                                fontWeight: 'bold',
                            },
                        }}
                    /> */}
                </div>



                <div className="tables-container container">
                    <table className="table-left">
                        <thead>
                            <tr>
                                <th>Left </th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Volume of Ticket Sales</td>
                                <td>{leftDailyIncome}</td>
                            </tr>
                            <tr>
                                <td>Active Users</td>
                                <td>{leftActiveUsers}</td>
                            </tr>
                            <tr>
                                <td>Inactive Users</td>
                                <td>{leftInactiveUsers}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="table-right">
                        <thead>
                            <tr>
                                <th>Right </th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Volume of Ticket Sales</td>
                                <td>{rightDailyIncome}</td>
                            </tr>
                            <tr>
                                <td>Active Users</td>
                                <td>{rightActiveUsers}</td>
                            </tr>
                            <tr>
                                <td>Inactive Users</td>
                                <td>{rightInactiveUsers}</td>
                            </tr>
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
                                <img alt="icon" src="../assets/icon/homepn.png" width={40} className="mobileMenu_icons" />
                                {/* <HouseIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} /> */}
                            </Link>
                        </li>

                        <li>
                            <Link to="/latary" className={selected === 'lotarry' ? 'selected' : ''} onClick={() => handleClick('lottery')}>
                                <img alt="icon" src="../assets/icon/lottery.png" width={50} className="mobileMenu_icons" />
                                {/* <HowToVoteIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} /> */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/Profile" className={selected === 'Profile' ? 'selected' : ''} onClick={() => handleClick('Profile')}>
                                <img alt="icon" src="../assets/icon/data-management.png" width={50} className="mobileMenu_icons" />
                                {/* <AccountCircleIcon sx={{ fontSize: 30 }} /> */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/wallet" className={selected === 'Profile' ? 'selected' : ''} onClick={() => handleClick('Wallet')}>
                                <img alt="icon" src="../assets/icon/wallet.png" width={50} className="mobileMenu_icons" />
                                {/* <AccountBalanceWalletIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} /> */}
                            </Link>
                        </li>

                    </ul>

                </nav>
            </main>
        </>
    )
}