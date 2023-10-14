import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';  // Import an arrow icon.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesome icon component.
import React from 'react';  // Import the React library.
import { Button } from 'react-bootstrap';  // Import a Bootstrap button component.

const goBack = () => window.history.back();  // Define a function to navigate back in the browser's history.

const NotFound = () => {  // Define the NotFound component.
    return (
        <div className="d-flex align-items-center justify-content-center text-center" style={{ height: "100vh" }}>
            <div style={{ border: '1px solid gray', padding: '30px' }}>
                <h1 className="display-1">404</h1>  {/* Display a large "404" text. */}
                <p className="lead">Page Not Found</p>  {/* Display a message indicating the page is not found. */}
                <Button variant='info' onClick={goBack} className="brand-btn" to="/">  {/* Display a button to go back to the home page. */}
                    <FontAwesomeIcon className="mr-2" icon={faArrowLeft} /> Back To Home  {/* Display an arrow icon and the "Back To Home" text. */}
                </Button>
            </div>
        </div>
    );
};

export default NotFound;  // Export the NotFound component.
