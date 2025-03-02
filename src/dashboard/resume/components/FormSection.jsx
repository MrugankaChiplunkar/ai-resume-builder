import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Navigate, useParams } from 'react-router-dom';

function FormSection() {

  const[activeFormIndex,setActiveFormIndex] = useState(1);
  const[enabledNext,setEnableNext] = useState(true);
  const{resumeId} = useParams();

  return (
    <div>
      <div className='flex justify-between items-center'>
     <Button variant="outline" size="sm" className='flex gap-2'> <LayoutGrid />Theme</Button>
     <div className='flex gap-2'>
     {activeFormIndex>1&&<Button size="sm"
     onClick={()=>setActiveFormIndex(activeFormIndex-1)}
     ><ArrowLeft />Back</Button>}
        <Button 
        disabled={!enabledNext}
        className='flex gap-2' size="sm"
        onClick={()=>setActiveFormIndex(activeFormIndex+1)}
        >Next <ArrowRight /></Button>
      </div>
      </div>
     {/* Personal Details */}
     {activeFormIndex==1? <PersonalDetails  enabledNext={(v)=>setEnableNext(v)} />
     :activeFormIndex==2? <Summary enabledNext={(v)=>setEnableNext(v)} /> 
     :activeFormIndex==3? <Experience />
     :activeFormIndex==4? <Education />
     :activeFormIndex==5? <Skills />
     :activeFormIndex==6? <Navigate to ={'/my-resume/' + resumeId + '/view' } />
     : null}

     {/* Summary */}

     {/* Professional Experience */}

     {/* Educational Details */}

     {/* Skills */}
    </div>
  )
}

export default FormSection  