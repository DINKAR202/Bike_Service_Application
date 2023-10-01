import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import spinner from '../../../images/asset 11.gif';
import ServiceDetail from '../ServiceDetail/ServiceDetail';
import './Services.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        axios.get('https://moto-repair.herokuapp.com/all-services')
            .then(res => {
                setServices(res.data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                setLoading(false); // Set loading to false in case of error
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
                            services.map(service => <ServiceDetail key={service._id} service={service} />)
                            :
                            <p>Please add the services from admin panel...</p> // Display a message if no services are available
                    )}
                </Row>
            </Container>
        </section>
    );
};

export default Services;
