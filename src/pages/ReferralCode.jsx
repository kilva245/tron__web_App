
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Header from '../components/Header';
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton
} from 'react-share';
import { WhatsappIcon, FacebookIcon, TwitterIcon, TelegramIcon } from 'react-share';
import axios from 'axios';
import Notification from '../components/Notification';

const ReferralCode = () => {

    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [token, setToken] = useState(null); // Initialize token state
    const [expiresAt, setExpiresAt] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [userData, setUserData] = useState(null);

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


    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userDataJson = JSON.parse(storedUserData);
            setUserData(userDataJson);
            setToken(userDataJson.token);
            setExpiresAt(userDataJson.expiresAt);
        } else {
            // If no user data is found in local storage, redirect to login page
            return <Navigate to="/login" replace />;
        }
    }, []);

    const handleClick = (item) => {
        setSelected(item);
    };
    const [copied, setCopied] = useState(false);


    const handleCopy = () => {
        setCopied(true);
        const referralCode = userData.r_code;
        const signUpLink = `http://luckyx.cloud/sign-up?referralCode=${referralCode}`;
        navigator.clipboard.writeText(signUpLink);
    };
    const handleCopy2 = () => {
        setCopied(true);
        const referralCode = userData.l_code;
        const signUpLink = `http://luckyx.cloud/sign-up?referralCode=${referralCode}`;
        navigator.clipboard.writeText(signUpLink);
    };



  


    const [referralCode, setReferralCode] = useState(null);

    useEffect(() => {
        // fetch referral code from server
        const fetchReferralCode = async () => {
            const response = await fetch('/api/referral-code');
            const data = await response.json();
            setReferralCode(data.referralCode);
        };
        fetchReferralCode();
    }, []);

    const shareUrl = `https://luckyx.cloud/referral-code?code=${referralCode}`;




    return (
        <>
            <Notification message={notificationMessage} open={showNotification} />

            <header>
                <Header />
            </header>

            <main style={{ backgroundColor: '#F070E8', height: '100%' }}>
                <div className="referral-code">
                    {userData ? (
                        <>
                            <div className="referral-code-header">
                                <img src="./assets/images/gift.png" alt="Gift" />
                                <h1>Invite Yours<br /> Friends Reward Yourself</h1>
                            </div>
                            <p>Invite your friends and family to <br />earn rewards, offers, and more</p>
                            {userData.r_code ? (
                                <div className="referral-code-value">
                                    <CopyToClipboard text={userData.r_code} onCopy={handleCopy}>
                                        <button className="referral-code-copy-button">Copy RightRef code</button>
                                    </CopyToClipboard></div>
                            ) : (
                                <div className="referral-code-value" disabled={true}>you have right ref</div>
                            )}
                            {userData.l_code ? (
                                <div className="referral-code-value">
                                    <CopyToClipboard text={userData.l_code} onCopy={handleCopy2}>
                                        <button className="referral-code-copy-button">Copy LeftRef code</button>
                                    </CopyToClipboard></div>
                            ) : (
                                <div className="referral-code-value" disabled={true}>you have left ref</div>
                            )}


                            {copied && <p className="referral-code-copied-message">Copied!</p>}

                            {/* <button className="referral-code-share-button" onClick={handleShare}>Share on Social Media</button> */}
                        </>
                    ) : (
                        <p>Loading...</p>
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
    );
};

export default ReferralCode;