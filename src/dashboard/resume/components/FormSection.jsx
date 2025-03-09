import React, { useState } from 'react';
import PersonalDetails from './forms/PersonalDetails';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Navigate, useParams } from 'react-router-dom';

function FormSection() {
    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const [enabledNext, setEnableNext] = useState(true);
    const { resumeId } = useParams();

    return (
        <div className="p-8 shadow-[0_4px_15px_rgba(255,255,255,0.2)] rounded-xl border border-gray-600 bg-black text-white mt-10 transition-all">
            
            {/* 🔹 Top Navigation */}
            <div className="flex justify-between items-center mb-6">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-2 border-gray-500 text-white bg-gray-900 hover:bg-gray-700 shadow-lg transition-all"
                >
                    <LayoutGrid />
                    Theme
                </Button>
                <div className="flex gap-4">
                    {activeFormIndex > 1 && (
                        <Button
                            size="sm"
                            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
                            className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg shadow-lg transition-all flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    )}
                    <Button
                        disabled={!enabledNext}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-lg transition-all ${
                            enabledNext
                                ? 'bg-primary hover:bg-opacity-90 text-white'
                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                        size="sm"
                        onClick={() => setActiveFormIndex(activeFormIndex + 1)}
                    >
                        Next
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* 🔹 Form Sections */}
            <div className="mt-5 p-6 shadow-md bg-gray-900 rounded-lg border border-gray-700">
                {activeFormIndex === 1 ? (
                    <PersonalDetails enabledNext={(v) => setEnableNext(v)} />
                ) : activeFormIndex === 2 ? (
                    <Summary enabledNext={(v) => setEnableNext(v)} />
                ) : activeFormIndex === 3 ? (
                    <Experience />
                ) : activeFormIndex === 4 ? (
                    <Education />
                ) : activeFormIndex === 5 ? (
                    <Skills />
                ) : activeFormIndex === 6 ? (
                    <Navigate to={'/my-resume/' + resumeId + '/view'} />
                ) : null}
            </div>
        </div>
    );
}

export default FormSection;
