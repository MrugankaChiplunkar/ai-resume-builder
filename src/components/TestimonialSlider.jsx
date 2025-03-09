import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample reviews (15-20 random reviews)
const reviews = [
  { name: "John Doe", review: "This resume builder is a game-changer! Super easy to use.", role: "Software Engineer" },
  { name: "Jane Smith", review: "Amazing AI suggestions. Helped me land my dream job!", role: "Marketing Manager" },
  { name: "David Lee", review: "The best resume builder I have ever used. Highly recommend!", role: "Data Scientist" },
  { name: "Emily Johnson", review: "Created a professional resume in minutes. Loved the templates!", role: "HR Specialist" },
  { name: "Michael Brown", review: "User-friendly and intuitive. Makes job applications easier!", role: "Graphic Designer" },
  { name: "Sarah Wilson", review: "AI-powered suggestions are spot on! Fantastic experience.", role: "Business Analyst" },
  { name: "Daniel Martinez", review: "Simple, efficient, and beautiful designs. Best resume maker!", role: "Product Manager" },
  { name: "Sophia Kim", review: "The one-click download feature saved me so much time!", role: "UI/UX Designer" },
  { name: "Chris Evans", review: "Great for beginners. Super easy to create a stunning resume.", role: "Full Stack Developer" },
  { name: "Olivia Thomas", review: "It has all the features I need. Worth every penny!", role: "Project Manager" },
  { name: "Ethan White", review: "A must-have tool for job seekers. Simple and professional.", role: "Cyber Security Analyst" },
  { name: "Ava Green", review: "Great selection of templates. Made my resume stand out!", role: "Digital Marketer" },
];

function TestimonialSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 cards at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-md text-white flex flex-col items-start "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FaQuoteLeft className="text-blue-400 text-3xl mb-4" />
            <p className="text-gray-300 italic">"{review.review}"</p>
            <h4 className="font-semibold text-lg mt-4">{review.name}</h4>
            <p className="text-gray-400 text-sm">{review.role}</p>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
}

export default TestimonialSlider;
