// Import necessary dependencies and components
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import spinner from '../../../images/asset 23.gif';
import Testimonial from '../Testimonial/Testimonial';
import './Testimonials.css';

// Initialize Swiper with required modules
SwiperCore.use([Pagination, Autoplay]);

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    // Fetch testimonials data from a server when the component mounts
    useEffect(() => {
        // Add the website hosted URL for data fetching
        fetch('http://localhost:9090/all-review')
            .then(res => res.json())
            .then(data => setTestimonials(data))
            .catch(error => toast.error(error.message));
    }, []);

    return (
        <section id="reviews" className="testimonials p-md-3">
            <div className="my-5 py-4">
                <div className="review-title text-center">
                    <span>What Our Clients Say</span>
                    <h3>Testimonials</h3>
                </div>
                <div>
                    {testimonials.length > 0 ? (
                        <Swiper
                            loop={true}
                            pagination={{ clickable: true }}
                            slidesPerView={1}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 2,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                            }}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={10}
                        >
                            {testimonials.map(testimonial => (
                                <SwiperSlide key={testimonial._id}>
                                    <Testimonial testimonial={testimonial} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="text-center">
                            <img className='img-fluid' src={spinner} alt="Loading..." />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// Export the Testimonials component
export default Testimonials;
