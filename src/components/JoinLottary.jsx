import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Link, Navigate, useNavigate  } from 'react-router-dom';
import Notification from "../components/Notification";

const JoinLottary = () => {
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [token, setToken] = useState(null); // Initialize token state
    const [expiresAt, setExpiresAt] = useState(null);
    const [userData, setUserData] = useState(null);
    const [selected, setSelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

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
  
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        console.log('Local storage:', localStorage.getItem('userData'));
        // if (storedUserData) {
        //   const userDataJson = JSON.parse(storedUserData);
        //   const storedToken = userDataJson.token;
      
        //   if (storedToken !== token) {
        //     // If the token has changed, redirect to login page and clear local storage
        //     console.log('Token has changed, logging out...');
        //     localStorage.removeItem('userData');
        //     navigate('/login', { replace: true });
        //   } else {
        //     setUserData(userDataJson);
        //     setToken(userDataJson.token);
        //     setExpiresAt(userDataJson.expiresAt);
        //   }
        // } else {
        //   // If no user data is found in local storage, redirect to login page
        //   navigate('/login', { replace: true });
        // }
      }, [token]);

    return (
        <>
            <main className='lotery_join_page'>

                <Link to={'/'} >
                    <span style={{ position: 'absolute', left: 5, top: 5 }} className='button'>back</span>
                </Link>
                <div className="container">
                    <div className="columns join_lot">
                        <div className="column is-4">
                            <h2 className="title">Create Lottery</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br /> Blanditiis atque voluptatem nihil </p>
                            <Formik
                                initialValues={{ name: '', email: '', tickets: '' }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.tickets) {
                                        errors.tickets = 'Required';
                                    } else if (isNaN(parseInt(values.tickets, 2)) || parseInt(values.tickets, 2) < 1 || parseInt(values.tickets, 2) > 2) {
                                        setNotificationMessage('Invalid number of tickets (1-2)');
                                        setShowNotification(true);
                                        setTimeout(() => {
                                            setShowNotification(false);
                                        }, 3000);
                                    }
                                    if (!values.email) {
                                        errors.email = 'Required';
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                        errors.email = 'Invalid email address';
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    console.log('Input values:', values);
                                    setSubmitting(true);
                                    const formData = new FormData();
                                    formData.append('name', values.name);
                                    formData.append('email', values.email);
                                    formData.append('count', parseInt(values.tickets, 2));

                                    setSubmitting(true);
                                    const userData = JSON.parse(localStorage.getItem('userData'));
                                    const token = userData.token;
                                    axios.post('https://luckyx.cloud/api/v1/user/buy', formData, {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                            'Content-Type': 'multipart/form-data',
                                        },
                                    })
                                        .then((response) => {
                                            const er = response.data.error
                                            console.log(response)

                                            if (response.data.code === 499) {
                                                console.log(response)
                                                setNotificationMessage(er);
                                                setShowNotification(true);
                                                setTimeout(() => {
                                                    setShowNotification(false);
                                                }, 3000); // Close the notification after 3 seconds




                                            } else if (!values.tickets || isNaN(parseInt(values.tickets, 10))) {
                                                setNotificationMessage(er);
                                                setShowNotification(true);
                                                return;
                                            } else if (response.data.code === 404) {
                                                setNotificationMessage(er);
                                                setShowNotification(true);
                                                setTimeout(() => {
                                                    setShowNotification(false);
                                                }, 3000); // Close the notification after 3 seconds
                                            }

                                            else if (response.data.code === 1) {
                                                setNotificationMessage('successfuly buy');
                                                setShowNotification(true);
                                                setTimeout(() => {
                                                    setShowNotification(false);
                                                    navigate('/latary', { replace: true }); // Redirect to /latary page
                                                  }, 2000); // Close the notification and redirect after 2 seconds
                                            }
                                            else if (response.data.code === 403) {
                                                setNotificationMessage('Token axpired, Login again')
                                                setShowNotification(true);
                                                setTimeout(() => {
                                                    localStorage.removeItem('userData');
                                                    navigate('/login', { replace: true });
                                                }, 3000); // Close the notification after 3 seconds
                                            }
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                            setNotificationMessage('Error: ' + error.message);
                                            setShowNotification(true);
                                        })
                                        .finally(() => {
                                            setSubmitting(false);
                                        });

                                }}
                            >
                                {({ isSubmitting }) => (

                                    <Form>
                                        <Field type="text" name="name" value={userData? userData.name : ''} disabled />
                                        <br />
                                        <Field type="email" name="email" placeholder="Email" />
                                        <ErrorMessage name="email" component="div" />
                                        <br />
                                        <Field type="number" inputMode="numeric" name="tickets" placeholder='2 limit' />
                                        <span style={{ color: '#fff' }}>1 ticket = 100 TRX</span>
                                        <br />
                                        <button type="submit" disabled={isSubmitting}>
                                            Join
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div className="column mobile_none is-7">
                            <img src="../assets/images/lottery.png" alt="Lottery Image" />
                        </div>
                    </div>
                </div>
            </main >
            <Notification message={notificationMessage} open={showNotification} />
        </>
    );
};

export default JoinLottary;