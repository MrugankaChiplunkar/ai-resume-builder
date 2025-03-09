import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router';
import GlobalApi from './../../../../../services/GlobalApi';

function Skills() {
    const [skillsList, setSkillsList] = useState([
        {
            name: '',
            rating: 0
        }
    ]);

    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams();

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const AddSkill = () => {
        setSkillsList([...skillsList, { name: '', rating: 0 }]);
    };

    const RemoveSkill = () => {
        setSkillsList(skillsList.slice(0, -1));
    };

    const onSave = () => {
        setLoading(true);
        const data = { data: { skills: skillsList } };

        GlobalApi.UpdateResumeDetail(resumeId, data.data)
            .then(resp => {
                console.log(resp);
                setLoading(false);
                toast("Details Updated");
            })
            .catch(error => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        });
    }, [skillsList]);

    return (
        <div className="p-6 shadow-2xl rounded-xl border border-gray-700 bg-black text-white mt-10">
            <h2 className="font-bold text-xl">Skills</h2>
            <p className="text-gray-400">Add your key skills</p>

            <div className="mt-5">
                {skillsList.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-md mt-3">
                        <div className="w-full">
                            <label className="text-white-400">Skill</label>
                            <Input 
                                className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-lg shadow-md" 
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <Rating 
                            style={{ maxWidth: 120 }} 
                            value={item.rating} 
                            onChange={(v) => handleChange(index, 'rating', v)} 
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-5">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={AddSkill} className="border-gray-500 text-white bg-gray-900 hover:bg-gray-700">
                        + Add Skill
                    </Button>
                    <Button variant="outline" onClick={RemoveSkill} className="border-gray-500 text-white bg-gray-900 hover:bg-gray-700">
                        - Remove Skill
                    </Button>
                </div>
                <Button 
                    type="submit" 
                    disabled={loading} 
                    onClick={onSave} 
                    className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-lg shadow-md"
                >
                    {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Skills;
