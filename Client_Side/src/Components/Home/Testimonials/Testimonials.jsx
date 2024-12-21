import React, { useEffect, useState } from 'react'
import Container from '../../Container/Container';
import TestimonialsCard from './TestimonialsCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import "@smastrom/react-rating/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import Title from '../../Title';
const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    fetch("./reviews.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTestimonials(data);
      })
      .catch((error) =>
        console.error("Error fetching testimonial data:", error)
      );
  }, []);
  const chunkArray = (arr, size) => {
    return arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );
  };

  // Divide testimonials into chunks of 2
  const testimonialChunks = chunkArray(testimonials, 2);
  return (
    <Container>
        <Title title={"Feedback"} subtitle={" What students and guardians say about colleges"}/>
       
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {testimonialChunks.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className="py-10 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {chunk.map((data) => (
                  <TestimonialsCard key={data.id} data={data} />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default Testimonials