import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import FormSection from "../resume/components/FormSection";
import ResumePreview from "../resume/components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../services/GlobalApi";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {/* Page Background */}
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200 p-6 md:p-12 text-black flex flex-col items-center">
        
        {/* Page Title */}
        <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          Edit Your Resume
        </h2>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
          
          {/* Form Section */}
          <div className="relative p-6 md:p-8 rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-300">
            <FormSection />
          </div>

          {/* Resume Preview Section */}
          <div className="relative p-6 md:p-8 rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-300">
            <ResumePreview />
          </div>

        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
