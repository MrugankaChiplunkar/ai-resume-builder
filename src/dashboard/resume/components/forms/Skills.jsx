// import { Input } from '@/components/ui/input';
// import React, { useContext, useEffect, useState } from 'react';
// import { Rating } from '@smastrom/react-rating';
// import '@smastrom/react-rating/style.css';
// import { Button } from '@/components/ui/button';
// import { LoaderCircle } from 'lucide-react';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import { useParams } from 'react-router';
// import GlobalApi from './../../../../../services/GlobalApi';

// function Skills() {
//     const [skillsList, setSkillsList] = useState([
//         {
//             name: '',
//             rating: 0
//         }
//     ]);

//     const [loading, setLoading] = useState(false);
//     const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//     const { resumeId } = useParams();

//     const handleChange = (index, name, value) => {
//         const newEntries = [...skillsList];
//         newEntries[index][name] = value;
//         setSkillsList(newEntries);
//     };

//     const AddSkill = () => {
//         setSkillsList([...skillsList, { name: '', rating: 0 }]);
//     };

//     const RemoveSkill = () => {
//         setSkillsList(skillsList.slice(0, -1));
//     };

//     const onSave = () => {
//         setLoading(true);
//         const data = { data: { skills: skillsList } };

//         GlobalApi.UpdateResumeDetail(resumeId, data.data)
//             .then(resp => {
//                 console.log(resp);
//                 setLoading(false);
//                 toast("Details Updated");
//             })
//             .catch(error => {
//                 setLoading(false);
//             });
//     };

//     useEffect(() => {
//         setResumeInfo({
//             ...resumeInfo,
//             skills: skillsList
//         });
//     }, [skillsList]);

//     return (
//         <div className="p-6 shadow-2xl rounded-xl border border-gray-700 bg-black text-gray-700 mt-10">
//             <h2 className="font-bold text-xl">Skills</h2>
//             <p className="text-gray-400">Add your key skills</p>

//             <div className="mt-5">
//                 {skillsList.map((item, index) => (
//                     <div key={index} className="flex justify-between items-center bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-md mt-3">
//                         <div className="w-full">
//                             <label className="text-gray-700-400">Skill</label>
//                             <Input 
//                                 className="w-full bg-gray-800 border-gray-700 text-gray-700 placeholder-gray-500 rounded-lg shadow-md" 
//                                 onChange={(e) => handleChange(index, 'name', e.target.value)}
//                             />
//                         </div>
//                         <Rating 
//                             style={{ maxWidth: 120 }} 
//                             value={item.rating} 
//                             onChange={(v) => handleChange(index, 'rating', v)} 
//                         />
//                     </div>
//                 ))}
//             </div>

//             <div className="flex justify-between mt-5">
//                 <div className="flex gap-2">
//                     <Button variant="outline" onClick={AddSkill} className="border-gray-500 text-gray-700 bg-gray-900 hover:bg-gray-700">
//                         + Add Skill
//                     </Button>
//                     <Button variant="outline" onClick={RemoveSkill} className="border-gray-500 text-gray-700 bg-gray-900 hover:bg-gray-700">
//                         - Remove Skill
//                     </Button>
//                 </div>
//                 <Button 
//                     type="submit" 
//                     disabled={loading} 
//                     onClick={onSave} 
//                     className="bg-primary hover:bg-opacity-90 text-gray-700 px-6 py-2 rounded-lg shadow-md"
//                 >
//                     {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default Skills;
"use client"

import { useContext, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rating } from "@smastrom/react-rating"
import "@smastrom/react-rating/style.css"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { useParams } from "react-router"
import GlobalApi from "./../../../../../services/GlobalApi"
import { Loader2, Award, Plus, Trash2, Star } from "lucide-react"
import { toast } from "sonner"

// Custom rating styles
const customStyles = {
  itemShapes: Star,
  activeFillColor: "#3b82f6",
  inactiveFillColor: "#1f2937",
}

function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ])

  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeId } = useParams()

  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList]
    newEntries[index][name] = value
    setSkillsList(newEntries)
  }

  const AddSkill = () => {
    setSkillsList([...skillsList, { name: "", rating: 0 }])
  }

  const RemoveSkill = (index) => {
    if (skillsList.length > 1) {
      setSkillsList(skillsList.filter((_, i) => i !== index))
    }
  }

  const onSave = () => {
    setLoading(true)
    const data = { data: { skills: skillsList } }

    GlobalApi.UpdateResumeDetail(resumeId, data.data)
      .then((resp) => {
        console.log(resp)
        setLoading(false)
        toast.success("Skills updated successfully!")
      })
      .catch((error) => {
        setLoading(false)
        toast.error("Failed to update skills")
      })
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    })
  }, [skillsList])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="border-0 shadow-lg  text-gray-700">
        <CardHeader className="pb-6 border-b border-gray-800">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-gray-300" />
            </div>
            Skills
          </CardTitle>
          <p className="text-gray-400">Add your technical and professional skills</p>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <AnimatePresence>
            {skillsList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <Card className="border border-gray-700  shadow-lg overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                      <div className="flex-1 w-full">
                        <Label className="text-gray-700 flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-blue-400" />
                          Skill Name
                        </Label>
                        <div className="relative">
                          <Input
                            className="bg-gray-100 border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500 pr-10"
                            placeholder="e.g., JavaScript, Project Management, Photoshop"
                            value={item.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                          />
                          {skillsList.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => RemoveSkill(index)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-300 hover:bg-transparent p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="w-full md:w-auto">
                        <Label className="text-gray-300 block mb-2 text-center">Proficiency Level</Label>
                        <div className="flex justify-center">
                          <Rating
                            style={{ maxWidth: 180 }}
                            value={item.rating}
                            onChange={(v) => handleChange(index, "rating", v)}
                            itemStyles={customStyles}
                          />
                        </div>
                      </div>
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
              onClick={AddSkill}
              className="flex items-center gap-2 border-blue-500 text-blue-400 hover:bg-blue-900/20"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </Button>

            <Button
              onClick={onSave}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-gray-300"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Skills"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Skills
