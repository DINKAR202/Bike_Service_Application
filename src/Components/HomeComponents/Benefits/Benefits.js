import { motion } from "framer-motion";
import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import benefits from '../../../images/asset 22.png';
import './Benefits.css';


const Benefits = () => {
    return (
        <section  className="benefits-container"> 
            <Container>
                <Row className="align-items-center justify-content-center banner">
                    <Col  md={6}>
                        <Fade left>
                              <Image className="img-fluid" src={benefits} alt="..." />
                        </Fade>
                    </Col>
                    <Col className="offset-md-1" md={5}>
                        <Fade right>
                            <h1>Our Teams work!</h1>
                            <p className="text-muted"><small>Our motorcycle repair technicians have extensive experience in diagnosing and fixing problems. Our experienced team guarantees superior service, ensuring flawless performance of your motorcycle. Trust our expertise for exceptional results and the best care for your motorcycle.</small></p>
                            <motion.button whileHover={{scale:1.1, textShadow:'0px 0px 8px rgb(255 255 255)', boxShadow:'0px 0px 8px #17a2b8', transition:{duration:0.4, yoyo:'Infinity'}}} className='main-button'>Go There</motion.button>
                      </Fade>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Benefits;