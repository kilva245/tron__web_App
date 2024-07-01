

import Header from "../components/Header";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import axios from 'axios';

export default function Withdraw() {
    const [selected, setSelected] = useState(null);
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // create a state variable to track the submission status

    const handleClick = (item) => {
        setSelected(item);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const userData = JSON.parse(localStorage.getItem('userData'));

    const handleSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const token = userData.token;
            const formData = new FormData();
            formData.append('address', userData.wallet);
            formData.append('amount', amount);
            axios.post('https://luckyx.cloud/api/v1/user/withdraw', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    // console.log(response);
                    alert(response.data.error)
                    // Handle success response
                })
                .catch(error => {
                    // console.error(error);
                    // Handle error response
                })
                .finally(() => {
                    setIsSubmitting(false); // set isSubmitting to false to re-enable the button
                });
        } catch (error) {
            // console.error(error);
            // Handle error response
        }
    };

    return (
        <>
            <header>
                <Header />
            </header>

            <main>
                <div className="top_dep container">
                    <div className="columns is-flex-mobile">
                        <div className="column is-6-mobile">
                            <Link to={"/wallet"}>
                                <ArrowLeftIcon style={{ color: 'white', fontSize: 30 }} className="mt-3 ml-4" /></Link>
                        </div>
                        <div className="column is-6-mobile">
                            <h2 className="mt-3">Withdraw</h2>
                        </div>
                    </div>
                </div>

                <div className="container withdraw_p">
                    <div className="inner">
                        <label>Address:</label>
                        <input className="input" type="text" placeholder="Enter address" disabled value={userData.wallet} />

                        <br />

                        <label>Amount:</label>
                        <input className="input" type="number" placeholder="45 TRX" value={amount} onChange={handleAmountChange} />

                        <p className="mt-3">Network Fee : 3 TRX</p>

                        <div className=" columns has-text-centered mt-5">
                            <div className="column">
                                <button
                                    className="btn2"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting} // disable the button while submitting
                                >
                                    {isSubmitting ? (
                                        <span>
                                            <i className="fas fa-spinner fa-spin" /> Loading...
                                        </span>
                                    ) : (
                                        'Withdraw'
                                    )}
                                </button>
                            </div>
                        </div>
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