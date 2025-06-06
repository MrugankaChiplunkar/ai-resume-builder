// import { Button } from '@/components/ui/button' 
// import { Textarea } from '@/components/ui/textarea'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import GlobalApi from './../../../../../services/GlobalApi';
// import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from './../../../../../services/AIModel';

// const prompt = "Job Title: {jobTitle}, Depending on the Job Title give me summary for my resume within 4-5 lines in JSON format with field experience level and summary with experience level for Fresher, Mid-Level, Experienced"

// function Summary({ enabledNext }) {
//     const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//     const [summary, setSummary] = useState('');
//     const [loading, setLoading] = useState(false);
//     const params = useParams();
//     const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

//     useEffect(() => {
//         if (summary) {
//             setResumeInfo({
//                 ...resumeInfo,
//                 summary: summary
//             });
//         }
//     }, [summary]);

//     const GenerateSummaryFromAI = async () => {
//         setLoading(true);
//         const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
//         console.log(PROMPT);
//         const result = await AIChatSession.sendMessage(PROMPT);
//         const responseText = JSON.parse(result.response.text());
//         console.log(responseText);
//         setAiGeneratedSummaryList(responseText);
//         setLoading(false);
//     };

//     const onSave = (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const data = {
//             data: { summary }
//         };

//         GlobalApi.UpdateResumeDetail(params?.resumeId, data.data).then(resp => {
//             console.log(resp);
//             enabledNext(true);
//             setLoading(false);
//         }).catch(error => {
//             setLoading(false);
//         });
//     };

//     return (
//         <div className="p-6 shadow-2xl rounded-xl border border-gray-700 bg-black text-white mt-10">
//             <h2 className="font-bold text-xl">Summary</h2>
//             <p className="text-gray-400">Add a brief summary based on your job role.</p>

//             <form className="mt-7 " onSubmit={onSave}>
//                 <div className="flex justify-between items-end">
//                     <label className="text-white">Add Summary</label>
//                     <Button 
//                         variant="outline" 
//                         onClick={GenerateSummaryFromAI} 
//                         type="button" 
//                         size="sm" 
//                         className="border-gray-500 text-white flex gap-2 bg-gray-800 hover:bg-gray-700"
//                     >
//                         <Brain className="h-4 w-4 text-primary bg-gray-300" />Generate Summary with AI
//                     </Button>
//                 </div>
//                 <Textarea 
//                     className="mt-5 bg-gray-900 border-gray-700 text-white placeholder-gray-500 rounded-lg shadow-md" 
//                     required 
//                     onChange={(e) => setSummary(e.target.value)}
//                 />

//                 <div className="mt-2 flex justify-end">
//                     <Button type="submit" disabled={loading} className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-lg shadow-md">
//                         {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
//                     </Button>
//                 </div>
//             </form>

//             {aiGeneratedSummaryList.length > 0 && (
//                 <div className="mt-6">
//                     <h2 className="font-bold text-lg ">AI-Generated Suggestions</h2>
//                     {aiGeneratedSummaryList.map((item, index) => (
//                         <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md mt-3">
//                             <h3 className="font-semibold text-white">{item.experience_level}</h3>
//                             <p className="text-gray-300">{item.summary}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Summary;
"use client"

import { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { useParams } from "react-router"
// import GlobalApi from "./../../../../../../services/GlobalApi"
import { Brain, Loader2, FileText, Sparkles } from "lucide-react"
// import { AIChatSession } from "./../../../../../../services/AIModel"
import { toast } from "sonner"

const prompt =
  "Job Title: {jobTitle}, Depending on the Job Title give me summary for my resume within 4-5 lines in JSON format with field experience level and summary with experience level for Fresher, Mid-Level, Experienced"

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const params = useParams()
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([])

  useEffect(() => {
    if (summary) {
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      })
    }
  }, [summary])

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast.error("Please add a job title first")
      return
    }

    setAiLoading(true)
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle)

    try {
      const result = await AIChatSession.sendMessage(PROMPT)
      const responseText = JSON.parse(result.response.text())
      setAiGeneratedSummaryList(responseText)
      toast.success("AI suggestions generated!")
    } catch (error) {
      console.error("Error generating AI summary:", error)
      toast.error("Failed to generate AI suggestions")
    }

    setAiLoading(false)
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      data: { summary },
    }

    GlobalApi.UpdateResumeDetail(params?.resumeId, data.data)
      .then((resp) => {
        enabledNext(true)
        setLoading(false)
        toast.success("Summary updated successfully!")
      })
      .catch((error) => {
        setLoading(false)
        toast.error("Failed to update summary")
      })
  }

  const selectAISummary = (selectedSummary) => {
    setSummary(selectedSummary)
    setResumeInfo({
      ...resumeInfo,
      summary: selectedSummary,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="border shadow-none">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            Professional Summary
          </CardTitle>
          <p className="text-gray-600 ml-13">Write a compelling summary that highlights your key strengths</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSave} className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Summary</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={GenerateSummaryFromAI}
                  disabled={aiLoading}
                  className="flex items-center gap-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
                  Generate with AI
                </Button>
              </div>

              <Textarea
                placeholder="Write a brief professional summary that highlights your experience, skills, and career objectives..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="min-h-[120px] border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                required
              />

              <div className="text-sm text-gray-500">{summary.length}/500 characters</div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-end"
            >
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 h-12"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save & Continue"
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      {/* AI Generated Suggestions */}
      {aiGeneratedSummaryList.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI-Generated Suggestions
              </CardTitle>
              <p className="text-sm text-gray-600">Click on any suggestion to use it</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiGeneratedSummaryList.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 cursor-pointer transition-all hover:shadow-md"
                    onClick={() => selectAISummary(item.summary)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        {item.experience_level}
                      </Badge>
                      <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700">
                        Use This
                      </Button>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.summary}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Summary
