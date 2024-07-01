import Header from "../components/Header";
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from "axios";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function Deposit() {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const handleClick = (item) => {
        setSelected(item);
    };



    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

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

    const [inputValue, setInputValue] = useState(''); // create a state variable to store the input value
    const [isSubmitting, setIsSubmitting] = useState(false); // create a state variable to track the submission status

    const handleSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();
        const formData = new FormData(); // create a new FormData object
        formData.append('amount', inputValue); // append the input value to the form data

        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData.token;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`, // send the token as a Bearer token
                'Content-Type': 'ultipart/form-data', // set the content type to multipart/form-data
            },
        };

        axios.post('https://luckyx.cloud/api/v1/user/deposit', formData, config)
            .then(response => {
                const { data } = response;
                const invoiceUrl = data.response.data.invoice_url;
                window.location.href = invoiceUrl; // redirect to the invoice URL
            })
            .catch(error => {
                // console.error(error);
            })
            .finally(() => {
                setIsSubmitting(false); // set isSubmitting to false to re-enable the button
              });
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value.replace(/[^0-9]/g, ''); // remove non-numeric characters
        setInputValue(newValue); // update the inputValue state variable
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
                            <h2 className="mt-3">Deposit</h2>
                        </div>
                    </div>
                </div>

                <div className="dep_m container">
                    <div className="columns h">
                        <div className="column has-text-centered-mobile">
                            <button>TRX</button>
                        </div>
                        <div className="column">
                            <input
                                class="input"
                                type="text"
                                placeholder="0.0000 TRX"
                                value={inputValue} // bind the input value to the inputValue state variable
                                onChange={handleInputChange}
                                pattern="[0-9]*"
                            />
                        </div>
                    </div>
                    <div className=" columns has-text-centered-mobile">
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
              'Deposit'
            )}
          </button>
        </div>
                    </div>
                </div>

                

                <nav className="mobile-navbar">
                    <ul>
                        <li>
                            <Link to={"/"} className={selected === 'home' ? 'elected' : ''} onClick={() => handleClick('home')}>
                                <HouseIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className={selected === 'eferrals' ? 'elected' : ''} onClick={() => handleClick('referrals')}>
                                <SupervisorAccountIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className={selected === 'lotarry' ? 'elected' : ''} onClick={() => handleClick('lottery')}>
                                <HowToVoteIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
                            </Link>
                        </li>
                        <li>
                            <Link to="/Profile" className={selected === 'Profile' ? 'elected' : ''} onClick={() => handleClick('Profile')}>
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
            </main >
        </>
    )
}