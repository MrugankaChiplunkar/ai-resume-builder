"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, FileText, Edit3, Download, Star, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import Header from "@/components/custom/Header"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
}

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(null)

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Suggestions",
      description: "Get intelligent recommendations for content and formatting",
    },
    {
      icon: FileText,
      title: "Professional Templates",
      description: "Choose from expertly designed templates for every industry",
    },
    {
      icon: Edit3,
      title: "Real-time Editing",
      description: "See changes instantly as you build your perfect resume",
    },
    {
      icon: Download,
      title: "One-Click Download",
      description: "Export your resume as PDF with a single click",
    },
  ]

  const steps = [
    {
      title: "Sign Up & Sign In",
      description: "Create an account using Google/GitHub for easy access.",
    },
    {
      title: "Choose a Template",
      description: "Use professional templates designed for different roles.",
    },
    {
      title: "Enter Your Details",
      description: "Fill in your experience, skills, and education with AI-powered suggestions.",
    },
    {
      title: "Customize Design",
      description: "Adjust colors, fonts, and layouts to match your personal style.",
    },
    {
      title: "Preview & Download",
      description: "Review your resume and download it in PDF format instantly.",
    },
    {
      title: "Manage Resumes",
      description: "Store, edit, and update multiple resumes easily in your dashboard.",
    },
  ]

  const testimonials = [
    {
      name: "Rohan Mehta",
      role: "Software Developer",
      content:
        "This resume builder helped me land an amazing role at a top tech startup in Bengaluru. The AI suggestions made all the difference!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Marketing Specialist",
      content:
        "The templates are sleek and professional. I created a beautiful resume in just 10 minutes and got interview calls immediately!",
      rating: 5,
    },
    {
      name: "Anjali Desai",
      role: "UI/UX Designer",
      content:
        "Loved how easy it was to personalize my resume. The real-time preview saved so much time and effort!",
      rating: 5,
    },

  ]

  const faqs = [
    {
      question: "Is the resume builder really free?",
      answer:
        "Yes! We offer a free tier with basic templates and features. Premium templates and advanced AI features are available with our paid plans.",
    },
    {
      question: "Can I edit my resume after downloading?",
      answer:
        "Your resumes are saved in your dashboard and can be edited anytime. You can also download updated versions whenever needed.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "We support PDF downloads for all resumes. PDF format ensures your resume looks professional and maintains formatting across all devices.",
    },
    {
      question: "How does the AI suggestion feature work?",
      answer:
        "Our AI analyzes your input and suggests improvements for content, formatting, and keywords based on industry best practices and current hiring trends.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      {/* <motion.header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}>
            ResumeAI
          </motion.div>
          <nav className="hidden md:flex space-x-8">
            {["Features", "How it Works", "Testimonials", "FAQ"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Button>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </motion.header> */}

      <Header />

      {/* Hero */}
      {/* ... (You can paste the rest of your JSX content here unchanged) ... */}

      {/* Hero Section */}
      <section className="h-screen px-6 flex items-center justify-center">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-5xl z-30 md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Build Your Resume{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Effortlessly
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI-powered resume builder with professional templates, real-time editing, and instant downloads. Create a
              standout resume in minutes, not hours.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4"
                >
                  <Link href="/dashboard" className="flex items-center">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-2 border-gray-300 hover:border-blue-500"
                >
                  View Templates
                </Button>
              </motion.div> */}
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-10 w-16 h-16 bg-indigo-200 rounded-full opacity-60"
            animate={{
              y: [0, 20, 0],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-[18%] right-[10%] w-12 h-12 bg-blue-200 rounded-full opacity-50"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-[35%] right-[30%] w-20 h-20 z-10 bg-purple-200 rounded-full opacity-40"
            animate={{
              y: [0, 25, 0],
              rotate: [0, 270, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[12%] right-[25%] w-10 h-10 bg-green-200 rounded-full opacity-60"
            animate={{
              y: [0, 30, 0],
              rotate: [360, 0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[45%] left-[5%] w-14 h-14 bg-pink-200 rounded-full opacity-50"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

        </div>
      </section >

      {/* Features Section */}
      <section section id="features" className="py-20 px-6 bg-white/50" >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you create the perfect resume
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section >

      {/* How It Works Section */}
      <section section id="how-it-works" className="py-20 px-6" >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create your professional resume in just a few simple steps
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50">
                  <CardContent className="p-8">
                    <motion.div
                      className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white font-bold text-lg mb-6"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {index + 1}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section >

      {/* Testimonials Section */}
      <section section id="testimonials" className="py-20 px-6 bg-gradient-to-r from-blue-50 to-indigo-50" >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              What People Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who landed their dream jobs
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={scaleIn} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section >

      {/* FAQ Section */}
      <section section id="faq" className="py-20 px-6" >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">Everything you need to know about our resume builder</p>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-0">
                    <motion.button
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      <motion.div animate={{ rotate: openFAQ === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      </motion.div>
                    </motion.button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFAQ === index ? "auto" : 0,
                        opacity: openFAQ === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600">{faq.answer}</div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section >

      {/* CTA Section */}
      <section section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600" >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Build Your Perfect Resume?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume
              builder.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                <Link href="/dashboard" className="flex items-center">
                  Start Building Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section >

      {/* Footer */}
      <footer footer className="py-12 px-6 bg-gray-900 text-white" >
        <div className="container mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              ResumeAI
            </div>
            <p className="text-gray-400 mb-8">© 2025 AI Resume Builder. Made with ❤️ by Interview Xpert.</p>
            <div className="flex justify-center space-x-8">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer >

    </div >
  )
}
