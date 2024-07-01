import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Modal from "react-modal";
import axios from 'axios';
import Notification from "../components/Notification";

const Login = () => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);


    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setIsButtonDisabled(false);
        setTimer(null);
    };

    const handleSendEmail = () => {

        setIsButtonDisabled(true);
        setTimer(60);
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(intervalId);
            setIsButtonDisabled(false);
            setTimer(null);
        }, 60000);
    };

    const handleLoginClick = () => {
        setShowLogin(false);
        setShowSignUp(true);
        document.querySelector(".login__bod2").classList.add("show");
    };

    const handleSignUpClick = () => {
        setShowLogin(true);
        setShowSignUp(false);
        document.querySelector(".login__bod").classList.add("show");
    };

    const [email2, setEmail2] = useState('');
    const [password2, setPassword2] = useState('');



    const loginn = async (event) => {

        const formData = new FormData();
        formData.append('email', email2);
        formData.append('password', password2);
        event.preventDefault();
        axios.post('https://luckyx.cloud/api/v1/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                if (response.data.code === 1) {
                    const userData = response.data.user;
                    localStorage.setItem('userData', JSON.stringify(userData));
                    navigate('/profile', { replace: true });
                    setNotificationMessage('Profile updated successfully!');
                    setShowNotification(true);
                    setTimeout(() => {
                        setShowNotification(false);
                    }, 3000); // Close the notification after 3 seconds
                } else {
                    setNotificationMessage('Invalid email or password');
                    setShowNotification(true);
                    setTimeout(() => {
                        setShowNotification(false);
                    }, 3000); // Close the notification after 3 seconds
                }
            });
    };

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [wallet, setWallet] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [error, setError] = useState('');

    const Signupp = () => {
        if (!name || !email || !password || !wallet || !referralCode) {
            setNotificationMessage('Please fill in all the required fields');
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000); // Close the notification after 3 seconds
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('wallet', wallet);
        formData.append('referralCode', referralCode);

        axios.post('https://luckyx.cloud/api/v1/register', formData, {
            headers: {
                'Content-Type': 'ultipart/form-data',
            },
        })
            .then(response => {
                const code = response.data.code;
                setError(code);
                if (code === 'success' || code === 'user_created') {
                    window.location.href = '/profile';
                }
            })
            .catch(error => {
                // console.error(error);
            });
    };

    return (
        <div className="Login">
            <Notification message={notificationMessage} open={showNotification} />
            <Link to={"/"}>
                <span className="button">back</span>
            </Link>
            <div onSubmit={loginn} className={`login__bod ${showLogin ? "" : "hide"}`}>
                <div className="has-text-centered">
                    <img
                        src="./assets/images/picw.png"
                        style={{ borderRadius: 100 }}
                        width={150}
                        height={150}
                    />
                    <h3 className="has-text-light has-text-centered">welcome back</h3>
                </div>
                <div className="login-form mt-6">
                    <div className="input-container ">
                        <label className="input-label">email</label>
                        <input
                            className="input-field"
                            type="text"
                            value={email2}
                            onChange={(e) => setEmail2(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Password</label>
                        <input
                            className="input-field"
                            type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <a
                            href="#"
                            onClick={handleOpenModal}
                            style={{
                                position: "relative",
                                top: 10,
                                color: "#000",
                                fontWeight: "bold",
                                fontSize: 20
                            }}
                        >
                            Forgot Password
                        </a>
                        <div className={`modal ${isOpen ? "is-active" : ""}`}>
                            <div className="modal-background" onClick={handleCloseModal} />
                            <div className="modal-card">
                                <header className="modal-card-head">
                                    <p className="modal-card-title">Forgot Password</p>
                                    <button
                                        className="delete"
                                        aria-label="close"
                                        onClick={handleCloseModal}
                                        style={{ padding: 10 }}
                                    />
                                </header>
                                <section className="modal-card-body">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="input"
                                    />
                                </section>
                                <footer className="modal-card-foot" style={{ padding: 10 }}>
                                    <button
                                        onClick={handleSendEmail}
                                        className="button is-primary"
                                        disabled={isButtonDisabled}
                                        style={{ display: 'block', position: 'relative', top: 0, left: 0, padding: 20 }}
                                    >
                                        {timer !== null
                                            ? `Resend code in ${timer} seconds`
                                            : "Get Code"}
                                    </button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="mb-4"
                    onClick={loginn}
                    style={{ backgroundColor: "#00455B" }}
                >
                    Login
                </button>
                <button
                    onClick={handleLoginClick}
                    style={{ backgroundColor: "#338db7" }}
                >
                    Sign Up
                </button>
            </div>

            <div className={`login__bod2 ${showSignUp ? "" : "hide"}`}>
                <h3 className='has-text-dark'>Create</h3>
                <h3 className='has-text-dark'>account</h3>
                <div className='has-text-centered' style={{ color: 'red' }}>{error}</div>
                <div className="SignUp mt-6">
                    <div className="input-container">
                        <label className="input-label">Name</label>
                        <input
                            className="input-field"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Email</label>
                        <input
                            className="input-field"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Password</label>
                        <input
                            className="input-field"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Wallet</label>
                        <input
                            className="input-field"
                            type="text"
                            value={wallet}
                            onChange={e => setWallet(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Referral code</label>
                        <input
                            className="input-field"
                            type="text"
                            value={referralCode}
                            onChange={e => setReferralCode(e.target.value)}
                        />
                    </div>
                </div>

                <button onClick={Signupp} style={{ backgroundColor: '#00455B' }}>Sign up</button>
                <button onClick={handleSignUpClick} className='mt-4' style={{ color: '#000' }}>Login</button>
            </div>
        </div>
    );
};

export default Login;
