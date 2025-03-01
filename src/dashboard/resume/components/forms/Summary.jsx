import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React from 'react';
import { useContext, useEffect, useState } from 'react'
import { Await, useParams } from 'react-router';
import GlobalApi from './../../../../../services/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from './../../../../../services/AIModel';

const prompt = "Job Title: {jobTitle}, Depending on the Job Title give me summary for my resume within 4-5 lines in JSON format with field experience level and summary with experience level for Fresher, Mid-Level, Experienced"

function Summary({enabledNext}) {
    const{resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const[summary,setSummary] = useState();
    const[loading, setLoading] = useState(false);
    const params = useParams();
    const[aiGeneratedSummaryList,setAiGeneratedSummaryList] = useState();
    
    useEffect(()=>{
        summary&&setResumeInfo({
            ...resumeInfo,
            summary:summary
        })
    },[summary])

    const GenerateSummaryFromAI=async()=>{
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result = await AIChatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()));
        setAiGeneratedSummaryList(JSON.parse(result.response.text()));
        setLoading(false);
    }

    const onSave=(e)=>{
       e.preventDefault();
        setLoading(true);

        const data={
            data:{
                summary : summary
            }
        }

        GlobalApi.UpdateResumeDetail(params?.resumeId,data.data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
        },(error)=>{
            setLoading(false);
        })
    }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 gap-5 mt-10'>
      <h2 className='font-bold text-lg'>Summary</h2>
      <p>Add summary (basic introduction) according to your job role</p>

      <form className='mt-7' onSubmit={onSave}>
        <div className='flex justify-between items-end'>
            <label>Add Summary</label>
            <Button variant='outline' onClick={()=>GenerateSummaryFromAI()} type='button' size='sm' 
            className='border-primary text-primary flex gap-2'>
            <Brain className='h-4 w-4'/>Generate summary from AI</Button>
        </div>
        <Textarea className='mt-5' required onChange={(e)=>setSummary(e.target.value)}/>

        <div className='mt-2 flex justify-end'>
        <Button type="submit"
            disabled={loading}>
                {loading?<LoaderCircle  className='animate-spin'/>:'Save'}
            </Button>
        </div>

      </form>

      </div>
      {aiGeneratedSummaryList&& <div>
        <h2 className='font-bold text-lg'>Suggestions</h2>
        {aiGeneratedSummaryList.map((item,index)=>(
            <div>
                <h2 className='font-bold my-1'>{item?.experience_level}</h2>
                <p>{item?.summary}</p>
            </div>
        ))}
        </div>}
      
    </div>
  )
}

export default Summary
