import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';
import PersonalDetailsPreview from './Preview-Components/PersonalDetailsPreview';
import SummaryPreview from './Preview-Components/SummaryPreview';
import ProfessionalExperiencePreview from './Preview-Components/ProfessionalExperiencePreview';
import EducationPreview from './Preview-Components/EducationPreview';
import SkillsPreview from './Preview-Components/SkillsPreview';

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-2xl h-full p-10 md:p-14 border-t-[6px] rounded-lg bg-gray-900 text-white transition-all transform hover:scale-[1.02]"
      style={{
        borderColor: resumeInfo?.themeColor || '#ffffff',
      }}
    >
      {/* Personal Details */}
      <PersonalDetailsPreview resumeInfo={resumeInfo} />

      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* Professional Experience */}
      <ProfessionalExperiencePreview resumeInfo={resumeInfo} />

      {/* Educational Details */}
      <EducationPreview resumeInfo={resumeInfo} />

      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;
