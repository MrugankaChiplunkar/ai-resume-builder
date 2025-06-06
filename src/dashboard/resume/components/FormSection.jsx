// import React, { useState } from 'react';
// import PersonalDetails from './forms/PersonalDetails';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
// import Summary from './forms/Summary';
// import Experience from './forms/Experience';
// import Education from './forms/Education';
// import Skills from './forms/Skills';
// import { Navigate, useParams } from 'react-router-dom';

// function FormSection() {
//     const [activeFormIndex, setActiveFormIndex] = useState(1);
//     const [enabledNext, setEnableNext] = useState(true);
//     const { resumeId } = useParams();

//     return (
//         <div className="p-8 shadow-[0_4px_15px_rgba(255,255,255,0.2)] rounded-xl border border-gray-600 bg-black text-white mt-10 transition-all">
            
//             {/* 🔹 Top Navigation */}
//             <div className="flex justify-between items-center mb-6">
//                 <Button
//                     variant="outline"
//                     size="sm"
//                     className="flex gap-2 border-gray-500 text-white bg-gray-900 hover:bg-gray-700 shadow-lg transition-all"
//                 >
//                     <LayoutGrid />
//                     Theme
//                 </Button>
//                 <div className="flex gap-4">
//                     {activeFormIndex > 1 && (
//                         <Button
//                             size="sm"
//                             onClick={() => setActiveFormIndex(activeFormIndex - 1)}
//                             className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg shadow-lg transition-all flex items-center gap-2"
//                         >
//                             <ArrowLeft className="h-4 w-4" />
//                             Back
//                         </Button>
//                     )}
//                     <Button
//                         disabled={!enabledNext}
//                         className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-lg transition-all ${
//                             enabledNext
//                                 ? 'bg-primary hover:bg-opacity-90 text-white'
//                                 : 'bg-gray-700 text-gray-400 cursor-not-allowed'
//                         }`}
//                         size="sm"
//                         onClick={() => setActiveFormIndex(activeFormIndex + 1)}
//                     >
//                         Next
//                         <ArrowRight className="h-4 w-4" />
//                     </Button>
//                 </div>
//             </div>

//             {/* 🔹 Form Sections */}
//             <div className="mt-5 p-6 shadow-md bg-gray-900 rounded-lg border border-gray-700">
//                 {activeFormIndex === 1 ? (
//                     <PersonalDetails enabledNext={(v) => setEnableNext(v)} />
//                 ) : activeFormIndex === 2 ? (
//                     <Summary enabledNext={(v) => setEnableNext(v)} />
//                 ) : activeFormIndex === 3 ? (
//                     <Experience />
//                 ) : activeFormIndex === 4 ? (
//                     <Education />
//                 ) : activeFormIndex === 5 ? (
//                     <Skills />
//                 ) : activeFormIndex === 6 ? (
//                     <Navigate to={'/my-resume/' + resumeId + '/view'} />
//                 ) : null}
//             </div>
//         </div>
//     );
// }

// export default FormSection;


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PersonalDetails from "./forms/PersonalDetails"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Palette, User, FileText, Briefcase, GraduationCap, Award, Eye } from "lucide-react"
import Summary from "./forms/Summary"
import Experience from "./forms/Experience"
import Education from "./forms/Education"
import Skills from "./forms/Skills"
import { Navigate, useParams } from "react-router-dom"

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enabledNext, setEnableNext] = useState(true)
  const { resumeId } = useParams()

  const formSteps = [
    { id: 1, title: "Personal Details", icon: User, description: "Basic information" },
    { id: 2, title: "Summary", icon: FileText, description: "Professional summary" },
    { id: 3, title: "Experience", icon: Briefcase, description: "Work history" },
    { id: 4, title: "Education", icon: GraduationCap, description: "Educational background" },
    { id: 5, title: "Skills", icon: Award, description: "Technical skills" },
    { id: 6, title: "Preview", icon: Eye, description: "Final review" },
  ]

  const currentStep = formSteps.find((step) => step.id === activeFormIndex)
  const progress = (activeFormIndex / formSteps.length) * 100

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const handleNext = () => {
    if (activeFormIndex < formSteps.length) {
      setActiveFormIndex(activeFormIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (activeFormIndex > 1) {
      setActiveFormIndex(activeFormIndex - 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <currentStep.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentStep.title}</h2>
                  <p className="text-gray-600">{currentStep.description}</p>
                </div>
              </div>

              {/* <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Palette className="w-4 h-4" />
                Theme
              </Button> */}
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  Step {activeFormIndex} of {formSteps.length}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mt-6">
              {formSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`flex flex-col items-center cursor-pointer ${
                    step.id <= activeFormIndex ? "text-blue-600" : "text-gray-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => step.id <= activeFormIndex && setActiveFormIndex(step.id)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all ${
                      step.id === activeFormIndex
                        ? "bg-blue-600 text-white shadow-lg"
                        : step.id < activeFormIndex
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.id < activeFormIndex ? "✓" : step.id}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Form Content */}
      <Card className="border-0  shadow-none  ">
        <CardContent className="p-0 overflow-hidden">
          <AnimatePresence mode="wait" custom={activeFormIndex}>
            <motion.div
              key={activeFormIndex}
              custom={activeFormIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-8"
            >
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
                <Navigate to={"/my-resume/" + resumeId + "/view"} />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Navigation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-between items-center mt-8 p-4"
      >
        <div>
          {activeFormIndex > 1 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm">
            {activeFormIndex === formSteps.length ? "Ready to Preview" : "In Progress"}
          </Badge>

          {activeFormIndex < formSteps.length && (
            <Button
              onClick={handleNext}
              disabled={!enabledNext}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default FormSection
