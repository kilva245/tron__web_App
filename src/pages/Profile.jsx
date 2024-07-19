import Header from "../components/Header";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from "axios";
import Notification from "../components/Notification";

export default function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
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

    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalReward, setTotalReward] = useState(0);


    const authHeader = {
        'Authorization': `Bearer ${token}`,
    };

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const response = await axios.get('https://luckyx.cloud/api/v1/user/box', {
                    headers: authHeader,
                });
                const children = response.data;
                setParents(children);
                if (children && children.children && Array.isArray(children.children)) {
                    setTotalReward(children.children.reduce((acc, child) => acc + child.reward, 0));
                } else {
                    setTotalReward(0);
                }
            } catch (error) {
                // console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchChildren();
    }, [token]);


    const [refferal, setRefferal] = useState({});

    useEffect(() => {
        if (token) { // Check if token is initialized before using it
            axios.get('https://luckyx.cloud/api/v1/user/tree', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    const refferalData = response.data;
                    setRefferal(refferalData); // Update the refferal state
                })
                .catch(error => {
                    // console.error(error);
                });
        }
    }, [token]); // Add token to the dependency array



    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios.get('https://luckyx.cloud/api/v1/user/mytickets', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setTickets(response.data.tickets);
            })
            .catch(error => {
                // console.error(error);
            });
    }, [token]);

    if (!userData) {
        return null; // or return a loading indicator
    }

    const handleClick = (item) => {
        setSelected(item);
    };


    const subLeftName = refferal?.sub_left?.name || null;
    const subRightName = refferal?.sub_right?.name || null;
    const subLeftAvatar = refferal?.sub_left?.avatar || null;
    const subRightAvatar = refferal?.sub_right?.avatar || null;

    return (
        <>
            <Notification message={notificationMessage} open={showNotification} />
            <header>
                <Header />
            </header>

            <main>

                <div className="wallet">
                    <div className="top_wallet ">
                        <div className="top_wallet_inner container px-5">
                            <h3>welcome Back!</h3>
                            <div className="columns">
                                <div className="column">
                                    <div className="wallet_top_image">
                                        <img src={userData.avatar} alt="" />
                                    </div>
                                </div>
                                <div className="column is-flex is-justify-content-center top_inf">
                                    <span className="has-text-left">
                                        <h4 className="has-text-light">{userData.name}</h4>
                                        <h2 style={{ color: 'yellow' }}>{userData.balance} TRX</h2>
                                        <p className="has-text-light">Available Balance</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="columns container is-justify-content-space-between is-flex-mobile bottom_wallet px-3">
                        <div className="column is-6-mobile">
                            <h2>Activities</h2>
                            <div>
                                <Link to={'/profile/rewards'}>
                                    <div className="info_pending ">
                                        <span className="detailss" >Details</span>
                                        <div className="columns is-flex-mobile has-text-centered">

                                            <div className="column">
                                                <p style={{ fontSize: 14, fontWeight: 'bold' }}> rewards <br /><strong style={{ fontSize: 40, color: 'yellow' }}>{userData.reward} </strong></p>
                                            </div>


                                        </div>
                                    </div>
                                </Link>
                                <Link to={'/profile/tickets'}>
                                    <div className="info_pending mt-2 ">
                                        <span className="detailss" >Details</span>
                                        <div className="has-text-centered tickets">
                                            <h3>Tickets Buy</h3>
                                            {tickets && <h2>{tickets?.length ?? 0}</h2>}
                                        </div>
                                    </div>

                                </Link>
                            </div>
                        </div>

                        <div className="column  is-6-mobile">
                            <Link to={'/allRef'}>
                                <h2 className="has-text-centered">Reports Of Ref</h2>
                                <div className="referalls">
                                    <h2>{parents.countchilds}</h2>
                                    <p>Referalls</p>
                                    <p className="mt-4">
                                        referalls have
                                    </p>
                                    <span className="is-flex mt-5">
                                        {subLeftAvatar && <img src={`${process.env.PUBLIC_URL}/${subLeftAvatar}`} alt={'image'} />}
                                        {subRightAvatar && <img src={`${process.env.PUBLIC_URL}/${subRightAvatar}`} alt={'image'} />}
                                        <div className="info_image">
                                            <p className="has-text-light">+{(subLeftName ? 1 : 0) + (subRightName ? 1 : 0)}</p>
                                        </div>
                                    </span>
                                </div>


                            </Link>
                        </div>
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
            </main >

            <footer>

            </footer>
        </>
    )
}