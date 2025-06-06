import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  { name: "Amit Sharma", review: "This resume builder is a game-changer! Super easy to use.", role: "Computer Science Engineering Student" },
  { name: "Priya Singh", review: "Amazing AI suggestions. Helped me prepare my resume perfectly!", role: "Electrical Engineering Student" },
  { name: "Rohan Patel", review: "The best resume builder I have ever used. Highly recommend!", role: "Mechanical Engineering Student" },
  { name: "Neha Gupta", review: "Created a professional resume in minutes. Loved the templates!", role: "Civil Engineering Student" },
  { name: "Siddharth Mehta", review: "User-friendly and intuitive. Makes job applications easier!", role: "Electronics Engineering Student" },
  { name: "Sneha Iyer", review: "AI-powered suggestions are spot on! Fantastic experience.", role: "Chemical Engineering Student" },
  { name: "Karan Verma", review: "Simple, efficient, and beautiful designs. Best resume maker!", role: "Information Technology Student" },
  { name: "Anjali Rao", review: "The one-click download feature saved me so much time!", role: "Biotechnology Engineering Student" },
  { name: "Vikram Joshi", review: "Great for beginners. Super easy to create a stunning resume.", role: "Aerospace Engineering Student" },
  { name: "Pooja Nair", review: "It has all the features I need. Worth every penny!", role: "Environmental Engineering Student" },
  { name: "Arjun Deshmukh", review: "A must-have tool for job seekers. Simple and professional.", role: "Industrial Engineering Student" },
  { name: "Meera Kulkarni", review: "Great selection of templates. Made my resume stand out!", role: "Computer Science Engineering Student" },
];


function TestimonialSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className=" mx-auto px-6 py-16 ">
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-6 rounded-lg shadow-md text-gray-900 flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FaQuoteLeft className="text-blue-500 text-3xl mb-4" />
            <p className="text-gray-700 italic">"{review.review}"</p>
            <h4 className="font-semibold text-lg mt-4">{review.name}</h4>
            <p className="text-gray-500 text-sm">{review.role}</p>
          </motion.div>
        ))}
      </Slider>
    </section>
  );
}

export default TestimonialSlider;
