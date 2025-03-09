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

  // Fetch user's resume list
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

  // Sample review data
  const reviews = [
    { name: "John Doe", role: "Software Engineer", review: "This resume builder saved me so much time!" },
    { name: "Jane Smith", role: "UX Designer", review: "I got my dream job thanks to this tool!" },
    { name: "Alex Johnson", role: "Data Scientist", review: "Best resume creator I've ever used!" },
    { name: "Michael Lee", role: "Project Manager", review: "Simple, effective, and professional!" },
    { name: "Sarah Williams", role: "Marketing Specialist", review: "Loved the AI suggestions for my resume!" },
    { name: "David Brown", role: "Software Developer", review: "Clean and easy-to-use UI. Highly recommended!" },
    { name: "Emily Davis", role: "Graphic Designer", review: "Helped me create a stunning resume in minutes!" },
    { name: "Chris Wilson", role: "Business Analyst", review: "Got more interview calls after using this!" },
    { name: "Sophia Miller", role: "HR Manager", review: "Perfect tool for building a standout resume!" },
    { name: "Daniel Garcia", role: "Finance Analyst", review: "AI-based suggestions were spot on!" },
    { name: "Olivia Martinez", role: "Content Writer", review: "Created my resume in just a few clicks!" },
    { name: "Ethan Thomas", role: "SEO Specialist", review: "Great tool with professional templates!" },
    { name: "Isabella Moore", role: "Legal Advisor", review: "Helped me structure my resume effectively!" },
    { name: "William Johnson", role: "Cybersecurity Expert", review: "Best AI resume builder out there!" },
    { name: "Ava Thompson", role: "Digital Marketer", review: "Improved my chances of landing a job!" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white p-6 md:p-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4">My Resumes</h2>
        <p className="text-gray-300 text-lg">Create & manage AI-generated resumes efficiently.</p>
      </div>

      {/* Resume Grid Section */}
      {loading ? (
        <p className="text-gray-400 text-lg mt-10 text-center">Loading resumes...</p>
      ) : resumeList.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">No resumes found. Start creating one now!</p>
          <div className="mt-6 flex justify-center">
            <AddResume />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-6">
          <div className="transform transition-transform hover:scale-105 ">
            <AddResume />
          </div>
          {resumeList.map((resume, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md transform transition-all hover:scale-105">
              <ResumeCardItem resume={resume} refreshData={GetResumesList} />
            </div>
          ))}
        </div>
      )}

      {/* People Review Slider Section */}
      <div className="mt-20 text-center">
        <h2 className="text-4xl font-bold mb-4">What People Say</h2>
        <p className="text-gray-400 mb-6">Feedback from professionals using our resume builder.</p>
        <div className="max-w-5xl mx-auto">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            autoplay={{ delay: 2500 }}
            modules={[Autoplay]}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="rounded-lg overflow-hidden"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-64 h-28 flex flex-col justify-center">
                  <p className="text-gray-300 text-sm italic">"{review.review}"</p>
                  <h4 className="text-white font-semibold mt-2 text-sm">- {review.name}</h4>
                  <span className="text-gray-400 text-xs">{review.role}</span>
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
