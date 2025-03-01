import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router'
import GlobalApi from './../../../../../services/GlobalApi'

function Skills() {

    const[skillsList,setSkillsList] = useState([
        {
            name:' ',
            rating:0
        }
    ]);

    const[loading,setLoading] = useState(false);

    const{resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);

    const{resumeId} = useParams();

    const handleChange=(index,name,value)=>{
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const AddSkill=()=>{
        setSkillsList([...skillsList,{
        name:'',
        rating:0
    }])
    };

    const RemoveSkill=()=>{
       setSkillsList(skillsList=>skillsList.slice(0,-1)); 
    };

    const onSave=()=>{
        setLoading(true);
        const data = {
            data : {
                skills:skillsList
            }
        }
        GlobalApi.UpdateResumeDetail(resumeId,data.data).then(resp=>{
                    console.log(resp);
                    setLoading(false);
                    toast("Details Updated");
                },(error)=>{
                    setLoading(false);
                })
        }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })    
    },[skillsList])
    

  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 gap-5 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add your key skills</p>
            <div>
                {skillsList.map((item,index)=>(
                    <div className='flex justify-between mt-3 border rounded-lg p-3'>
                        <div>
                            <label>Skill</label>
                            <Input className='w-full' onChange={(e)=>handleChange(index,'name',e.target.value)}/>
                        </div>
                        <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v)=>handleChange(index,'rating',v)} />
                    </div>
                ))}
            </div>
            <div className='flex justify-between mt-5'>
                    <div className='flex gap-2'>
                        <Button variant='outline' onClick={AddSkill} className='text-primary'>+ Add Skill</Button>
                        <Button variant='outline' onClick={RemoveSkill} className='text-primary'>- Remove Skill</Button>
                    </div>
                    <Button type='submit' disabled={loading} onClick={()=>onSave()}>
                        {loading?<LoaderCircle className='animate-spin'/> : 'Save'}
                    </Button>
            </div>
        </div>
    </div>
  )
}

export default Skills
