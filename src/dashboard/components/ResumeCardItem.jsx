// import { MoreVertical, Notebook } from 'lucide-react';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import GlobalApi from './../../../services/GlobalApi';
// import { toast } from "sonner";
// import { motion } from 'framer-motion';

// function ResumeCardItem({ resume, refreshData }) {
//   const navigate = useNavigate();
//   const [openAlert, setOpenAlert] = useState(false);

//   const onDelete = () => {
//     GlobalApi.DeleteResumeById(resume.documentId).then((resp) => {
//       toast.success("Resume deleted successfully!");
//       refreshData();
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       className="relative w-[300px] h-[280px] bg text-gray-800 rounded-2xl shadow-md p-5 mx-3 
//                  flex flex-col justify-between hover:shadow-xl transition-all border border-gray-200"
//     >
//       {/* Resume Preview */}
//       <Link to={`/dashboard/resume/${resume.documentId}/edit`} className="w-full">
//         <div className="w-full h-[150px] flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 transition">
//           <Notebook className="text-gray-400 w-12 h-12" />
//         </div>
//       </Link>

//       {/* Title */}
//       <h2 className="text-md font-semibold text-center mt-4 truncate px-1">{resume.title}</h2>

//       {/* Dropdown */}
//       <div className="absolute bottom-6 right-6">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <MoreVertical className="h-5 w-5 text-gray-500 hover:text-black cursor-pointer" />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-lg text-sm">
//             <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>
//               Edit
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
//               View
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
//               Download
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setOpenAlert(true)} className="text-red-500">
//               Delete
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       {/* Delete Confirmation */}
//       <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
//         <AlertDialogContent className="bg-white text-gray-900 border border-gray-300 rounded-xl">
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete Resume</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. Do you want to permanently delete this resume?
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={onDelete}>
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </motion.div>
//   );
// }

// export default ResumeCardItem;

"use client"

import { MoreVertical, FileText, Edit, Eye, Download, Trash2 } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import GlobalApi from "./../../../services/GlobalApi"
import { toast } from "sonner"

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate()
  const [openAlert, setOpenAlert] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const onDelete = async () => {
    setIsDeleting(true)
    try {
      await GlobalApi.DeleteResumeById(resume.documentId)
      toast.success("Resume deleted successfully!")
      refreshData()
    } catch (error) {
      toast.error("Failed to delete resume")
    } finally {
      setIsDeleting(false)
      setOpenAlert(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Recently created"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{ y: -5 }}
        className="group"
      >
        <Card
          className="relative w-full h-[320px] border-0 shadow-lg hover:shadow-xl 
                         transition-all duration-300 bg-white overflow-hidden"
        >
          <CardContent className="p-0 h-full flex flex-col">
            {/* Resume Preview */}
            <Link to={`/dashboard/resume/${resume.documentId}/edit`} className="flex-1 relative overflow-hidden">
              <motion.div
                className="w-full h-[200px] bg-gradient-to-br from-gray-50 to-gray-100 
                           flex items-center justify-center relative group-hover:from-blue-50 
                           group-hover:to-indigo-50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"></div>
                </div>

                {/* Document Icon */}
                <motion.div className="relative z-10" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <FileText className="w-16 h-16 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </motion.div>

                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300 flex items-center justify-center"
                >
                  <Badge variant="secondary" className="bg-white/90 z-50 text-blue-600">
                    Click to Edit
                  </Badge>
                </div>
              </motion.div>
            </Link>

            {/* Resume Info */}
            <div className="p-6 flex-shrink-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate text-lg mb-1">{resume.title}</h3>
                  <p className="text-sm text-gray-500">{formatDate(resume.updatedAt)}</p>
                </div>

                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}
                      className="cursor-pointer"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Resume
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
                      className="cursor-pointer"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
                      className="cursor-pointer"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setOpenAlert(true)}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}
                  className="flex-1 h-8 text-xs"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
                  className="flex-1 h-8 text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              Delete Resume
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete "<strong>{resume.title}</strong>"? This action cannot be undone and will
              permanently remove your resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Resume
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ResumeCardItem

