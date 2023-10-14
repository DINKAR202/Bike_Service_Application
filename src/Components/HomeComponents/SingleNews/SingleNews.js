// Import necessary dependencies and components
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col } from 'react-bootstrap';
import Bounce from 'react-reveal/Bounce';
import './SingleNews.css';

const SingleNews = ({ news: { title, time, description, image } }) => {
    return (
        <Col md={4} className='p-2'>
            <div className="blog-card">
                <Bounce bottom cascade>
                    <div>
                        {/* Display the news image */}
                        <img src={image} alt={title} className="img-fluid" />
                    </div>
                    <div className="p-4">
                        <h5>{title}</h5>
                        {/* Display the news description */}
                        <p className="text-muted">{description}</p>
                        {/* Display the news time with clock icon */}
                        <span className="text-info">
                            <FontAwesomeIcon icon={faClock} /> {time}
                        </span>
                    </div>
                </Bounce>
            </div>
        </Col>
    );
};

// Export the SingleNews component
export default SingleNews;
