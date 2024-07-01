import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TelegramIcon from '@mui/icons-material/Telegram';
import GroupsIcon from '@mui/icons-material/Groups';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LogoutIcon from '@mui/icons-material/Logout';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Setting() {
    const [selected, setSelected] = useState(null);

    const handleClick = (item) => {
        setSelected(item);
    };

    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }

        setIsMenuClicked(!isMenuClicked)
    }

    const close1 = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(false)
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [joinedUsersCount, setJoinedUsersCount] = useState(1);

    useEffect(() => {
        function handleUserJoined() {
            setJoinedUsersCount(prevCount => prevCount + 1);
        }
    }, []);

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
        const formData = new FormData();
        formData.append('name', newName);
        formData.append('email', newEmail);
        formData.append('password', newPassword);
        if (newAvatar) {
            formData.append('avatar', newAvatar);
        }

        axios.post('https://luckyx.cloud/api/v1/user/editprofile', formData, {
            headers: {
                Authorization: `Bearer ${userData.token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log(response.data);
                setUser({
                    ...userData,
                    name: newName,
                    email: newEmail,
                    password: newPassword,
                    avatar: newAvatar ? URL.createObjectURL(newAvatar) : userData.avatar,
                });

                // Update userData in local storage
                const updatedUserData = {
                    ...userData,
                    name: newName,
                    email: newEmail,
                    password: newPassword,
                    avatar: newAvatar ? URL.createObjectURL(newAvatar) : userData.avatar,
                };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));

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
    const [passwordChanged, setPasswordChanged] = useState(false);

    const handlePasswordChange = async () => {
        if (oldPassword && newPassword) {
          try {
            const token = userData.token;
            const response = await fetch('https://luckyx.cloud/api/v1/user/Password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
              }),
            });
            const data = await response.json();
            if (data.success) {
              setPasswordChanged(true);
            } else {
              alert('Error changing password');
            }
          } catch (error) {
            console.error(error);
          }
        }
      };



    return (
        <>
            <header>
                <Header />
            </header>
            <main>

                <div className="profile-modal">
                    <h2 className="title">Profile</h2>
                    <div className="profile-info">
                        <p className="label">Name:</p>
                        <p className="value">{userData.name}</p>
                        <input
                            type="text"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            placeholder="New name"
                            className="input-field"
                        />
                        <p className="label">Email:</p>
                        <p className="value">{userData.email}</p>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={e => setNewEmail(e.target.value)}
                            placeholder="New email"
                            className="input-field"
                        />
                        <div className="password-change">
                            <h2 className="label">Change Password</h2>
                            <input
                                type="password"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="input-field"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="input-field"
                            />
                            <button style={{color: 'yellow'}} onClick={handlePasswordChange}>Change Password</button>
                            {passwordChanged && <p>Password changed successfully!</p>}
                        </div>
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
    )



}