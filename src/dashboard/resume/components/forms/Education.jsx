import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { data, useParams } from 'react-router'
import GlobalApi from './../../../../../services/GlobalApi'

function Education() {

    const[educationalList,setEducationalList] = useState([
        {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }
    ])

    const{resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const params = useParams();

    const handleChange=(event,index)=>{
        const newEntries = educationalList.slice();
        const{name,value} = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    }

    const[loading,setLoading] = useState(false);

    const AddNewEducation=()=>{
        setEducationalList([...educationalList,{
                universityName:'',
                degree:'',
                major:'',
                startDate:'',
                endDate:'',
                description:''
        }])
    }

    const RemoveEducation=()=>{
        setEducationalList(educationalList=>educationalList.slice(0,-1));
    }

    const onSave=()=>{
        setLoading(true);
        const data={
            data:{
                education:educationalList
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data.data).then(resp=>{
            console.log(resp);
            setLoading(false);
            toast("Details Updated");
        },(error)=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education:educationalList 
        })
    },[educationalList])

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 gap-5 mt-10'>
      <h2 className='font-bold text-lg'>Educational Details</h2>
      <p>Add your educational details</p>
      <div>
        {educationalList.map((item,index)=>(
            <div className='border rounded-lg m-5 p-5'>
                <div>
                    <div className='col-span-2'>
                        <label>University Name</label>
                        <Input name='universityName' onChange={(e)=>handleChange(e,index)}/>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-3'>
                        <label>Degree</label>
                        <label>Major</label>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-3'>
                    <Input name='degree' onChange={(e)=>handleChange(e,index)}/>
                    <Input name='major' onChange={(e)=>handleChange(e,index)}/>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-3'>
                    <label>Start Date</label>
                    <label>End Date</label>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-3'>
                    <Input type='date' name='startDate' onChange={(e)=>handleChange(e,index)}/>
                    <Input type='date' name='endDate' onChange={(e)=>handleChange(e,index)}/>
                    </div>
                    <div className='col-span-2 mt-3'>
                        <label>Description</label>
                        <Textarea naxme='description' onChange={(e)=>handleChange(e,index)}/>
                    </div>
                </div>
            </div>
        ))}
        <div className='flex justify-between mt-5'>
                    <div className='flex gap-2'>
                        <Button variant='outline' onClick={AddNewEducation} className='text-primary'>+ Add Education</Button>
                        <Button variant='outline' onClick={RemoveEducation} className='text-primary'>- Remove Education</Button>
                    </div>
                    <Button type='submit' disabled={loading} onClick={()=>onSave()}>
                        {loading?<LoaderCircle className='animate-spin'/> : 'Save'}
                    </Button>
                </div>

    </div>
      </div> 
      
      </div>
      
  )
}

export default Education
