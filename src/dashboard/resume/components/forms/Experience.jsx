import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router';
import GlobalApi from './../../../../../services/GlobalApi';
import { LoaderCircle } from 'lucide-react';

function Experience() {
    const formField = {
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        workSummary: ''
    };

    const [experienceList, setExperienceList] = useState([formField]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams(); 
    const [loading, setLoading] = useState(false);

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
        if (experienceList.length > 1) {
            setExperienceList(prevList => prevList.slice(0, -1));
        }
    };

    const handleRichTextEditor = (value, name, index) => {
        setExperienceList(prevList => {
            const newList = [...prevList];
            newList[index] = { ...newList[index], [name]: value };
            return newList;
        });
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: { experience: experienceList }
        };
        GlobalApi.UpdateResumeDetail(params?.resumeId, data.data)
            .then(resp => {
                console.log(resp);
                setLoading(false);
                toast("Details Updated");
            })
            .catch(error => {
                setLoading(false);
                console.error("Error updating experience:", error);
            });
    };

    useEffect(() => {
        setResumeInfo(prev => ({ ...prev, experience: experienceList }));
    }, [experienceList]);

    return (
        <div className="p-6 rounded-lg bg-gray-900 shadow-[8px_8px_15px_rgba(255,255,255,0.1)] border border-gray-700 mt-10">
            <h2 className="text-2xl font-bold text-white">Work Experience</h2>
            <p className="text-gray-400">Add your professional experience</p>

            <div>
                {experienceList.map((item, index) => (
                    <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-700 mt-5 transition-all hover:shadow-2xl">
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <label className="text-white">Position</label>
                            <label className="text-white">Company Name</label>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <Input className="bg-gray-700 text-white" name="title" value={item.title} onChange={(event) => handleChange(index, event)} />
                            <Input className="bg-gray-700 text-white" name="companyName" value={item.companyName} onChange={(event) => handleChange(index, event)} />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <label className="text-white">City</label>
                            <label className="text-white">State</label>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <Input className="bg-gray-700 text-white" name="city" value={item.city} onChange={(event) => handleChange(index, event)} />
                            <Input className="bg-gray-700 text-white" name="state" value={item.state} onChange={(event) => handleChange(index, event)} />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <label className="text-white">Start Date</label>
                            <label className="text-white">End Date</label>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <Input className="bg-gray-700 text-white" type="date" name="startDate" value={item.startDate} onChange={(event) => handleChange(index, event)} />
                            <Input className="bg-gray-700 text-white" type="date" name="endDate" value={item.endDate} onChange={(event) => handleChange(index, event)} />
                        </div>

                        <div className="col-span-2 mt-3">
                            <RichTextEditor
                                index={index}
                                onRichTextEditorChange={(value) => handleRichTextEditor(value, 'workSummary', index)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <br />
            <div className="flex justify-between mt-5">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={AddNewExperience} className="text-blue-400 border border-blue-400 hover:bg-blue-500 hover:text-white transition-all">
                        + Add Experience
                    </Button>
                    <Button variant="outline" onClick={RemoveExperience} className="text-red-400 border border-red-400 hover:bg-red-500 hover:text-white transition-all">
                        - Remove Experience
                    </Button>
                </div>
                <Button
                    disabled={loading}
                    onClick={onSave}
                    className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
                >
                    {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Experience;
