  // import React from 'react';

  // function SummaryPreview({ resumeInfo }) {
  //   return (
  //     <div className="px-6 py-5 bg-black shadow-lg rounded-lg text-white mb-6">
  //       <h2
  //         className="text-center font-bold text-lg mb-2"
  //         style={{
  //           color: resumeInfo?.themeColor || '#ffffff',
  //         }}
  //       >
  //         SUMMARY
  //       </h2>
  //       <hr
  //         className="mb-4"
  //         style={{
  //           borderColor: resumeInfo?.themeColor || '#ffffff',
  //         }}
  //       />
  //       <p className="text-sm text-gray-300 leading-relaxed">{resumeInfo?.summary}</p>
  //     </div>
  //   );
  // }

  // export default SummaryPreview;
  "use client"

  import { motion } from "framer-motion"
  
  function SummaryPreview({ resumeInfo }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2
          className="text-xl font-bold uppercase tracking-wide mb-4 text-center"
          style={{
            color: resumeInfo?.themeColor || "#3b82f6",
          }}
        >
          Summary
        </h2>
        <hr
          className="mb-6 border-2"
          style={{
            borderColor: resumeInfo?.themeColor || "#3b82f6",
          }}
        />
  
        {resumeInfo?.summary ? (
          <p className="text-base text-gray-600 leading-relaxed">{resumeInfo.summary}</p>
        ) : (
          <p className="text-gray-500 italic text-center">No summary added yet</p>
        )}
      </motion.div>
    )
  }
  
  export default SummaryPreview
  