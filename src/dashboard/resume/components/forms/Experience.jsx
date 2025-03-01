import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { data, useParams } from 'react-router'
import GlobalApi from './../../../../../services/GlobalApi'
import { LoaderCircle } from 'lucide-react'

function Experience() {
    const [experienceList, setExperienceList] = useState([
        {
            title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        workSummary: ''
        }
    ]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams(); 
    const[loading,setLoading] = useState(false);   

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        setExperienceList(prevList => {
            const newList = [...prevList];
            newList[index] = { ...newList[index], [name]: value };
            return newList;
        });
    };

    const AddNewExperience = () => {
        setExperienceList(prevList => [...prevList, { ...formField }]);
    };

    const RemoveExperience = () => {
        setExperienceList(prevList => prevList.slice(0, -1));
    };

    const handleRichTextEditor = (value, name, index) => {
        setExperienceList(prevList => {
            const newList = [...prevList];
            newList[index] = { ...newList[index], [name]: value };
            return newList;
        });
    };

    const onSave=()=>{
        setLoading(true);
        const data={
            data:{
            experience:experienceList    
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

    useEffect(() => {
        setResumeInfo(prev => ({ ...prev, experience: experienceList }));
    }, [experienceList]);

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 gap-5 mt-10'>
                <h2 className='font-bold text-lg'>Work Experience</h2>
                <p>Add your professional experience till now</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='border rounded-lg m-5 p-5'>
                                <div className='grid grid-cols-2 gap-3 mt-3'>
                                    <label className='text-md'>Position</label>
                                    <label className='text-md'>Company Name</label>
                                </div>
                                <div className='grid grid-cols-2 gap-3 mt-3'>
                                    <Input name='title' value={item.title} onChange={(event) => handleChange(index, event)} />
                                    <Input name='companyName' value={item.companyName} onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div className='grid grid-cols-2 gap-3 mt-3'>
                                    <label className='text-md'>City</label>
                                    <label className='text-md'>State</label>
                                </div>
                                <div className='grid grid-cols-2 gap-3 mt-3'>
                                    <Input name='city' value={item.city} onChange={(event) => handleChange(index, event)} />
                                    <Input name='state' value={item.state} onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div className='grid grid-cols-2 gap-3 mt-3'>
                                    <label className='text-md'>Start Date</label>
                                    <label className='text-md'>End Date</label>
                                </div>
                                <div className='grid grid-cols-2 gap-3 mt-3'>
                                    <Input type="date" name='startDate' value={item.startDate} onChange={(event) => handleChange(index, event)} />
                                    <Input type="date" name='endDate' value={item.endDate} onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div className='col-span-2 mt-3'>
                                    <RichTextEditor
                                        index={index}
                                        onRichTextEditorChange={(value) => handleRichTextEditor(value, 'workSummary', index)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <br />
                <div className='flex justify-between mt-5'>
                    <div className='flex gap-2'>
                        <Button variant='outline' onClick={AddNewExperience} className='text-primary'>+ Add Experience</Button>
                        <Button variant='outline' onClick={RemoveExperience} className='text-primary'>- Remove Experience</Button>
                    </div>
                    <Button disabled={loading} onClick={()=>onSave()}>
                        {loading?<LoaderCircle className='animate-spin'/> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Experience;