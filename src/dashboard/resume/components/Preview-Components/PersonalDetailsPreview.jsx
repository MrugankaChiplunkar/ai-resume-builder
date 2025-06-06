// import React from 'react';

// function PersonalDetailsPreview({ resumeInfo }) {
//   return (
//     <div className=" p-5 my-5 shadow-lg rounded-lg border border-gray-700 bg-black text-white">
//       {/* Full Name */}
//       <h2
//         className="font-bold text-2xl uppercase text-center"
//         style={{
//           color: resumeInfo?.themeColor || '#ffffff',
//         }}
//       >
//         {resumeInfo?.firstName} {resumeInfo?.lastName}
//       </h2>

//       {/* Job Title */}
//       <h2 className="text-gray-300 text-sm font-medium mt-1 text-center">
//         {resumeInfo?.jobTitle}
//       </h2>

//       {/* Address */}
//       <h2
//         className="text-xs font-normal mt-1 text-center"
//         style={{
//           color: resumeInfo?.themeColor || '#ffffff',
//         }}
//       >
//         {resumeInfo?.address}
//       </h2>

//       {/* Contact Info */}
//       <div className="flex justify-between text-xs font-normal mt-3 border border-gray-600 px-4 py-2 rounded-lg bg-gray-900 shadow-md">
//         <h2
//           style={{
//             color: resumeInfo?.themeColor || '#ffffff',
//           }}
//         >
//           📞 {resumeInfo?.phone}
//         </h2>
//         <h2
//           style={{
//             color: resumeInfo?.themeColor || '#ffffff',
//           }}
//         >
//           ✉️ {resumeInfo?.email}
//         </h2>
//       </div>

//       {/* Divider */}
//       <hr
//         className="border-[1.5px] my-3"
//         style={{
//           borderColor: resumeInfo?.themeColor || '#ffffff',
//         }}
//       />
//     </div>
//   );
// }

// export default PersonalDetailsPreview;
"use client"

import { motion } from "framer-motion"

function PersonalDetailsPreview({ resumeInfo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      {/* Full Name */}
      <h1
        className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-2"
        style={{
          color: resumeInfo?.themeColor || "#3b82f6",
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>

      {/* Job Title */}
      <h2 className="text-lg md:text-xl text-gray-600 font-medium mb-3">{resumeInfo?.jobTitle}</h2>

      {/* Address */}
      <p className="text-sm text-gray-500 mb-4">{resumeInfo?.address}</p>

      {/* Contact Info */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {resumeInfo?.phone && (
          <div className="flex items-center gap-1" style={{ color: resumeInfo?.themeColor || "#3b82f6" }}>
            <span>📞</span>
            <span>{resumeInfo.phone}</span>
          </div>
        )}
        {resumeInfo?.email && (
          <div className="flex items-center gap-1" style={{ color: resumeInfo?.themeColor || "#3b82f6" }}>
            <span>✉️</span>
            <span>{resumeInfo.email}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <hr
        className="mt-6 mb-6 border-2"
        style={{
          borderColor: resumeInfo?.themeColor || "#3b82f6",
        }}
      />
    </motion.div>
  )
}

export default PersonalDetailsPreview
