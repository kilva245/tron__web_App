import { Redirect, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';





export default function Header() {
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


    return (

        <>


            <nav className="navbar" role="navigation" aria-label="main navigation">

                <div id="navbarBasicExample" className="navbar-menu">
                    <img src="../assets/images/logo.png" width={80} alt="" />
                    <div className="navbar-start">
                        <Link to={'/'} className="navbar-item">
                            Home
                        </Link>

                        <Link to={'/latary'} className="navbar-item">
                            Lottary
                        </Link>

                        <Link to={'/ref'} className="navbar-item">
                            referral
                        </Link>

                        <Link to={'/profile'} className="navbar-item">
                            profile
                        </Link>

                        <Link to={'/referral-code'} className="navbar-item">
                            Invite friend
                        </Link>

                        <Link to={'/wallet'} className="navbar-item">
                            wallet
                        </Link>

                        <Link to={'/setting'} className="navbar-item">
                            setting
                        </Link>


                    </div>



                    <div className="navbar-end">
                        {isLoggedIn ? (
                            <div className="navbar-item">
                                <div className="profile-icon">
                                    <Link to={'/profile'}>
                                        <AccountCircleIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} />
                                    </Link>
                                </div>
                                <div className="logout-icon">
                                    <a onClick={handleLogout}>
                                    <LogoutIcon style={{ color: '#fff', fontSize: 24, marginRight: 10 }} />
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="navbar-item">
                                <div className="buttons">
                                    <div class="buttonn">
                                        <Link to={'/sign-up'} class="btnn fx01">
                                            <span>Sign up</span>
                                        </Link>
                                    </div>
                                    <div class="buttonn">
                                        <Link href="#" to={'/Login'} class="btnn fx01">
                                            <span>Log in</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>



        </>


    )
}