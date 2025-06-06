// import React from 'react';

// function SkillsPreview({ resumeInfo }) {
//   return (
//     <div className="p-6 shadow-lg rounded-lg border border-gray-700 bg-black text-white">
//       {/* Section Title */}
//       <h2
//         className="text-center font-bold text-lg uppercase tracking-wide mb-3"
//         style={{
//           color: resumeInfo?.themeColor || '#ffffff',
//         }}
//       >
//         Skills
//       </h2>

//       {/* Divider */}
//       <hr
//         className="border-[1.5px] mb-4"
//         style={{
//           borderColor: resumeInfo?.themeColor || '#ffffff',
//         }}
//       />

//       {/* Skills List */}
//       <div className="grid grid-cols-2 gap-4">
//         {(resumeInfo?.skills || []).map((skill, index) => (
//           <div key={index} className="flex items-center justify-between bg-gray-900 p-2 rounded-lg shadow-md">
//             {/* Skill Name */}
//             <h2 className="text-sm font-medium">{skill.name}</h2>

//             {/* Skill Progress Bar */}
//             <div className="h-2 bg-gray-700 w-[120px] rounded-full overflow-hidden shadow-inner">
//               <div
//                 className="h-2 rounded-full transition-all duration-300"
//                 style={{
//                   backgroundColor: resumeInfo?.themeColor || '#ffffff',
//                   width: skill?.rating * 20 + '%',
//                 }}
//               ></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SkillsPreview;
"use client"

import { motion } from "framer-motion"

function SkillsPreview({ resumeInfo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-6"
    >
      <h2
        className="text-xl font-bold uppercase tracking-wide mb-4 text-center"
        style={{
          color: resumeInfo?.themeColor || "#3b82f6",
        }}
      >
        Skills
      </h2>
      <hr
        className="mb-6 border-2"
        style={{
          borderColor: resumeInfo?.themeColor || "#3b82f6",
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(resumeInfo?.skills || []).map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex items-center justify-between"
          >
            <div className="font-medium">{skill.name || "Skill Name"}</div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 + i * 0.05 }}
                >
                  <div
                    className="w-3 h-3 rounded-full mx-0.5"
                    style={{
                      backgroundColor: i < skill.rating ? resumeInfo?.themeColor || "#3b82f6" : "#e5e7eb",
                    }}
                  ></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {(!resumeInfo?.skills || resumeInfo.skills.length === 0) && (
        <p className="text-gray-500 italic text-center">No skills added yet</p>
      )}
    </motion.div>
  )
}

export default SkillsPreview
