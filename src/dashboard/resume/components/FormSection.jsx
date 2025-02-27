import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'

function FormSection() {

  const[activeFormIndex,setActiveFormIndex] = useState(1);
  const[enabledNext,setEnableNext] = useState(false);

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
     {activeFormIndex==1? <PersonalDetails  enabledNext={(v)=>setEnableNext(v)} />:null}

     {/* Summary */}

     {/* Professional Experience */}

     {/* Educational Details */}

     {/* Skills */}
    </div>
  )
}

export default FormSection  