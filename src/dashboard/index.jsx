// import React, { useEffect, useState } from "react";
// import AddResume from "./components/AddResume";
// import { useUser } from "@clerk/clerk-react";
// import GlobalApi from "./../../services/GlobalApi";
// import ResumeCardItem from "./components/ResumeCardItem";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// function Dashboard() {
//   const { user } = useUser();
//   const [resumeList, setResumeList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user?.primaryEmailAddress?.emailAddress) {
//       GetResumesList();
//     }
//   }, [user]);

//   const GetResumesList = () => {
//     const userEmail = user?.primaryEmailAddress?.emailAddress || "";
//     if (!userEmail) return;

//     GlobalApi.GetUserResumes(userEmail)
//       .then((resp) => {
//         setResumeList(resp.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching resumes:", error);
//         setLoading(false);
//       });
//   };

//   const reviews = [
//     { name: "Amit Sharma", role: "CSE Student", review: "This resume builder is a game-changer! Super easy to use." },
//     { name: "Priya Singh", role: "Electrical Engg Student", review: "Amazing AI suggestions. Helped me prepare my resume perfectly!" },
//     { name: "Rohan Patel", role: "Mechanical Engg Student", review: "The best resume builder I have ever used. Highly recommend!" },
//     { name: "Neha Gupta", role: "Civil Engg Student", review: "Created a professional resume in minutes. Loved the templates!" },
//     { name: "Siddharth Mehta", role: "Electronics Engg Student", review: "User-friendly and intuitive. Makes job applications easier!" },
//     { name: "Sneha Iyer", role: "Chemical Engg Student", review: "AI-powered suggestions are spot on! Fantastic experience." },
//     { name: "Karan Verma", role: "IT Student", review: "Simple, efficient, and beautiful designs. Best resume maker!" },
//     { name: "Anjali Rao", role: "Biotech Engg Student", review: "The one-click download feature saved me so much time!" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800 p-6 md:p-12">
//       <div className="text-center mb-12">
//         <h2 className="text-5xl font-extrabold mb-4 text-blue-700">My Resumes</h2>
//         <p className="text-gray-600 text-lg">Create & manage AI-generated resumes with ease.</p>
//       </div>

//       {loading ? (
//         <p className="text-gray-500 text-lg mt-10 text-center">Loading resumes...</p>
//       ) : resumeList.length === 0 ? (
//         <div className="text-center mt-10">
//           <p className="text-gray-500 text-lg">No resumes found. Start creating one now!</p>
//           <div className="mt-6 flex justify-center">
//             <AddResume />
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
//           <div className="transition-transform hover:scale-105">
//             <AddResume />
//           </div>
//           {resumeList.map((resume, index) => (
//             <div key={index} className=" p-6 rounded-xl  transition">
//               <ResumeCardItem resume={resume} refreshData={GetResumesList} />
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="mt-20 text-center">
//         <h2 className="text-4xl font-bold text-blue-700 mb-4">What Students Say</h2>
//         <p className="text-gray-500 mb-6">Here’s what students from various departments think of our builder.</p>
//         <div className="max-w-6xl mx-auto">
//           <Swiper
//             spaceBetween={20}
//             slidesPerView={2}
//             loop={true}
//             autoplay={{ delay: 3000 }}
//             modules={[Autoplay]}
//             breakpoints={{
//               640: { slidesPerView: 1 },
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//             }}
//             className="rounded-xl overflow-hidden"
//           >
//             {reviews.map((review, index) => (
//               <SwiperSlide key={index}>
//                 <div className="bg-white border border-blue-100 p-6 rounded-xl shadow-sm h-48 flex flex-col justify-between">
//                   <p className="text-gray-600 italic">"{review.review}"</p>
//                   <div className="mt-2">
//                     <h4 className="font-semibold text-blue-700">- {review.name}</h4>
//                     <span className="text-gray-400 text-sm">{review.role}</span>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

"use client"

import { useEffect, useState } from "react"
import AddResume from "./components/AddResume"
import { useUser } from "@clerk/clerk-react"
import GlobalApi from "./../../services/GlobalApi"
import ResumeCardItem from "./components/ResumeCardItem"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { motion } from "framer-motion"
import { FileText, Sparkles, Users, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import "swiper/css"
import "swiper/css/pagination"

function Dashboard() {
  const { user } = useUser()
  const [resumeList, setResumeList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetResumesList()
    }
  }, [user])

  const GetResumesList = () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress || ""
    if (!userEmail) return

    GlobalApi.GetUserResumes(userEmail)
      .then((resp) => {
        setResumeList(resp.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching resumes:", error)
        setLoading(false)
      })
  }

  const reviews = [
    {
      name: "Amit Sharma",
      role: "CSE Student",
      review: "This resume builder is a game-changer! Super easy to use.",
      rating: 5,
      avatar: "AS",
    },
    {
      name: "Priya Singh",
      role: "Electrical Engg Student",
      review: "Amazing AI suggestions. Helped me prepare my resume perfectly!",
      rating: 5,
      avatar: "PS",
    },
    {
      name: "Rohan Patel",
      role: "Mechanical Engg Student",
      review: "The best resume builder I have ever used. Highly recommend!",
      rating: 5,
      avatar: "RP",
    },
    {
      name: "Neha Gupta",
      role: "Civil Engg Student",
      review: "Created a professional resume in minutes. Loved the templates!",
      rating: 5,
      avatar: "NG",
    },
    {
      name: "Siddharth Mehta",
      role: "Electronics Engg Student",
      review: "User-friendly and intuitive. Makes job applications easier!",
      rating: 5,
      avatar: "SM",
    },
    {
      name: "Sneha Iyer",
      role: "Chemical Engg Student",
      review: "AI-powered suggestions are spot on! Fantastic experience.",
      rating: 5,
      avatar: "SI",
    },
    {
      name: "Karan Verma",
      role: "IT Student",
      review: "Simple, efficient, and beautiful designs. Best resume maker!",
      rating: 5,
      avatar: "KV",
    },
    {
      name: "Anjali Rao",
      role: "Biotech Engg Student",
      review: "The one-click download feature saved me so much time!",
      rating: 5,
      avatar: "AR",
    },
  ]

  const stats = [
    { icon: FileText, label: "Resumes Created", value: "10,000+", color: "text-blue-600" },
    { icon: Users, label: "Happy Users", value: "5,000+", color: "text-green-600" },
    { icon: TrendingUp, label: "Success Rate", value: "95%", color: "text-purple-600" },
    { icon: Sparkles, label: "AI Suggestions", value: "50,000+", color: "text-orange-600" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-16 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Welcome back, {user?.firstName}! 👋</h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Create & manage AI-powered resumes that land you your dream job
              </p>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Resume Builder
              </Badge>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
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
          className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full"
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
      </motion.div>

      {/* Stats Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="px-6 py-12 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* My Resumes Section */}
      <div className="px-6 md:px-12 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Resumes
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Manage your professional resumes and create new ones with our AI-powered builder
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <Skeleton className="w-full h-40 mb-4 rounded-lg" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : resumeList.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No resumes yet</h3>
                <p className="text-gray-600 mb-8">
                  Start your journey by creating your first professional resume with our AI-powered builder
                </p>
                <AddResume />
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              <motion.div variants={itemVariants}>
                <AddResume />
              </motion.div>
              {resumeList.map((resume, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <ResumeCardItem resume={resume} refreshData={GetResumesList} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 py-16 md:px-12 bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What Students Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join thousands of students who have successfully created professional resumes
            </p>
          </div>

          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic leading-relaxed">"{review.review}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {review.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <p className="text-gray-500 text-sm">{review.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard

