import Header from "../components/Header";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function Wallet() {
    const [selected, setSelected] = useState(null);
    const [showInfo, setShowInfo] = useState(null);


    const handleClick = (item) => {
        setSelected(item);
    };

    return (
        <>
            <header>
                <Header />
            </header>

            <main >
                <span className="wallet_page_back"></span>
                <div className="wallet_page mt-6 container">
                    <div className="columns is-flex-mobile top_wal">
                        <div className="column has-text-centered">
                            <h2>Main Wallet</h2>
                        </div>
                        <div className="column has-text-centered">
                            <Link to={'/Profile'}>
                                <PersonIcon className="top_wal_icon" /></Link>
                        </div>
                    </div>

                    <div className="columns wallet__have">
                        <div className="column ">
                            <h2>91,150.00$</h2>
                            <p>235442.00 TRX</p>
                        </div>
                    </div>

                    <div className="columns is-flex-mobile wallet__btn mt-4">
                        <div className="column has-text-centered">
                            <Link to={"/wallet/withdraw"}>
                                <button>
                                    Withdraw
                                </button>
                            </Link>

                        </div>

                        <div className="column has-text-centered">

                            <Link to={'/wallet/deposit'}>
                                <button>
                                    Deposit
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>

                <div className="columns container">
                    <div className="column in__info">
                        <button
                            onClick={() => setShowInfo('deposits')}
                            className="button is-primary"
                        >
                            Deposits
                        </button>

                        <button
                            onClick={() => setShowInfo('withdraw')}
                            className="button is-primary"
                        >
                            Withdraw
                        </button>
                    </div>
                </div>

                <div className="columns container">
                    {showInfo === 'deposits' && (
                        <div className="card" style={{width: '100%'}}>
                            <div className="card-header">
                                <p className="card-header-title">Deposits Information</p>
                            </div>
                            <div className="card-content">
                                <table className="table" style={{width: '100%'}}>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2022-01-01</td>
                                            <td>
                                                <span className="tag is-success">Done</span>
                                            </td>
                                            <td>$100</td>
                                        </tr>
                                        <tr>
                                            <td>2022-01-15</td>
                                            <td>
                                                <span className="tag is-warning">Pending</span>
                                            </td>
                                            <td>$200</td>
                                        </tr>
                                        <tr>
                                            <td>2022-02-01</td>
                                            <td>
                                                <span className="tag is-success">Done</span>
                                            </td>
                                            <td>$300</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {showInfo === 'withdraw' && (
                        <div className="card" style={{width: '100%'}}>
                            <div className="card-header">
                                <p className="card-header-title">Withdraw Information</p>
                            </div>
                            <div className="card-content">
                                <table className="table" style={{width: '100%'}}>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2022-01-05</td>
                                            <td>
                                                <span className="tag is-success">Done</span>
                                            </td>
                                            <td>$50</td>
                                        </tr>
                                        <tr>
                                            <td>2022-01-20</td>
                                            <td>
                                                <span className="tag is-warning">Pending</span>
                                            </td>
                                            <td>$100</td>
                                        </tr>
                                        <tr>
                                            <td>2022-02-10</td>
                                            <td>
                                                <span className="tag is-success">Done</span>
                                            </td>
                                            <td>$200</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* <div className="wallet_all_info container">
                    <div className="columns">
                        <div className="column">
                            <div className="columns">
                                <div className="column">

                                </div>
                                <div className="column">

                                </div>
                                <div className="column">

                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <nav className="mobile-navbar">
                    <ul>
                        <li>
                            <Link to={"/"} className={selected === 'home' ? 'selected' : ''} onClick={() => handleClick('home')}>
                                <HouseIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className={selected === 'eferrals' ? 'selected' : ''} onClick={() => handleClick('referrals')}>
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