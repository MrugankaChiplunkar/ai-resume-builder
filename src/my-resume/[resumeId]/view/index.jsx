import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import GlobalApi from './../../../../services/GlobalApi'
import { RWebShare } from 'react-web-share'
import { Import } from 'lucide-react'

function ViewResume() {

    const[resumeInfo,setResumeInfo] = useState();

    const{resumeId} = useParams();

    useEffect(()=>{
        GetResumeInfo();
    },[])

    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload=()=>{
        window.print();
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>

    <div id='no-print'>
      <Header />
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <h2 className='text-center text-2xl font-medium'>Your resume is now ready!</h2>
        <p className='text-center text-gray-600'>You can now download or share your resume URL as required</p>
        <div className='flex justify-between px-44 my-10'>
            <Button onClick={HandleDownload}>Download</Button>
        <RWebShare
        data={{
          text: "Please open this URL to view my resume",
          url: import.meta.env.VITE_BASE_URL + '/my-resume' + resumeId + 'view',
          title: resumeInfo?.firstName +" "+ resumeInfo?.lastName +" Resume",
        }}
        onClick={() => console.log("shared successfully!")}>
            <Button>Share</Button>
        </RWebShare>
        </div>
        </div>
    </div>
    <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
    <div id='print-area'>
            <ResumePreview />
    </div>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume