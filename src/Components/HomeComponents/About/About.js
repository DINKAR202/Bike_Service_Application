import { motion } from "framer-motion";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import about from "../../../images/about-section.jpg";
import "./About.css";

const About = () => {
  return (
    <section className="about-container">
      <Container>
        <Row className="align-items-center justify-content-center banner">
          <Col md={6}>
            <Fade left>
              <Image className="img-fluid" src={about} alt="..." />
            </Fade>
          </Col>
          <Col md={6}>
            <Fade right>
              <h6 className="text-info">About Us</h6>
              <h3>Why Choose Us For Repair ?</h3>
              <span className="animate-border border-black"></span>
              <p className="text-muted mt-2">
                {" "}
                <small>
                  Choose us for repairs because we offer unmatched expertise,
                  timely service, and competitive pricing. Our skilled
                  technicians use cutting-edge tools and have a proven track
                  record of delivering top-quality repairs. We prioritize
                  customer satisfaction, ensuring your vehicle is in safe hands
                  and ready for the road.
                </small>{" "}
              </p>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  textShadow: "0px 0px 8px rgb(255 255 255)",
                  boxShadow: "0px 0px 8px #17a2b8",
                  transition: { duration: 0.4, yoyo: "Infinity" },
                }}
                className="main-button"
              >
                Learn More
              </motion.button>
            </Fade>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
