import swal from '@sweetalert/with-react';  // Import the 'swal' library for custom alerts.
import React, { useContext, useEffect, useState } from 'react';  // Import necessary React components and hooks.
import { Button, Modal } from 'react-bootstrap';  // Import Bootstrap components.
import { useForm } from 'react-hook-form';  // Import form handling using 'react-hook-form'.
import toast from 'react-hot-toast';  // Import toast notifications.
import { useHistory, useLocation } from 'react-router-dom';  // Import history and location hooks.
import { UserContext } from '../../App';  // Import user context.
import {
    createUserWithEmailAndPassword,
    handleGoogleSignIn,
    handleSignOut,
    initializeLoginFramework,
    setJWTToken,
    signInWithEmailAndPassword
} from './LoginManager';  // Import authentication and user management functions.
import './LoginModal.css';  // Import CSS styling for the login modal.

const LoginModal = () => {
    const { setLoggedInUser } = useContext(UserContext);  // Access the user context.
    const [showModal, setShowModal] = useState(false);  // State for showing the login modal.
    const [newUser, setNewUser] = useState(false);  // State for new user registration.

    const { register: registerSignIn, handleSubmit: handleSignIn } = useForm();  // Form handling for sign-in.
    const { register: registerSignUp, handleSubmit: handleSignUp } = useForm();  // Form handling for sign-up.

    const history = useHistory();  // Access the history object.
    const { pathname, ...location } = useLocation();  // Access the current location.
    const { from } = location.state || { from: { pathname: "/" } };  // Determine the 'from' path for redirection.

    useEffect(() => pathname === '/login' && setShowModal(true), [pathname]);  // Display the modal when the path is '/login'.

    const googleSignIn = () => {
        initializeLoginFramework();  // Initialize the login framework.
        const loading = toast.loading('Please wait...');  // Display a loading toast.
        handleGoogleSignIn()  // Perform Google sign-in.
            .then(res => {
                toast.dismiss(loading);  // Dismiss the loading toast.
                handleResponse(res);  // Handle the authentication response.
            })
            .catch(err => {
                toast.dismiss(loading);  // Dismiss the loading toast in case of an error.
                toast.error(err.message);  // Display an error toast.
            });
    }

    const onSubmit = (data) => {
        initializeLoginFramework();  // Initialize the login framework.
        const loading = toast.loading('Please wait...');  // Display a loading toast.
        const { name, email, password } = data;  // Extract user data from the form.

        if (newUser && name && email && password) {  // If it's a new user and the data is valid:
            createUserWithEmailAndPassword(name, email, password)  // Create a new user with email and password.
                .then(res => {
                    res.name = name;  // Add the user's name to the response.
                    toast.dismiss(loading);  // Dismiss the loading toast.
                    handleResponse(res);  // Handle the authentication response.
                })
                .catch(err => {
                    toast.dismiss(loading);  // Dismiss the loading toast in case of an error.
                    toast.error(err.message);  // Display an error toast.
                });
        }

        if (!newUser && email && password) {  // If it's an existing user and the data is valid:
            signInWithEmailAndPassword(email, password)  // Sign in with email and password.
                .then(res => {
                    toast.dismiss(loading);  // Dismiss the loading toast.
                    handleResponse(res);  // Handle the authentication response.
                })
                .catch(err => {
                    toast.dismiss(loading);  // Dismiss the loading toast in case of an error.
                    toast.error(err.message);  // Display an error toast.
                });
        }
    }

    const handleResponse = (res) => {
        setLoggedInUser(res);  // Set the logged-in user in the context.
        setJWTToken();  // Set the JWT token.
        setShowModal(false);  // Close the login modal.
        history.replace(from);  // Redirect to the 'from' path.
        toast.success('Successfully Logged In!');  // Display a success toast.
        if (res.email === "demo@admin.com") {
            swal({
                title: "Warning!",  // Display a warning dialog for admin users.
                content: (
                    <p>
                        You have entered the admin panel.
                    </p>
                ),
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(ok => {
                if (!ok) {
                    handleSignOut()
                        .then(res => {
                            setLoggedInUser(res);
                            toast.error('Logged Out!');
                        });
                }
            });
        }
    }

    return (
        <Modal
            show={showModal}
            onHide={() => {
                setShowModal(false);
                history.replace({ pathname: "/" });
            }}
            size="lg"
            centered
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <div className={newUser ? "cont s--signup" : "cont"}>
                    <div className="form sign-in">
                        <h2>Sign in</h2>
                        <form onSubmit={handleSignIn(onSubmit)}>
                            <label>
                                <span>Email</span>
                                <input
                                    defaultValue="demo@admin.com"
                                    {...registerSignIn("email", { required: true })}
                                    type="email"
                                />
                            </label>
                            <label>
                                <span>Password</span>
                                <input
                                    defaultValue="123698"
                                    {...registerSignIn("password", { required: true })}
                                    type="password"
                                />
                            </label>
                            <p className="forgot-pass">Forgot password?</p>
                            <Button type="submit" variant="info" className="submit">
                                Sign In
                            </Button>
                            <button
                                type="button"
                                onClick={googleSignIn}
                                className="fb-btn"
                            >
                                Connect with <span>Google</span>
                            </button>
                        </form>
                    </div>
                    <div className="sub-cont">
                        <div className="img">
                            <div className="img__text m--up">
                                <h2>New here?</h2>
                                <p>
                                    Sign up and discover a great amount of new opportunities!
                                </p>
                            </div>
                            <div className="img__text m--in">
                                <h2>One of us?</h2>
                                <p>If you already have an account, just sign in. We've missed you!</p>
                            </div>
                            <div
                                onClick={() => setNewUser(!newUser)}
                                className="img__btn"
                            >
                                <span className="m--up">Sign Up</span>
                                <span className="m--in">Sign In</span>
                            </div>
                        </div>
                        <div className="form sign-up">
                            <h2>Create Account</h2>
                            <form onSubmit={handleSignUp(onSubmit)}>
                                <label>
                                    <span>Name</span>
                                    <input {...registerSignUp("name", { required: true })} type="text" />
                                </label>
                                <label>
                                    <span>Email</span>
                                    <input {...registerSignUp("email", { required: true })} type="email" />
                                </label>
                                <label>
                                    <span>Password</span>
                                    <input {...registerSignUp("password", { required: true })} type="password" />
                                </label>
                                <Button type="submit" variant="info" className="mt-5">
                                    Sign Up
                                </Button>
                                <button
                                    type="button"
                                    onClick={googleSignIn}
                                    className="fb-btn mt-3"
                                >
                                    Join with <span>Google</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
