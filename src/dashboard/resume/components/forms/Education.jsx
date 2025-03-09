import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import GlobalApi from './../../../../../services/GlobalApi'

function Education() {
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ]);

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    const handleChange = (event, index) => {
        const newEntries = [...educationalList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    };

    const AddNewEducation = () => {
        setEducationalList([...educationalList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }]);
    };

    const RemoveEducation = () => {
        if (educationalList.length > 1) {
            setEducationalList(educationalList.slice(0, -1));
        }
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: { education: educationalList }
        };

        GlobalApi.UpdateResumeDetail(params?.resumeId, data.data).then(resp => {
            console.log(resp);
            setLoading(false);
            toast("Details Updated");
        }).catch(() => setLoading(false));
    };

    useEffect(() => {
        setResumeInfo({ ...resumeInfo, education: educationalList });
    }, [educationalList]);

    return (
        <div className="p-6 bg-gray-900/80 border border-gray-700 rounded-xl shadow-xl 
                        backdrop-blur-lg text-white mt-10">
            <h2 className="text-2xl font-bold text-white">Educational Details</h2>
            <p className="text-gray-300 mb-4">Add your educational details</p>

            {educationalList.map((item, index) => (
                <div key={index} className="p-5 bg-gray-800 rounded-lg shadow-lg mb-5">
                    <div className="space-y-3">
                        <div>
                            <label className="text-white-400">University Name</label>
                            <Input className="bg-gray-700 text-white" name="universityName" onChange={(e) => handleChange(e, index)} />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-white-400">Degree</label>
                                <Input className="bg-gray-700 text-white" name="degree" onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div>
                                <label className="text-white-400">Major</label>
                                <Input className="bg-gray-700 text-white" name="major" onChange={(e) => handleChange(e, index)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-white-400">Start Date</label>
                                <Input className="bg-gray-700 text-white" type="date" name="startDate" onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div>
                                <label className="text-white-400">End Date</label>
                                <Input className="bg-gray-700 text-white" type="date" name="endDate" onChange={(e) => handleChange(e, index)} />
                            </div>
                        </div>

                        <div>
                            <label className="text-white-400">Description</label>
                            <Textarea className="bg-gray-700 text-white" name="description" onChange={(e) => handleChange(e, index)} />
                        </div>
                    </div>
                </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-between mt-5">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={AddNewEducation} className="border-blue-500 text-blue-400">
                        + Add Education
                    </Button>
                    <Button variant="outline" onClick={RemoveEducation} className="border-red-500 text-red-400">
                        - Remove Education
                    </Button>
                </div>
                <Button type="submit" disabled={loading} onClick={onSave} className="bg-blue-500 hover:bg-blue-600 text-white">
                    {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Education;
