import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const Login = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setIsButtonDisabled(false);
        setTimer(null);
    };

    const handleSendEmail = () => {
        // ارسال ایمیل فراموشی رمز عبور به سرور
        console.log("Sending email to", email);

        // شروع تایمر
        setIsButtonDisabled(true);
        setTimer(60);
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        // توقف تایمر پس از 60 ثانیه
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

    return (
        <div className="Login">
            <Link to={"/"}>
                <span className="button">back</span>
            </Link>

            <div className={`login__bod ${showLogin ? "" : "hide"}`}>
                <div className="has-text-centered">
                    <img
                        src="./assets/images/login-i.jpg"
                        style={{ borderRadius: 100 }}
                        width={150}
                        height={150}
                    />
                    <h3 className="has-text-light has-text-centered">welcome back</h3>
                </div>
                <div className="login-form mt-6">
                    <div className="input-container ">
                        <label className="input-label">email</label>
                        <input className="input-field" type="text" />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Password</label>
                        <input className="input-field" type="password" />
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
                                        style={{padding: 10}}
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
                                <footer className="modal-card-foot" style={{padding: 10}}>
                                    <button
                                        onClick={handleSendEmail}
                                        className="button is-primary"
                                        disabled={isButtonDisabled}
                                        style={{display: 'block', position: 'relative', top: 0, left: 0, padding: 20}}
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
                    disabled
                    style={{ backgroundColor: "#00455B", cursor: "not-allowed" }}
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
                <h3 className="has-text-dark">Create</h3>
                <h3 className="has-text-dark">account</h3>
                <div className="SignUp mt-6">
                    <div className="input-container ">
                        <label className="input-label">Username</label>
                        <input className="input-field" type="text" />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Email</label>
                        <input className="input-field" type="email" />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Password</label>
                        <input className="input-field" type="password" />
                    </div>
                </div>
                <button
                    disabled
                    style={{ backgroundColor: "#00455B", cursor: "not-allowed" }}
                >
                    Sign up
                </button>
                <button
                    onClick={handleSignUpClick}
                    style={{ backgroundColor: "#338db7" }}
                    className="mt-4"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
