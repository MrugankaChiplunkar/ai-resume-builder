import React from 'react';

function SummaryPreview({ resumeInfo }) {
  return (
    <div className="px-6 py-5 bg-black shadow-lg rounded-lg text-white mb-6">
      <h2
        className="text-center font-bold text-lg mb-2"
        style={{
          color: resumeInfo?.themeColor || '#ffffff',
        }}
      >
        SUMMARY
      </h2>
      <hr
        className="mb-4"
        style={{
          borderColor: resumeInfo?.themeColor || '#ffffff',
        }}
      />
      <p className="text-sm text-gray-300 leading-relaxed">{resumeInfo?.summary}</p>
    </div>
  );
}

export default SummaryPreview;
