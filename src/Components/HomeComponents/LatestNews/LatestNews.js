import React from 'react';
import { Container, Row } from 'react-bootstrap';
import news1 from '../../../images/latest arrived.jpg';
import news2 from '../../../images/modified.jpg';
import news3 from '../../../images/adventure bike.jpg';
import SingleNews from '../SingleNews/SingleNews';
import './LatestNews.css';

const LatestNews = () => {

    const latestNews = [
        {
          id:1,
          title: "New Bike Comming soon....",
          time: "Nov 10, 2023",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, tempora nihil...",
          image: news1
        },
        {
          id:2,
          title: "Our team Modified bike",
          time: "OCT 01, 2023",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, tempora nihil...",
          image: news2
        },
        {
          id:3,
          title: "Best Adventure bike",
          time: "OCT 01, 2023",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, tempora nihil...",
          image: news3
        }
      ]

    return (
          <section className='news-container' id='blog'>
            <Container className="py-5">
              <h3>Explore Our Freshest Blog Updates</h3>
              <Row className="mt-5">
                  {
                       latestNews.map(news => <SingleNews key={news.id} news={news} />)
                  }
              </Row>
            </Container>
         </section>
    );
};

export default LatestNews;