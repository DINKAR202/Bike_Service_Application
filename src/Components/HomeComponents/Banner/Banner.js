import { motion } from "framer-motion";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import banner from "../../../images/banner-im.jpg";
import "./Banner.css";

const Banner = () => {
  return (
    <motion.section
      initial={{ y: -250 }}
      animate={{ y: -10 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 2500 }}
      id="home"
    >
      <Container>
        <Row className="align-items-center justify-content-center banner">
          <Col md={4}>
            <h1>We're Crafting Solutions for Your Challenges.</h1>
            <p className="text-muted">
              <small>
                Our motorcycle repair technicians pride themselves on great
                skill in diagnosing and fixing a wide range of problems. With
                years of hands-on experience, they excel at troubleshooting and
                solving various motorcycle-related challenges to ensure your car
                runs flawlessly.
              </small>
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
              Get Started
            </motion.button>
          </Col>
          <Col className="offset-md-1" md={6}>
            <Image className="img-fluid" src={banner} alt="..." />
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default Banner;
