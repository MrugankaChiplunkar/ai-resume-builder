import { Button } from '@/components/ui/button' 
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GlobalApi from './../../../../../services/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from './../../../../../services/AIModel';

const prompt = "Job Title: {jobTitle}, Depending on the Job Title give me summary for my resume within 4-5 lines in JSON format with field experience level and summary with experience level for Fresher, Mid-Level, Experienced"

function Summary({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

    useEffect(() => {
        if (summary) {
            setResumeInfo({
                ...resumeInfo,
                summary: summary
            });
        }
    }, [summary]);

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result = await AIChatSession.sendMessage(PROMPT);
        const responseText = JSON.parse(result.response.text());
        console.log(responseText);
        setAiGeneratedSummaryList(responseText);
        setLoading(false);
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: { summary }
        };

        GlobalApi.UpdateResumeDetail(params?.resumeId, data.data).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        });
    };

    return (
        <div className="p-6 shadow-2xl rounded-xl border border-gray-700 bg-black text-white mt-10">
            <h2 className="font-bold text-xl">Summary</h2>
            <p className="text-gray-400">Add a brief summary based on your job role.</p>

            <form className="mt-7 " onSubmit={onSave}>
                <div className="flex justify-between items-end">
                    <label className="text-white">Add Summary</label>
                    <Button 
                        variant="outline" 
                        onClick={GenerateSummaryFromAI} 
                        type="button" 
                        size="sm" 
                        className="border-gray-500 text-white flex gap-2 bg-gray-800 hover:bg-gray-700"
                    >
                        <Brain className="h-4 w-4 text-primary bg-gray-300" />Generate Summary with AI
                    </Button>
                </div>
                <Textarea 
                    className="mt-5 bg-gray-900 border-gray-700 text-white placeholder-gray-500 rounded-lg shadow-md" 
                    required 
                    onChange={(e) => setSummary(e.target.value)}
                />

                <div className="mt-2 flex justify-end">
                    <Button type="submit" disabled={loading} className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-lg shadow-md">
                        {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                    </Button>
                </div>
            </form>

            {aiGeneratedSummaryList.length > 0 && (
                <div className="mt-6">
                    <h2 className="font-bold text-lg ">AI-Generated Suggestions</h2>
                    {aiGeneratedSummaryList.map((item, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md mt-3">
                            <h3 className="font-semibold text-white">{item.experience_level}</h3>
                            <p className="text-gray-300">{item.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summary;
