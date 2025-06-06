// import React from 'react';

// function ProfessionalExperiencePreview({ resumeInfo }) {
//   return (
//     <div className="p-6 shadow-lg rounded-lg border border-gray-700 bg-black text-white">
//       {/* Section Title */}
//       <h2
//         className="text-center font-bold text-lg uppercase tracking-wide mb-3"
//         style={{
//           color: resumeInfo?.themeColor || '#ffffff',
//         }}
//       >
//         Professional Experience
//       </h2>

//       {/* Divider */}
//       <hr
//         className="border-[1.5px] mb-4"
//         style={{
//           borderColor: resumeInfo?.themeColor || '#ffffff',
//         }}
//       />

//       {/* Experience List */}
//       {(resumeInfo?.experience || []).map((experience, index) => (
//         <div key={index} className="my-6 p-4 border border-gray-600 rounded-lg bg-gray-900 shadow-md">
//           {/* Job Title */}
//           <h2
//             className="text-lg font-semibold"
//             style={{
//               color: resumeInfo?.themeColor || '#ffffff',
//             }}
//           >
//             {experience?.title}
//           </h2>

//           {/* Company, City & State */}
//           <h2 className="text-sm flex justify-between text-gray-300 mt-1">
//             <span>
//               {experience?.companyName}, {experience?.city}, {experience?.state}
//             </span>
//             <span>
//               {experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience?.endDate}
//             </span>
//           </h2>

//           {/* Work Summary */}
//           <div className="text-gray-400 text-xs mt-3" dangerouslySetInnerHTML={{ __html: experience?.workSummary || '' }} />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProfessionalExperiencePreview;
"use client"

import { motion } from "framer-motion"

function ProfessionalExperiencePreview({ resumeInfo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-8"
    >
      <h2
        className="text-xl font-bold uppercase tracking-wide mb-4 text-center"
        style={{
          color: resumeInfo?.themeColor || "#3b82f6",
        }}
      >
        Professional Experience
      </h2>
      <hr
        className="mb-6 border-2"
        style={{
          borderColor: resumeInfo?.themeColor || "#3b82f6",
        }}
      />

      <div className="space-y-6">
        {(resumeInfo?.experience || []).map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="pb-4"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
              <h3
                className="text-lg font-semibold"
                style={{
                  color: resumeInfo?.themeColor || "#3b82f6",
                }}
              >
                {experience?.title || "Position Title"}
              </h3>
              <div className="text-sm text-gray-500">
                {experience?.startDate
                  ? new Date(experience.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                  : ""}{" "}
                -{" "}
                {experience?.currentlyWorking
                  ? "Present"
                  : experience?.endDate
                    ? new Date(experience.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                    : ""}
              </div>
            </div>

            <div className="text-base font-medium mb-2">
              {experience?.companyName || "Company Name"}
              {experience?.city && experience?.state ? `, ${experience.city}, ${experience.state}` : ""}
            </div>

            <div
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: experience?.workSummary || "" }}
            />
          </motion.div>
        ))}

        {(!resumeInfo?.experience || resumeInfo.experience.length === 0) && (
          <p className="text-gray-500 italic text-center">No experience details added yet</p>
        )}
      </div>
    </motion.div>
  )
}

export default ProfessionalExperiencePreview
