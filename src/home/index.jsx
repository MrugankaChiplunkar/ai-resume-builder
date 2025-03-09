import React from "react";
import Header from "@/components/custom/Header";
import { motion } from "framer-motion"; // For 3D-like animations
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import TestimonialSlider from "@/components/TestimonialSlider"; // Review slider component
import FAQ from "@/components/FAQ"; // FAQ section

function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-20 md:py-32">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Build Your Resume <span className="text-gray-400">Effortlessly</span>
        </motion.h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
          AI-powered resume builder with professional templates, real-time
          editing, and instant downloads.
        </p>
        <div className="mt-6 flex space-x-4">
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all flex items-center">
              Get Started <AiOutlineArrowRight className="ml-2" />
            </button>
          </Link>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-20 lg:px-40 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Why Choose <span className="text-gray-400">Our Resume Builder?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            "AI-Powered Suggestions",
            "Professional Template",
            "Real-time Editing",
            "One-Click Download",
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FaCheckCircle className="text-blue-500 text-4xl mb-3" />
              <p className="text-lg font-semibold">{feature}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Slider */}
      <section className="py-20 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          What People <span className="text-gray-400">Say</span>
        </h2>
        <TestimonialSlider />
      </section>

      {/* How It Works Section */}
      <section className="px-6 md:px-20 lg:px-40 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          How It <span className="text-gray-400">Works</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Sign Up & Sign In", desc: "Create an account using Google/GitHub for easy access." },
            { title: "Choose a Template", desc: "Use professional template which is designed for different roles." },
            { title: "Enter Your Details", desc: "Fill in your experience, skills, and education with AI-powered suggestions." },
            { title: "Customize Design", desc: "Adjust colors, fonts, and layouts to match your personal style." },
            { title: "Preview & Download", desc: "Review your resume and download it in PDF format instantly." },
            { title: "Manage Resumes", desc: "Store, edit, and update multiple resumes easily in your dashboard." },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <footer className="py-10 text-center bg-gray-900">
        <p className="text-gray-400">
          © 2025 AI Resume Builder. Made with ❤️ by Interview Xpert.
        </p>
      </footer>
    </div>
  );
}

export default Home;
