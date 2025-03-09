import React from 'react';

function PersonalDetailsPreview({ resumeInfo }) {
  return (
    <div className=" p-5 my-5 shadow-lg rounded-lg border border-gray-700 bg-black text-white">
      {/* Full Name */}
      <h2
        className="font-bold text-2xl uppercase text-center"
        style={{
          color: resumeInfo?.themeColor || '#ffffff',
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>

      {/* Job Title */}
      <h2 className="text-gray-300 text-sm font-medium mt-1 text-center">
        {resumeInfo?.jobTitle}
      </h2>

      {/* Address */}
      <h2
        className="text-xs font-normal mt-1 text-center"
        style={{
          color: resumeInfo?.themeColor || '#ffffff',
        }}
      >
        {resumeInfo?.address}
      </h2>

      {/* Contact Info */}
      <div className="flex justify-between text-xs font-normal mt-3 border border-gray-600 px-4 py-2 rounded-lg bg-gray-900 shadow-md">
        <h2
          style={{
            color: resumeInfo?.themeColor || '#ffffff',
          }}
        >
          📞 {resumeInfo?.phone}
        </h2>
        <h2
          style={{
            color: resumeInfo?.themeColor || '#ffffff',
          }}
        >
          ✉️ {resumeInfo?.email}
        </h2>
      </div>

      {/* Divider */}
      <hr
        className="border-[1.5px] my-3"
        style={{
          borderColor: resumeInfo?.themeColor || '#ffffff',
        }}
      />
    </div>
  );
}

export default PersonalDetailsPreview;
