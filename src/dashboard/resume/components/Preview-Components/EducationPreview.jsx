import React from 'react';

function EducationPreview({ resumeInfo }) {
  return (
    <div className="my-6 p-5 shadow-lg rounded-lg border border-gray-700 bg-black text-white">
      <h2
        className="text-center font-bold text-lg mb-3 uppercase"
        style={{
          color: resumeInfo?.themeColor || '#ffffff',
        }}
      >
        Educational Details
      </h2>
      <hr
        className="mb-4"
        style={{
          borderColor: resumeInfo?.themeColor || '#ffffff',
        }}
      />

      {(resumeInfo?.education || []).map((education, index) => (
        <div
          key={index}
          className="my-5 p-4 rounded-lg shadow-md border border-gray-600 bg-gray-900"
        >
          <h2
            className="text-lg font-semibold"
            style={{
              color: resumeInfo?.themeColor || '#ffffff',
            }}
          >
            {education?.universityName}
          </h2>
          <h2 className="text-sm flex justify-between text-gray-300">
            <span>{education?.degree}  {education?.major}</span>
            <span>
              {education?.startDate} - {education?.notCompleted ? 'Present' : education?.endDate}
            </span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">{education?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationPreview;
