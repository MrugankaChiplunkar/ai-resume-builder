import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../services/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetResumesList();
    }
  }, [user]);

  const GetResumesList = () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress || "";
    if (!userEmail) return;

    GlobalApi.GetUserResumes(userEmail)
      .then((resp) => {
        setResumeList(resp.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching resumes:", error);
        setLoading(false);
      });
  };

  const reviews = [
    { name: "Amit Sharma", role: "CSE Student", review: "This resume builder is a game-changer! Super easy to use." },
    { name: "Priya Singh", role: "Electrical Engg Student", review: "Amazing AI suggestions. Helped me prepare my resume perfectly!" },
    { name: "Rohan Patel", role: "Mechanical Engg Student", review: "The best resume builder I have ever used. Highly recommend!" },
    { name: "Neha Gupta", role: "Civil Engg Student", review: "Created a professional resume in minutes. Loved the templates!" },
    { name: "Siddharth Mehta", role: "Electronics Engg Student", review: "User-friendly and intuitive. Makes job applications easier!" },
    { name: "Sneha Iyer", role: "Chemical Engg Student", review: "AI-powered suggestions are spot on! Fantastic experience." },
    { name: "Karan Verma", role: "IT Student", review: "Simple, efficient, and beautiful designs. Best resume maker!" },
    { name: "Anjali Rao", role: "Biotech Engg Student", review: "The one-click download feature saved me so much time!" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800 p-6 md:p-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold mb-4 text-blue-700">My Resumes</h2>
        <p className="text-gray-600 text-lg">Create & manage AI-generated resumes with ease.</p>
      </div>

      {loading ? (
        <p className="text-gray-500 text-lg mt-10 text-center">Loading resumes...</p>
      ) : resumeList.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">No resumes found. Start creating one now!</p>
          <div className="mt-6 flex justify-center">
            <AddResume />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          <div className="transition-transform hover:scale-105">
            <AddResume />
          </div>
          {resumeList.map((resume, index) => (
            <div key={index} className=" p-6 rounded-xl  transition">
              <ResumeCardItem resume={resume} refreshData={GetResumesList} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-20 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">What Students Say</h2>
        <p className="text-gray-500 mb-6">Here’s what students from various departments think of our builder.</p>
        <div className="max-w-6xl mx-auto">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            autoplay={{ delay: 3000 }}
            modules={[Autoplay]}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="rounded-xl overflow-hidden"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white border border-blue-100 p-6 rounded-xl shadow-sm h-48 flex flex-col justify-between">
                  <p className="text-gray-600 italic">"{review.review}"</p>
                  <div className="mt-2">
                    <h4 className="font-semibold text-blue-700">- {review.name}</h4>
                    <span className="text-gray-400 text-sm">{review.role}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
