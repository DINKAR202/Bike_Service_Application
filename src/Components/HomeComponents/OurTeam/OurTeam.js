// Import necessary dependencies and components
import React from 'react';
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import entry from '../../../images/1 team.jpg';
import gear from '../../../images/2 gear team.jpg';
import helMate from '../../../images/3 helmet team.jpg';
import liloPistol from '../../../images/4 pistol team.jpg';
import paint from '../../../images//5 print team.jpg';
import silencer from '../../../images/6 silencer team.jpg';
import sitCover from '../../../images/7 seat cover team.jpg';
import wheel from '../../../images/8 silencer team.jpg';
import "./OurTeam.css";
import SingleMember from './SingleMember';

// Enable Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

// Define an array of team members with their information
const teamSlide = [
    {
        id: 1,
        name: 'Entry Writer',
        img: entry
    },
    {
        id: 2,
        name: 'Gear Expert',
        img: gear
    },
    {
        id: 3,
        name: 'Helmet Expert',
        img: helMate
    },
    {
        id: 4,
        name: 'Lilo Pistol Expert',
        img: liloPistol
    },
    {
        id: 5,
        name: 'Print Expert',
        img: paint
    },
    {
        id: 6,
        name: 'Silencer Expert',
        img: silencer
    },
    {
        id: 7,
        name: 'Sit cover Expert',
        img: sitCover
    },
    {
        id: 8,
        name: 'Wheel Expert',
        img: wheel
    }
]

// Define the OurTeam component responsible for displaying team members
const OurTeam = () => {
    return (
        <section className="team-container" id="about">
            <h3>Meet our Awesome team</h3>
            <p><small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nulla! Lorem ipsum dolor sit</small></p>
            <Swiper effect={'coverflow'} grabCursor={true} centeredSlides={true} loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }} slidesPerView={'auto'} coverflowEffect={{
                    "rotate": 50,
                    "stretch": 0,
                    "depth": 100,
                    "modifier": 1,
                    "slideShadows": true
                }} pagination={true}
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
            >
                {
                    teamSlide.map(team => {
                        return (
                            <SwiperSlide key={team.id}>
                                <SingleMember key={team.id} team={team} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </section>
    );
};

// Export the OurTeam component
export default OurTeam;
