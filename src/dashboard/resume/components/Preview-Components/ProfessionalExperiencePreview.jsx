import React from 'react';

function ProfessionalExperiencePreview({ resumeInfo }) {
  return (
    <div className="p-6 shadow-lg rounded-lg border border-gray-700 bg-black text-white">
      {/* Section Title */}
      <h2
        className="text-center font-bold text-lg uppercase tracking-wide mb-3"
        style={{
          color: resumeInfo?.themeColor || '#ffffff',
        }}
      >
        Professional Experience
      </h2>

      {/* Divider */}
      <hr
        className="border-[1.5px] mb-4"
        style={{
          borderColor: resumeInfo?.themeColor || '#ffffff',
        }}
      />

      {/* Experience List */}
      {(resumeInfo?.experience || []).map((experience, index) => (
        <div key={index} className="my-6 p-4 border border-gray-600 rounded-lg bg-gray-900 shadow-md">
          {/* Job Title */}
          <h2
            className="text-lg font-semibold"
            style={{
              color: resumeInfo?.themeColor || '#ffffff',
            }}
          >
            {experience?.title}
          </h2>

          {/* Company, City & State */}
          <h2 className="text-sm flex justify-between text-gray-300 mt-1">
            <span>
              {experience?.companyName}, {experience?.city}, {experience?.state}
            </span>
            <span>
              {experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience?.endDate}
            </span>
          </h2>

          {/* Work Summary */}
          <div className="text-gray-400 text-xs mt-3" dangerouslySetInnerHTML={{ __html: experience?.workSummary || '' }} />
        </div>
      ))}
    </div>
  );
}

export default ProfessionalExperiencePreview;
