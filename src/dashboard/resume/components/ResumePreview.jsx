import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailsPreview from './Preview-Components/PersonalDetailsPreview';
import SummaryPreview from './Preview-Components/SummaryPreview';
import ProfessionalExperiencePreview from './Preview-Components/ProfessionalExperiencePreview';
import EducationPreview from './Preview-Components/EducationPreview';
import SkillsPreview from './Preview-Components/SkillsPreview';

function ResumePreview() {

const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style = {{
      borderColor:resumeInfo?.themeColor || 'red'
    }}
    >

      {/* Personal Details */}
      <PersonalDetailsPreview resumeInfo={resumeInfo}/>

      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo}/>

      {/* Professional Experience */}
      <ProfessionalExperiencePreview resumeInfo={resumeInfo}/>

      {/* Educational Details */}
      <EducationPreview resumeInfo={resumeInfo}/>

      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo}/>

    </div>
  )
}

export default ResumePreview
