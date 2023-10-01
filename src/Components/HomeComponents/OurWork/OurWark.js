import React from 'react';
import { Container } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import work1 from '../../../images/asset 12.jpeg';
import work2 from '../../../images/asset 13.jpeg';
import work3 from '../../../images/asset 14.jpeg';
import work4 from '../../../images/asset 15.jpeg';
import work5 from '../../../images/asset 16.jpeg';
import work6 from '../../../images/asset 17.jpeg';
import work7 from '../../../images/asset 18.jpeg';
import './OurWork.css';

const OurWork = () => {
    const allCarousel = [work1, work2, work3, work4, work5, work6, work7];

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className='slider-container pb-5 pt-5'>
            <Container>
                <div className="mb-5">
                    <h3 className='text-center section-title'>Here are some of our works</h3>
                </div>

                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={2500}
                    keyBoardControl={true}
                    dotListClass="custom-dot-list-style"
                    showDots={true}
                >
                    {allCarousel.map((carousel, index) => {
                        return (
                            <div key={index + 100}>
                                <img className='carousel-image' src={carousel} alt=""/>
                            </div>
                        );
                    })}
                </Carousel>
            </Container>
        </div>
    );
};

export default OurWork;
