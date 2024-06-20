
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Header from '../components/Header';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const ReferralCode = () => {

    const [selected, setSelected] = useState(null);

    const handleClick = (item) => {
        setSelected(item);
    };
    const [copied, setCopied] = useState(false);


    const handleCopy = () => {
        setCopied(true);
    };

    return (
        <>


            <header>
                <Header />
            </header>

            <main>
                <div className="referral-code">
                    <div className="referral-code-header">
                        <img src="./assets/images/gift.png" alt="Gift" />
                        <h1>Invite Your Friends Reward Yourself</h1>
                    </div>
                    <p>Invite your friends and family to <br />earn rewards, offers, and more</p>
                    <div className="referral-code-value">{34323}</div>
                    <CopyToClipboard text={34323} onCopy={handleCopy}>
                        <button className="referral-code-copy-button">Copy</button>
                    </CopyToClipboard>
                    {copied && <p className="referral-code-copied-message">Copied!</p>}
                    <button className="referral-code-share-button">
                        Share on Social Media
                    </button>
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

        </>
    );
};

export default ReferralCode;