import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import GlobalApi from './../../../../../services/GlobalApi';

function PersonalDetails({enabledNext}){

    const params= useParams();
    const{resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const[formData,setFormData] = useState();
    const[loading, setLoading] = useState(false);

    useEffect(()=>{
        console.log(params);
    },[])

    const handleInputChange=(e)=>{
        enabledNext(false);   
        const{name,value} = e.target; 

        setFormData({
            ...formData,
            [name]:value
        })

        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }
    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true);

        const data={
            data:formData
        }

        GlobalApi.UpdateResumeDetail(params?.resumeId,data.data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details Updated");
        },(error)=>{
            setLoading(false);
        })
    }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 gap-5 mt-10'>
      <h2 className='font-bold text-lg'>Personal Details</h2>
      <p>Get started with the basic information</p>

      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
            <label className='text-sm'>First Name</label>
            <label className='text-sm'>Last Name</label>
        </div>
        <div className='grid grid-cols-2 gap-3'>
        <Input name='firstName' required onChange={handleInputChange}/>
        <Input name='lastName' required onChange={handleInputChange}/>
        </div>
        <div className='col-span-2 mt-5'>
            <label className='text-sm'>Job Title</label>
            <Input name='jobTitle' required onChange={handleInputChange}/>
        </div>
        <div className='col-span-2 mt-5'>
            <label className='text-sm'>Address</label>
            <Input name='address' required onChange={handleInputChange}/>
        </div>
        <div className='grid grid-cols-2 mt-5 gap-3'>
            <label className='text-sm'>Phone</label>
            <label className='text-sm'>Email</label>
        </div>
        <div className='grid grid-cols-2 gap-3'>
        <Input name='phone' required onChange={handleInputChange}/>
        <Input name='email' required onChange={handleInputChange}/>
        </div>
        <div className='mt-5 flex justify-end'>
            <Button type="submit"
            disabled={loading}>
                {loading?<LoaderCircle  className='animate-spin'/>:'Save'}
            </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetails
