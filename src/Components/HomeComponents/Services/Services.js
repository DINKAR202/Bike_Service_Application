// Import necessary dependencies and components
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import spinner from '../../../images/asset 11.gif';
import ServiceDetail from '../ServiceDetail/ServiceDetail';
import './Services.css';

const Services = () => {
    // Define state variables to store services and loading state
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch services data from the server
        axios.get('http://localhost:9090/all-services')
            .then(res => {
                // Set services and update loading state when data is fetched successfully
                setServices(res.data);
                setLoading(false);
            })
            .catch(error => {
                // Set loading state to false and display an error toast in case of an error
                setLoading(false);
                toast.error(error.message);
            });
    }, []);

    return (
        <section className="services" id='service'>
            <Container>
                <h5>What We Do</h5>
                <h3>Services We Provide</h3>
                <Row className="mt-5 justify-content-center">
                    {loading ? ( // Display loading spinner when data is loading
                        <div className="m-auto">
                            <img className='img-fluid' src={spinner} alt="Loading..." />
                        </div>
                    ) : (
                        services.length > 0 ?
                            // Map through services and render ServiceDetail components
                            services.map(service => <ServiceDetail key={service._id} service={service} />)
                            :
                            // Display a message when there are no services
                            <p>Please add the services from the admin panel...</p>
                    )}
                </Row>
            </Container>
        </section>
    );
};

// Export the Services component
export default Services;
