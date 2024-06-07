import React, { useState } from 'react';

const SIgnUp = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowSignUp(false);
        document.querySelector('.login__bod2').classList.add('show');
    };

    const handleSignUpClick = () => {
        setShowLogin(false);
        setShowSignUp(true);
        document.querySelector('.login__bod').classList.add('show');
    };

    return (
        <div className="Login">
            <span className='button'>back</span>


            <div className={`login__bod2 ${showLogin ? '' : 'hide'}`}>
                <h3 className='has-text-dark'>Create</h3>
                <h3 className='has-text-dark'>account</h3>
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
                <button disabled style={{ backgroundColor: '#00455B', cursor: 'not-allowed' }}>Sign up</button>
                <button onClick={handleSignUpClick} className='mt-4'>Login</button>
            </div>

            <div className={`login__bod ${showSignUp ? '' : 'hide'}`}>
                <div className='has-text-centered'>
                    <img src="./assets/images/login-i.jpg" style={{ borderRadius: 100 }} width={150} height={150} />
                    <h3 className='has-text-light has-text-centered'>welcome back</h3>
                </div>

                <div className="login-form mt-6">
                    <div className="input-container ">
                        <label className="input-label">email</label>
                        <input className="input-field" type="text" />
                    </div>

                    <div className="input-container">
                        <label className="input-label">Password</label>
                        <input className="input-field" type="password" />
                    </div>
                </div>
                <button className='mb-4' disabled style={{ backgroundColor: '#00455B', cursor: 'not-allowed' }}>Login</button>
                <button onClick={handleLoginClick} style={{ backgroundColor: '#fff', color: '#000' }}>Sign Up</button>
            </div>
        </div>
    );
};

export default SIgnUp;