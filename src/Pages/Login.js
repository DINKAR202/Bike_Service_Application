import React, { useState } from 'react';  // Import React and useState from 'react'.

import { Toast } from 'react-bootstrap';  // Import the Toast component from 'react-bootstrap'.
import LoginModal from '../Components/LoginAuth/LoginModal';  // Import the LoginModal component.
import infoEmojis from '../images/asset 4.png';  // Import an image.

const Login = () => {
    const [show, setShow] = useState(true);  // Initialize state variable 'show' using the 'useState' hook.

    return (
       <section>
            <Toast className="toast-left" onClose={() => setShow(false)} show={show} delay={10000} autohide>
                <Toast.Header>
                    <img src={infoEmojis} className="rounded mr-2" alt="Info" />  {/* Display an image for the Toast header. */}
                    <strong className="mr-auto">Important Info</strong>  {/* Set the title of the Toast. */}
                </Toast.Header>
                <Toast.Body className="text-center">
                    Use this account to <br /> Sign in as an admin to test the admin panel freely<br /> Or login with a different account as a user.
                </Toast.Body>  {/* Display the main content of the Toast. */}
            </Toast>  {/* Display a Toast component for showing important information. */}
            <LoginModal />  {/* Render the LoginModal component for handling user login. */}
        </section>
    );
};

export default Login;  // Export the Login component.
