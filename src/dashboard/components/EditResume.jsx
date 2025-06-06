// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router'
// import FormSection from '../resume/components/FormSection';
// import ResumePreview from '../resume/components/ResumePreview';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import dummy from '@/data/dummy';
// import GlobalApi from './../../../services/GlobalApi';

// function EditResume() {
//   const {resumeId} = useParams();
//   const[resumeInfo, setResumeInfo] = useState({});

//   useEffect(()=>{
//     GetResumeInfo();
//     }, [])

//     const GetResumeInfo=()=>{
//       GlobalApi.GetResumeById(resumeId).then(resp=>{
//         console.log(resp.data.data); 
//         setResumeInfo(resp.data.data);
//       })
//     }

//   return (
//     <ResumeInfoContext.Provider value = {{resumeInfo,setResumeInfo}}>
    
//     <div className='grid p-10 grid-cols-1 md:grid-cols-2 gap-5'>
        
//     {/* Form Section */}
//     <FormSection />
//     {/* Preview Section */}
//     <ResumePreview />
  
//     </div>
//     </ResumeInfoContext.Provider>
//   )
// }

// export default EditResume


"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { motion } from "framer-motion"
import FormSection from "../resume/components/FormSection"
import ResumePreview from "../resume/components/ResumePreview"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, Sparkles, Save } from "lucide-react"
import GlobalApi from "./../../../services/GlobalApi"

function EditResume() {
  const { resumeId } = useParams()
  const [resumeInfo, setResumeInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    GetResumeInfo()
  }, [])

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId)
      .then((resp) => {
        console.log(resp.data.data)
        setResumeInfo(resp.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching resume:", error)
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header Skeleton */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div>
                <Skeleton className="w-48 h-6 mb-2" />
                <Skeleton className="w-32 h-4" />
              </div>
            </div>
            <Skeleton className="w-24 h-10" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <Card className="p-6">
              <Skeleton className="w-full h-96" />
            </Card>
            <Card className="p-6">
              <Skeleton className="w-full h-96" />
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{resumeInfo?.title || "Untitled Resume"}</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI-Powered
                    </Badge>
                    <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-green-600 border-green-200">
                  <Save className="w-3 h-3 mr-1" />
                  Auto-saved
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 md:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <FormSection />
              </Card>
            </motion.div>

            {/* Preview Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:sticky lg:top-24 lg:h-fit"
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <ResumePreview />
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
