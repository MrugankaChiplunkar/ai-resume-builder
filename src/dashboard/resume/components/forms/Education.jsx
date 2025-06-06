// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import { LoaderCircle } from 'lucide-react'
// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router'
// import GlobalApi from './../../../../../services/GlobalApi'

// function Education() {
//     const [educationalList, setEducationalList] = useState([
//         {
//             universityName: '',
//             degree: '',
//             major: '',
//             startDate: '',
//             endDate: '',
//             description: ''
//         }
//     ]);

//     const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//     const params = useParams();
//     const [loading, setLoading] = useState(false);

//     const handleChange = (event, index) => {
//         const newEntries = [...educationalList];
//         const { name, value } = event.target;
//         newEntries[index][name] = value;
//         setEducationalList(newEntries);
//     };

//     const AddNewEducation = () => {
//         setEducationalList([...educationalList, {
//             universityName: '',
//             degree: '',
//             major: '',
//             startDate: '',
//             endDate: '',
//             description: ''
//         }]);
//     };

//     const RemoveEducation = () => {
//         if (educationalList.length > 1) {
//             setEducationalList(educationalList.slice(0, -1));
//         }
//     };

//     const onSave = () => {
//         setLoading(true);
//         const data = {
//             data: { education: educationalList }
//         };

//         GlobalApi.UpdateResumeDetail(params?.resumeId, data.data).then(resp => {
//             console.log(resp);
//             setLoading(false);
//             toast("Details Updated");
//         }).catch(() => setLoading(false));
//     };

//     useEffect(() => {
//         setResumeInfo({ ...resumeInfo, education: educationalList });
//     }, [educationalList]);

//     return (
//         <div className="p-6 bg-gray-900/80 border border-gray-300 rounded-xl shadow-xl 
//                         backdrop-blur-lg text-white mt-10">
//             <h2 className="text-2xl font-bold text-white">Educational Details</h2>
//             <p className="text-gray-900 mb-4">Add your educational details</p>

//             {educationalList.map((item, index) => (
//                 <div key={index} className="p-5 bg-gray-800 rounded-lg shadow-lg mb-5">
//                     <div className="space-y-3">
//                         <div>
//                             <label className="text-white-400">University Name</label>
//                             <Input className="bg-gray-700 text-white" name="universityName" onChange={(e) => handleChange(e, index)} />
//                         </div>

//                         <div className="grid grid-cols-2 gap-3">
//                             <div>
//                                 <label className="text-white-400">Degree</label>
//                                 <Input className="bg-gray-700 text-white" name="degree" onChange={(e) => handleChange(e, index)} />
//                             </div>
//                             <div>
//                                 <label className="text-white-400">Major</label>
//                                 <Input className="bg-gray-700 text-white" name="major" onChange={(e) => handleChange(e, index)} />
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-3">
//                             <div>
//                                 <label className="text-white-400">Start Date</label>
//                                 <Input className="bg-gray-700 text-white" type="date" name="startDate" onChange={(e) => handleChange(e, index)} />
//                             </div>
//                             <div>
//                                 <label className="text-white-400">End Date</label>
//                                 <Input className="bg-gray-700 text-white" type="date" name="endDate" onChange={(e) => handleChange(e, index)} />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="text-white-400">Description</label>
//                             <Textarea className="bg-gray-700 text-white" name="description" onChange={(e) => handleChange(e, index)} />
//                         </div>
//                     </div>
//                 </div>
//             ))}

//             {/* Buttons */}
//             <div className="flex justify-between mt-5">
//                 <div className="flex gap-2">
//                     <Button variant="outline" onClick={AddNewEducation} className="border-blue-500 text-blue-400">
//                         + Add Education
//                     </Button>
//                     <Button variant="outline" onClick={RemoveEducation} className="border-red-500 text-red-400">
//                         - Remove Education
//                     </Button>
//                 </div>
//                 <Button type="submit" disabled={loading} onClick={onSave} className="bg-blue-500 hover:bg-blue-600 text-white">
//                     {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default Education;
"use client"

import { useContext, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { useParams } from "react-router"
import GlobalApi from "./../../../../../services/GlobalApi"
import { Loader2, GraduationCap, Plus, Trash2, Building, BookOpen, Calendar, FileText } from "lucide-react"
import { toast } from "sonner"

function Education() {
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ])

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()
  const [loading, setLoading] = useState(false)

  const handleChange = (event, index) => {
    const newEntries = [...educationalList]
    const { name, value } = event.target
    newEntries[index][name] = value
    setEducationalList(newEntries)
  }

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const RemoveEducation = (index) => {
    if (educationalList.length > 1) {
      setEducationalList(educationalList.filter((_, i) => i !== index))
    }
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: { education: educationalList },
    }

    GlobalApi.UpdateResumeDetail(params?.resumeId, data.data)
      .then((resp) => {
        console.log(resp)
        setLoading(false)
        toast.success("Education details updated successfully!")
      })
      .catch(() => {
        setLoading(false)
        toast.error("Failed to update education details")
      })
  }

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education: educationalList })
  }, [educationalList])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="border-0  text-gray-700">
        <CardHeader className="pb-6 border-b border-gray-800">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            Educational Details
          </CardTitle>
          <p className="text-gray-400">Add your academic background and qualifications</p>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <AnimatePresence>
            {educationalList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border border-gray-300   mb-5 overflow-hidden">
                  <CardHeader className="pb-4 ">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="b text-black border border-blue-700/50">
                        Education {index + 1}
                      </Badge>
                      {educationalList.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => RemoveEducation(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-4">
                    <div>
                      <Label className="text-gray-text-gray-700 flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-blue-400" />
                        University/Institution Name
                      </Label>
                      <Input
                        className="bg-gray-100 border-gray-300 text-white focus:border-blue-500 focus:ring-blue-500"
                        name="universityName"
                        value={item.universityName}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Harvard University"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-900 flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-blue-400" />
                          Degree
                        </Label>
                        <Input
                          className="bg-gray-100 border-gray-300 text-white focus:border-blue-500 focus:ring-blue-500"
                          name="degree"
                          value={item.degree}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-900 flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-blue-400" />
                          Major/Field of Study
                        </Label>
                        <Input
                          className="bg-gray-100 border-gray-300 text-white focus:border-blue-500 focus:ring-blue-500"
                          name="major"
                          value={item.major}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="Computer Science"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-900 flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          Start Date
                        </Label>
                        <Input
                          className="bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
                          type="date"
                          name="startDate"
                          value={item.startDate}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                      <div>
                        <Label className="text-gray-900 flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          End Date
                        </Label>
                        <Input
                          className="bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
                          type="date"
                          name="endDate"
                          value={item.endDate}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-900 flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-blue-400" />
                        Description
                      </Label>
                      <Textarea
                        className="bg-gray-100 border-gray-300 text-white focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                        name="description"
                        value={item.description}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Describe your academic achievements, relevant coursework, or projects..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={AddNewEducation}
              className="flex items-center gap-2 border-blue-500 text-blue-400 hover:bg-blue-900/20"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </Button>

            <Button
              onClick={onSave}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Education"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Education
