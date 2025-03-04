import React from 'react';

function ProfessionalExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor || 'red',
        }}
      >
        Professional Experience
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor || 'red',
        }}
      />

      {(resumeInfo?.experience || []).map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor || 'red',
            }}
          >
            {experience?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {experience?.startDate} to {experience?.currentlyWorking ? 'Present' : experience?.endDate}
            </span>
          </h2>
          {/* Work Summary */}
          <div dangerouslySetInnerHTML={{ __html: experience?.workSummary || '' }} />
        </div>
      ))}
    </div>
  );
}

export default ProfessionalExperiencePreview;
