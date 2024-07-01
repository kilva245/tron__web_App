
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Header from '../components/Header';
import { Link, Navigate } from "react-router-dom";
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

const ReferralCode = () => {

    const [selected, setSelected] = useState(null);

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

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));

        } else {
            // If no user data is found in local storage, redirect to login page
            return <Navigate to="/login" replace />;
        }
    }, []);


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

        </>
    );
};

export default ReferralCode;