import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import airbnb from '../../../images/asset 28.png';
import google from '../../../images/asset 25.png';
import netflix from '../../../images/asset 27.png';
import slack from '../../../images/asset 27.png';
import uber from '../../../images/asset 26.png';

const Partners = () => {
    return (
        <section>
        <Container className='my-5'>
            <Row xs={12} className='justify-content-around align-items-center '>
                <Col className='text-center mt-4' xs={6} md={2}><img style={{width:'100px'}} src={slack} alt=""/></Col>
                <Col className='text-center  mt-4' xs={6} md={2}><img style={{width:'100px'}} src={google} alt=""/></Col>
                <Col className='text-center  mt-4' xs={6} md={2}><img style={{width:'100px'}} src={uber} alt=""/></Col>
                <Col className='text-center  mt-4' xs={6} md={2}><img style={{width:'100px'}} src={netflix} alt=""/></Col>
                <Col className='text-center  mt-4' xs={6} md={2}><img style={{width:'100px'}} src={airbnb} alt=""/></Col>
            </Row>
        </Container>
    </section>
    );
};

export default Partners;