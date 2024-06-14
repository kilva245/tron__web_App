import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const JoinLottary = () => {
    return (

        <main className='lotery_join_page'>
            <div className="container">
                <div className="columns join_lot">
                    <div className="column is-4">
                        <h2 className="title">Create Lottery</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br /> Blanditiis atque voluptatem nihil </p>
                        <Formik
                            initialValues={{ name: '', tickets: 1 }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = 'Required';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                // submit logic here
                                console.log(values);
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <Field type="text" name="name" placeholder="Name" />
                                    <ErrorMessage name="name" component="div" />
                                    <br />
                                    <Field type="number" name="tickets" value={1} disabled />
                                    <span> ($10)</span>
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
        </main>
    );
};

export default JoinLottary;