import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import FormSection from '../resume/components/FormSection';
import ResumePreview from '../resume/components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';

function EditResume() {
  const params = useParams();
  const[resumeInfo, setResumeInfo] = useState();

  useEffect(()=>{
    setResumeInfo(dummy);

    }, [])
  return (
    <ResumeInfoContext.Provider value = {{resumeInfo,setResumeInfo}}>
    
    <div className='grid p-10 grid-cols-1 md:grid-cols-2 gap-5'>
        
    {/* Form Section */}
    <FormSection />
    {/* Preview Section */}
    <ResumePreview />
  
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
