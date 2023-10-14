// Import necessary dependencies and components
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { UserContext } from '../../../App';
import logo from '../../../images/asset 0.png';
import ProfilePopper from '../ProfilePopper/ProfilePopper';

// Define the NavBar component responsible for rendering the navigation bar
const NavBar = () => {
  const { loggedInUser: { isSignedIn } } = useContext(UserContext);  // Access the user's sign-in status from the context
  const [isSticky, setSticky] = useState(false);  // Define a state variable for tracking whether the navigation bar is sticky
  const [isCollapsed, setCollapsed] = useState(null);  // Define a state variable for tracking the collapse state of the navbar

  // Add an event listener to track the scroll position and update the sticky state
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setSticky(true);  // Make the navigation bar sticky when the scroll position exceeds 50
      } else {
        setSticky(false);  // Remove sticky behavior when the scroll position is less than or equal to 50
      }
    });
  }, []);

  return (
    // Render the Bootstrap navigation bar
    <Navbar expand="lg" className={ (isSticky || isCollapsed) ? "slide in py-2 show shadow-sm navbar navbar-expand-md bg-white navbar-light fixed-top" : "slide out show navbar navbar-expand-nd navbar-light py-2 fixed-top "}>
      <Container>
        <Navbar.Brand smooth as={HashLink} to="#home"  >
          <Image style={{ height: '33px', width: '43px' }} src={logo} />
          <strong>Bike Service Center</strong>
        </Navbar.Brand>
        <Navbar.Toggle onClick={  () => setCollapsed(!isCollapsed ? 'show' : null )} aria-controls="basic-navbar-nav"  style={{background:'#10bad4'}} />
        <Navbar.Collapse id="navbar-nav" >
          <Nav className="ml-auto text-center">
            <Nav.Link smooth as={HashLink} to="#home" className="mr-3"><strong>Home</strong></Nav.Link>
            <Nav.Link smooth as={HashLink} to="#about" className="mr-3"><strong>About</strong></Nav.Link>
            <Nav.Link smooth as={HashLink} to="#service" className="mr-3"><strong>Service</strong></Nav.Link>
            <Nav.Link smooth as={HashLink} to='#reviews' className="mr-3"><strong>Reviews</strong></Nav.Link>
            <Nav.Link smooth as={HashLink} to="#contact" className="mr-3"><strong>Contact</strong></Nav.Link>
            <Nav.Link as={Link} to="/dashboard/profile" className="mr-3"><strong>Dashboard</strong></Nav.Link>
            {
              isSignedIn ?  <ProfilePopper /> : <Button as={Link} to='/login' variant="info" className='main-button'>Login</Button>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Export the NavBar component
export default NavBar;
