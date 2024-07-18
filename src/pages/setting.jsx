import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; 
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Notification from "../components/Notification";


export default function Setting() {
    const [selected, setSelected] = useState(null);

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


    const [user, setUser] = useState({}); // initialize with an empty object
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newAvatar, setNewAvatar] = useState(null);

    useEffect(() => {
        axios.get('https://luckyx.cloud/api/v1/user/profile')
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const [openModal, setOpenModal] = useState(false);

    const handleUpdateProfile = () => {
        if (!newName && !newEmail && !newAvatar) {
            alert('Please fill in at least one field to update your profile.');
            return;
        }

        const formData = new FormData();
        if (newName) formData.append('name', newName);
        if (newEmail) formData.append('email', newEmail);
        if (newAvatar) formData.append('avatar', newAvatar);

        axios.post('https://luckyx.cloud/api/v1/user/editprofile', formData, {
            headers: {
                Authorization: `Bearer ${userData.token}`,
                'Content-Type': 'ultipart/form-data',
            },
        })
            .then(response => {
                console.log(response.data);
                setUser({
                    ...userData,
                    name: newName || userData.name,
                    email: newEmail || userData.email,
                    avatar: newAvatar ? URL.createObjectURL(newAvatar) : userData.avatar,
                });

                // Update userData in local storage
                const updatedUserData = {
                    ...userData,
                    name: newName || userData.name,
                    email: newEmail || userData.email,
                    avatar: newAvatar ? URL.createObjectURL(newAvatar) : userData.avatar,
                };

                setOpenModal(true); // open the modal
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        // Update userData in local storage
        const updatedUserData = {
            ...userData,
            name: newName,
            email: newEmail,
            password: newPassword,
            avatar: newAvatar ? URL.createObjectURL(newAvatar) : userData.avatar,
        };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
    };

    const handleAvatarChange = (e) => {
        setNewAvatar(e.target.files[0]);
    };

    const [oldPassword, setOldPassword] = useState('');

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const [passwordChanged, setPasswordChanged] = useState(false);

    const handlePasswordChange = async () => {
        if (oldPassword && newPassword) {
          try {
            const token = userData.token;
            const formData = new FormData();
            formData.append('oldpassword', oldPassword);
            formData.append('password', newPassword);
      
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              },
            };
      
            const response = await axios.post('https://luckyx.cloud/api/v1/user/password', formData, config);
            console.log(response.data.code)
            if (response.data.code === 104) {
                // Show error notification
                setNotificationMessage(response.data.error);
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 4000)
            } else {
                // Show success notification and refresh page
                setNotificationMessage('Password changed successfully!');
                setShowNotification(true);
                setTimeout(() => {
                    window.location.reload();
                }, 2000); // Refresh page after 2 seconds
            }
            console.log(response.data); // <- log the response data
          } catch (error) {
            console.error(error);
          }
        }
      };
    const navigate = useNavigate();
    const [token, setToken] = useState(null); // Initialize token state
    const [expiresAt, setExpiresAt] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

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


    return (
        <>
            <Notification message={notificationMessage} open={showNotification} />
            <header>
                <Header />
            </header>
            <main>

                <div className="profile-modal">
                    <h2 className="title">Profile</h2>
                    <div className="profile-info">
                        <p className="label">Name:</p>
                        <input
                            type="text"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            placeholder="New name"
                            className="input-field"
                        />
                        <p className="label">Email:</p>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={e => setNewEmail(e.target.value)}
                            placeholder="New email"
                            className="input-field"
                        />
                        
                        <p className="label">Avatar:</p>
                        <img src={userData.avatar} alt="Avatar" className="avatar" />
                        <input
                            type="file"
                            onChange={handleAvatarChange}
                            className="input-field"
                        />
                        <button onClick={handleUpdateProfile} className="update-btn">
                            Update Profile
                        </button>
                    </div>
                    <br />
                    <div className="password-change">
                            <h2 className="label">Change Password</h2>
                            <input
                                type="password"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={handleOldPasswordChange}
                                className="input-field"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                className="input-field"
                            />
                            <button  className="update-btn" onClick={handlePasswordChange}>Change Password</button>
                            
                        </div>

                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: '#000',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}>
                            <Typography id="modal-title" variant="h6" component="h2">
                                Profile Updated Successfully!
                            </Typography>
                            <Typography id="modal-description" sx={{ mt: 2 }}>
                                Your profile information has been updated successfully.
                            </Typography>
                        </Box>
                    </Modal>
                </div>



                <nav className="mobile-navbar">
                    <ul>
                        <li>
                            <Link to={"/"} className={selected === 'home' ? 'selected' : ''} onClick={() => handleClick('home')}>
                                <img alt="icon" src="../assets/icon/homepn.png" width={40} className="mobileMenu_icons" />
                                {/* <HouseIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} /> */}
                            </Link>
                        </li>

                        <li>
                            <Link to="/latary" className={selected === 'lotarry' ? 'selected' : ''} onClick={() => handleClick('lottery')}>
                                <img alt="icon" src="../assets/icon/lottery.png" width={50} className="mobileMenu_icons" />
                                {/* <HowToVoteIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} /> */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/Profile" className={selected === 'Profile' ? 'selected' : ''} onClick={() => handleClick('Profile')}>
                                <img alt="icon" src="../assets/icon/data-management.png" width={50} className="mobileMenu_icons" />
                                {/* <AccountCircleIcon sx={{ fontSize: 30 }} /> */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/wallet" className={selected === 'Profile' ? 'selected' : ''} onClick={() => handleClick('Wallet')}>
                                <img alt="icon" src="../assets/icon/wallet.png" width={50} className="mobileMenu_icons" />
                                {/* <AccountBalanceWalletIcon className="mobileMenu_icons" sx={{ fontSize: 30 }} /> */}
                            </Link>
                        </li>

                    </ul>

                </nav>
            </main>
        </>
    )



}