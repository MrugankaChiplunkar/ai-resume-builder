import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import FormSection from '../../components/FormSection';

function EditResume() {
  const params = useParams();

  useEffect(()=>{
    console.log(params.resumeId)

    }, [])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      
    {/* Form Section */}
    <FormSection />
    {/* Preview Section */}

    </div>
  )
}

export default EditResume
