// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import { LoaderCircle } from 'lucide-react';
// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import GlobalApi from './../../../../../services/GlobalApi';

// function PersonalDetails({ enabledNext }) {
//   const params = useParams();
//   const navigate = useNavigate(); // Correct navigation setup
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     console.log(params);
//   }, []);

//   const handleInputChange = (e) => {
//     enabledNext(false);
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     setResumeInfo({
//       ...resumeInfo,
//       [name]: value,
//     });
//   };

//   const onSave = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const data = { data: formData };

//     try {
//       await GlobalApi.UpdateResumeDetail(params?.resumeId, data.data);
//       enabledNext(true);
//       setLoading(false);
//       toast('Details Updated');
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   // ✅ Updated: Navigate to the Summary section instead of Education
//   const goToNextSection = () => {
//     navigate(`/edit-resume/${params.resumeId}/Summary`); // Ensure this route exists
//   };

//   return (
//     <div className="p-8 shadow-xl bg-gray-900 text-white rounded-xl border border-gray-800 gap-5 mt-10 transform transition-all hover:scale-[1.02]">
//       <h2 className="font-extrabold text-2xl text-gray-100">Personal Details</h2>
//       <p className="text-gray-400">Get started with the basic information</p>

//       <form onSubmit={onSave}>
//         <div className="grid grid-cols-2 mt-5 gap-6">
//           <div>
//             <label className="text-gray-300 text-sm">First Name</label>
//             <Input name="firstName" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
//           </div>
//           <div>
//             <label className="text-gray-300 text-sm">Last Name</label>
//             <Input name="lastName" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
//           </div>
//         </div>

//         <div className="mt-5">
//           <label className="text-gray-300 text-sm">Job Title</label>
//           <Input name="jobTitle" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
//         </div>

//         <div className="mt-5">
//           <label className="text-gray-300 text-sm">Address</label>
//           <Input name="address" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
//         </div>

//         <div className="grid grid-cols-2 mt-5 gap-6">
//           <div>
//             <label className="text-gray-300 text-sm">Phone</label>
//             <Input name="phone" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
//           </div>
//           <div>
//             <label className="text-gray-300 text-sm">Email</label>
//             <Input name="email" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
//           </div>
//         </div>

//         {/* ✅ Next Button now navigates to Summary */}
//         <div className="mt-6 flex justify-between">
//           <Button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 font-semibold rounded-lg">
//             {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
//           </Button>
//           <Button type="button" onClick={goToNextSection} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 font-semibold rounded-lg">
//             Next →
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default PersonalDetails;
"use client"

import { useContext, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { Loader2, User, Mail, Phone, MapPin, Briefcase } from "lucide-react"
import { useParams } from "react-router-dom"
// import GlobalApi from "./../../../../../../services/GlobalApi"
import { toast } from "sonner"

function PersonalDetails({ enabledNext }) {
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    enabledNext(false)
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    })
  }

  const onSave = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = { data: formData }

    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, data.data)
      enabledNext(true)
      setLoading(false)
      toast.success("Personal details updated successfully!")
    } catch (error) {
      setLoading(false)
      toast.error("Failed to update details")
    }
  }

  const formFields = [
    { name: "firstName", label: "First Name", icon: User, placeholder: "John", required: true },
    { name: "lastName", label: "Last Name", icon: User, placeholder: "Doe", required: true },
    {
      name: "jobTitle",
      label: "Job Title",
      icon: Briefcase,
      placeholder: "Software Engineer",
      required: true,
      fullWidth: true,
    },
    {
      name: "address",
      label: "Address",
      icon: MapPin,
      placeholder: "123 Main St, City, State",
      required: true,
      fullWidth: true,
    },
    { name: "phone", label: "Phone", icon: Phone, placeholder: "+1 (555) 123-4567", required: true },
    { name: "email", label: "Email", icon: Mail, placeholder: "john.doe@email.com", required: true, type: "email" },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="border shadow-none ">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            Personal Details
          </CardTitle>
          <p className="text-gray-600 ml-13">Let's start with your basic information</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  <Label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-2 block">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  <div className="relative">
                    <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      required={field.required}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-end pt-6"
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
                  "Save"
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default PersonalDetails
