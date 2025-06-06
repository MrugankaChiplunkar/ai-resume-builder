// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import React, { useContext, useEffect, useState } from 'react';
// import RichTextEditor from '../RichTextEditor';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import { useParams } from 'react-router';
import GlobalApi from './../../../../../services/GlobalApi';
// import { LoaderCircle } from 'lucide-react';

// function Experience() {
//     const formField = {
//         title: '',
//         companyName: '',
//         city: '',
//         state: '',
//         startDate: '',
//         endDate: '',
//         workSummary: ''
//     };

//     const [experienceList, setExperienceList] = useState([formField]);
//     const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//     const params = useParams(); 
//     const [loading, setLoading] = useState(false);

//     const handleChange = (index, event) => {
//         const { name, value } = event.target;
//         setExperienceList(prevList => {
//             const newList = [...prevList];
//             newList[index] = { ...newList[index], [name]: value };
//             return newList;
//         });
//     };

//     const AddNewExperience = () => {
//         setExperienceList(prevList => [...prevList, { ...formField }]);
//     };

//     const RemoveExperience = () => {
//         if (experienceList.length > 1) {
//             setExperienceList(prevList => prevList.slice(0, -1));
//         }
//     };

//     const handleRichTextEditor = (value, name, index) => {
//         setExperienceList(prevList => {
//             const newList = [...prevList];
//             newList[index] = { ...newList[index], [name]: value };
//             return newList;
//         });
//     };

//     const onSave = () => {
//         setLoading(true);
//         const data = {
//             data: { experience: experienceList }
//         };
//         GlobalApi.UpdateResumeDetail(params?.resumeId, data.data)
//             .then(resp => {
//                 console.log(resp);
//                 setLoading(false);
//                 toast("Details Updated");
//             })
//             .catch(error => {
//                 setLoading(false);
//                 console.error("Error updating experience:", error);
//             });
//     };

//     useEffect(() => {
//         setResumeInfo(prev => ({ ...prev, experience: experienceList }));
//     }, [experienceList]);

//     return (
//         <div className="p-6 rounded-lg bg-gray-900 shadow-[8px_8px_15px_rgba(255,255,255,0.1)] border border-gray-700 mt-10">
//             <h2 className="text-2xl font-bold text-white">Work Experience</h2>
//             <p className="text-gray-400">Add your professional experience</p>

//             <div>
//                 {experienceList.map((item, index) => (
//                     <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-700 mt-5 transition-all hover:shadow-2xl">
//                         <div className="grid grid-cols-2 gap-3 mt-3">
//                             <label className="text-white">Position</label>
//                             <label className="text-white">Company Name</label>
//                         </div>
//                         <div className="grid grid-cols-2 gap-3 mt-3">
//                             <Input className="bg-gray-700 text-white" name="title" value={item.title} onChange={(event) => handleChange(index, event)} />
//                             <Input className="bg-gray-700 text-white" name="companyName" value={item.companyName} onChange={(event) => handleChange(index, event)} />
//                         </div>

//                         <div className="grid grid-cols-2 gap-3 mt-3">
//                             <label className="text-white">City</label>
//                             <label className="text-white">State</label>
//                         </div>
//                         <div className="grid grid-cols-2 gap-3 mt-3">
//                             <Input className="bg-gray-700 text-white" name="city" value={item.city} onChange={(event) => handleChange(index, event)} />
//                             <Input className="bg-gray-700 text-white" name="state" value={item.state} onChange={(event) => handleChange(index, event)} />
//                         </div>

//                         <div className="grid grid-cols-2 gap-3 mt-3">
//                             <label className="text-white">Start Date</label>
//                             <label className="text-white">End Date</label>
//                         </div>
//                         <div className="grid grid-cols-2 gap-3 mt-3">
//                             <Input className="bg-gray-700 text-white" type="date" name="startDate" value={item.startDate} onChange={(event) => handleChange(index, event)} />
//                             <Input className="bg-gray-700 text-white" type="date" name="endDate" value={item.endDate} onChange={(event) => handleChange(index, event)} />
//                         </div>

//                         <div className="col-span-2 mt-3">
//                             <RichTextEditor
//                                 index={index}
//                                 onRichTextEditorChange={(value) => handleRichTextEditor(value, 'workSummary', index)}
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <br />
//             <div className="flex justify-between mt-5">
//                 <div className="flex gap-2">
//                     <Button variant="outline" onClick={AddNewExperience} className="text-blue-400 border border-blue-400 hover:bg-blue-500 hover:text-white transition-all">
//                         + Add Experience
//                     </Button>
//                     <Button variant="outline" onClick={RemoveExperience} className="text-red-400 border border-red-400 hover:bg-red-500 hover:text-white transition-all">
//                         - Remove Experience
//                     </Button>
//                 </div>
//                 <Button
//                     disabled={loading}
//                     onClick={onSave}
//                     className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
//                 >
//                     {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default Experience;

"use client"

import { useContext, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import RichTextEditor from "../RichTextEditor"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { useParams } from "react-router"
// import GlobalApi from "./../../../../../../services/GlobalApi"
import { Loader2, Briefcase, Plus, Trash2, Building, MapPin, Calendar } from "lucide-react"
import { toast } from "sonner"

function Experience() {
  const formField = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummary: "",
  }

  const [experienceList, setExperienceList] = useState([formField])
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()
  const [loading, setLoading] = useState(false)

  const handleChange = (index, event) => {
    const { name, value } = event.target
    setExperienceList((prevList) => {
      const newList = [...prevList]
      newList[index] = { ...newList[index], [name]: value }
      return newList
    })
  }

  const AddNewExperience = () => {
    setExperienceList((prevList) => [...prevList, { ...formField }])
  }

  const RemoveExperience = (index) => {
    if (experienceList.length > 1) {
      setExperienceList((prevList) => prevList.filter((_, i) => i !== index))
    }
  }

  const handleRichTextEditor = (value, name, index) => {
    setExperienceList((prevList) => {
      const newList = [...prevList]
      newList[index] = { ...newList[index], [name]: value }
      return newList
    })
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: { experience: experienceList },
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId, data.data)
      .then((resp) => {
        setLoading(false)
        toast.success("Experience updated successfully!")
      })
      .catch((error) => {
        setLoading(false)
        toast.error("Failed to update experience")
      })
  }

  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, experience: experienceList }))
  }, [experienceList])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="border-0 shadow-none">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            Work Experience
          </CardTitle>
          <p className="text-gray-600 ml-13">Add your professional work experience</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <AnimatePresence>
            {experienceList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-2 border-gray-100 hover:border-orange-200 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          Experience {index + 1}
                        </Badge>
                      </div>
                      {experienceList.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => RemoveExperience(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Position and Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          Position Title
                        </Label>
                        <Input
                          name="title"
                          value={item.title}
                          onChange={(event) => handleChange(index, event)}
                          placeholder="Software Engineer"
                          className="border-2 border-gray-200 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Company Name
                        </Label>
                        <Input
                          name="companyName"
                          value={item.companyName}
                          onChange={(event) => handleChange(index, event)}
                          placeholder="Tech Corp"
                          className="border-2 border-gray-200 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          City
                        </Label>
                        <Input
                          name="city"
                          value={item.city}
                          onChange={(event) => handleChange(index, event)}
                          placeholder="San Francisco"
                          className="border-2 border-gray-200 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          State
                        </Label>
                        <Input
                          name="state"
                          value={item.state}
                          onChange={(event) => handleChange(index, event)}
                          placeholder="CA"
                          className="border-2 border-gray-200 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Start Date
                        </Label>
                        <Input
                          type="date"
                          name="startDate"
                          value={item.startDate}
                          onChange={(event) => handleChange(index, event)}
                          className="border-2 border-gray-200 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          End Date
                        </Label>
                        <Input
                          type="date"
                          name="endDate"
                          value={item.endDate}
                          onChange={(event) => handleChange(index, event)}
                          className="border-2 border-gray-200 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    {/* Work Summary */}
                    <div>
                      <RichTextEditor
                        index={index}
                        onRichTextEditorChange={(value) => handleRichTextEditor(value, "workSummary", index)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6">
            <Button
              variant="outline"
              onClick={AddNewExperience}
              className="flex items-center gap-2 border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </Button>

            <Button
              onClick={onSave}
              disabled={loading}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Experience"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Experience

