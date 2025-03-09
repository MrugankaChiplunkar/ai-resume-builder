import React from 'react';

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="p-6 shadow-lg rounded-lg border border-gray-700 bg-black text-white">
      {/* Section Title */}
      <h2
        className="text-center font-bold text-lg uppercase tracking-wide mb-3"
        style={{
          color: resumeInfo?.themeColor || '#ffffff',
        }}
      >
        Skills
      </h2>

      {/* Divider */}
      <hr
        className="border-[1.5px] mb-4"
        style={{
          borderColor: resumeInfo?.themeColor || '#ffffff',
        }}
      />

      {/* Skills List */}
      <div className="grid grid-cols-2 gap-4">
        {(resumeInfo?.skills || []).map((skill, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-900 p-2 rounded-lg shadow-md">
            {/* Skill Name */}
            <h2 className="text-sm font-medium">{skill.name}</h2>

            {/* Skill Progress Bar */}
            <div className="h-2 bg-gray-700 w-[120px] rounded-full overflow-hidden shadow-inner">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: resumeInfo?.themeColor || '#ffffff',
                  width: skill?.rating * 20 + '%',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
