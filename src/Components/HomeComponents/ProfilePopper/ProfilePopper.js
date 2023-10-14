// Import necessary dependencies and components
import React, { useContext } from 'react';
import { Button, Image, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { UserContext } from '../../../App';
import { handleSignOut, initializeLoginFramework } from '../../LoginAuth/LoginManager';

const ProfilePopper = () => {
    // Access the user context and destructure user data
    const { loggedInUser: { name, email, photo }, setLoggedInUser } = useContext(UserContext);

    // Function to handle user sign-out
    const signOut = () => {
        // Initialize the login framework and perform sign-out
        initializeLoginFramework();
        handleSignOut()
            .then(res => {
                // Update the user context after sign-out
                setLoggedInUser(res);
                // Show a toast message indicating successful sign-out
                toast.error('Logged Out!');
            });
    }

    return (
        // OverlayTrigger to create a pop-up popover for user profile
        <OverlayTrigger trigger="click" rootClose key="bottom" placement="bottom"
            overlay={
                <Popover id="popover-positioned-bottom">
                    <div className="d-flex justify-content-center">
                        <Image style={{ maxWidth: "60px", border: '1px solid #17a2b8' }} src={photo} roundedCircle />
                    </div>
                    <Popover.Content>
                        <strong className="text-center d-block">{name}</strong>
                        <strong className="text-center d-block">{email}</strong>
                        <div className="d-flex justify-content-center mt-1">
                            {/* Button to trigger the sign-out process */}
                            <Button onClick={signOut} variant="outline-info" className="py-0 px-1" size="sm">Logout</Button>
                        </div>
                    </Popover.Content>
                </Popover>
            }
        >
            {/* User profile image with OverlayTrigger */}
            <Nav.Link className="p-0">
                <Image style={{ border: '1px solid #17a2b8' }} src={photo} width="40" height="40" roundedCircle className="d-inline-block align-top" alt="..." />
            </Nav.Link>
        </OverlayTrigger>
    );
};

// Export the ProfilePopper component
export default ProfilePopper;
