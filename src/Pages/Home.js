import React from 'react';
import About from '../Components/HomeComponents/About/About';
import Benefits from '../Components/HomeComponents/Benefits/Benefits';
import Contact from '../Components/HomeComponents/Contact/Contact';
import Copyright from '../Components/HomeComponents/Footer/Copyright';
import Footer from '../Components/HomeComponents/Footer/Footer';
import Header from '../Components/HomeComponents/Header/Header';
import OurTeam from '../Components/HomeComponents/OurTeam/OurTeam';
import OurWark from '../Components/HomeComponents/OurWork/OurWark';
import Services from '../Components/HomeComponents/Services/Services';
import Testimonials from '../Components/HomeComponents/Testimonials/Testimonials';

// Define the Home component
const Home = () => {
    return (
        <main>
            {/* Render the Header component */}
            <Header />

            {/* Render the About component */}
            <About />

            {/* Render the OurTeam component */}
            <OurTeam />

            {/* Render the Services component */}
            <Services />

            {/* Render the OurWork component */}
            <OurWark />

            {/* Render the Benefits component */}
            <Benefits />

            {/* Render the Testimonials component */}
            <Testimonials />
            
            {/* Render the Contact component */}
            <Contact />

            {/* Render the Footer component */}
            <Footer />

            {/* Render the Copyright component */}
            <Copyright/>
        </main>
    );
};

// Export the Home component
export default Home;
