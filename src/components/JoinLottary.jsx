import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Notification from "../components/Notification";

const JoinLottary = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

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
                                validate={(values) => { // updated initialValues
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Required';
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                        errors.email = 'Invalid email address';
                                    }
                                    if (!values.tickets) {
                                        errors.tickets = 'Required';
                                    } else if (isNaN(values.tickets) || values.tickets < 1 || values.tickets > 10) {
                                        errors.tickets = 'Invalid number of tickets (1-10)';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    console.log('onSubmit called');
                                    setSubmitting(true);
                                    const userData = JSON.parse(localStorage.getItem('userData'));
                                    const token = userData.token;
                                    axios.post('https://luckyx.cloud/api/v1/user/buy', {
                                        name: userData.name,
                                        email: values.email,
                                        count: values.tickets, // Send the tickets value as the buy parameter
                                    }, {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    })
                                        .then((response) => {
                                            const er = response.data.error
                                            console.log(er)
                                            
                                            if (response.data.code === 499) {
                                                setNotificationMessage(er);
                                                setShowNotification(true);
                                                setTimeout(() => {
                                                    setShowNotification(false);
                                                }, 3000); // Close the notification after 3 seconds

                                                if (!values.tickets || isNaN(parseInt(values.tickets, 10))) {
                                                    setNotificationMessage('Invalid number of tickets');
                                                    setShowNotification(true);
                                                    return;
                                                }
                                            } else {
                                                setNotificationMessage(er);
                                                setShowNotification(true);
                                                setTimeout(() => {
                                                    setShowNotification(false);
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
                                        <Field type="text" name="name" placeholder={userData.name} disabled />
                                        <br />
                                        <Field type="email" name="email" placeholder="Email" />
                                        <ErrorMessage name="email" component="div" />
                                        <br />
                                        <Field type="number" inputMode="numeric" name="tickets" placeholder='10 limit' />
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