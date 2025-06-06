// import React from 'react';

// function EducationPreview({ resumeInfo }) {
//   return (
//     <div className="my-6 p-5 shadow-lg rounded-lg border border-gray-700 bg-black text-white">
//       <h2
//         className="text-center font-bold text-lg mb-3 uppercase"
//         style={{
//           color: resumeInfo?.themeColor || '#ffffff',
//         }}
//       >
//         Educational Details
//       </h2>
//       <hr
//         className="mb-4"
//         style={{
//           borderColor: resumeInfo?.themeColor || '#ffffff',
//         }}
//       />

//       {(resumeInfo?.education || []).map((education, index) => (
//         <div
//           key={index}
//           className="my-5 p-4 rounded-lg shadow-md border border-gray-600 bg-gray-900"
//         >
//           <h2
//             className="text-lg font-semibold"
//             style={{
//               color: resumeInfo?.themeColor || '#ffffff',
//             }}
//           >
//             {education?.universityName}
//           </h2>
//           <h2 className="text-sm flex justify-between text-gray-300">
//             <span>{education?.degree}  {education?.major}</span>
//             <span>
//               {education?.startDate} - {education?.notCompleted ? 'Present' : education?.endDate}
//             </span>
//           </h2>
//           <p className="text-gray-400 text-sm mt-2">{education?.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default EducationPreview;
"use client"

import { motion } from "framer-motion"

function EducationPreview({ resumeInfo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      <h2
        className="text-xl font-bold uppercase tracking-wide mb-4 text-center"
        style={{
          color: resumeInfo?.themeColor || "#3b82f6",
        }}
      >
        Education
      </h2>
      <hr
        className="mb-6 border-2"
        style={{
          borderColor: resumeInfo?.themeColor || "#3b82f6",
        }}
      />

      <div className="space-y-6">
        {(resumeInfo?.education || []).map((education, index) => (
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
                {education?.universityName || "University Name"}
              </h3>
              <div className="text-sm text-gray-500">
                {education?.startDate
                  ? new Date(education.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                  : ""}{" "}
                -{" "}
                {education?.notCompleted
                  ? "Present"
                  : education?.endDate
                    ? new Date(education.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                    : ""}
              </div>
            </div>

            <div className="text-base font-medium mb-2">
              {education?.degree || "Degree"} {education?.major ? `in ${education.major}` : ""}
            </div>

            {education?.description && <p className="text-sm text-gray-600">{education.description}</p>}
          </motion.div>
        ))}

        {(!resumeInfo?.education || resumeInfo.education.length === 0) && (
          <p className="text-gray-500 italic text-center">No education details added yet</p>
        )}
      </div>
    </motion.div>
  )
}

export default EducationPreview
