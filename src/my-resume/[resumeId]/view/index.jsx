import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GlobalApi from './../../../../services/GlobalApi';
import { RWebShare } from 'react-web-share';

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp);
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {/* Page Background */}
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-600 to-black   p-6 md:p-12 text-black">
        <Header />

        {/* Resume Ready Section */}
        <div className="my-10 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white">
            Your resume is now ready!
          </h2>
          <p className="text-white mt-2">
            You can now download or share your resume URL as required.
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-5 mt-8">
            <Button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white" onClick={HandleDownload}>
              Download
            </Button>

            <RWebShare
              data={{
                text: "Please open this URL to view my resume",
                url: `${import.meta.env.VITE_BASE_URL}/my-resume${resumeId}/view`,
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} Resume`,
              }}
              onClick={() => console.log("Shared successfully!")}
            >
              <Button className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white">
                Share
              </Button>
            </RWebShare>
          </div>
        </div>

        {/* Resume Preview Section */}
        <div className="mt-10 mx-auto max-w-4xl p-6 md:p-8 bg-white shadow-lg rounded-xl border border-gray-300">
          <div id="print-area">
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
