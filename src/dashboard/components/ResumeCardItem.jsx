import { MoreVertical, Notebook } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GlobalApi from './../../../services/GlobalApi';
import { toast } from "sonner";
import { motion } from 'framer-motion';

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);

  const onDelete = () => {
    GlobalApi.DeleteResumeById(resume.documentId).then((resp) => {
      toast.success("Resume deleted successfully!");
      refreshData();
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-[300px] h-[280px] bg text-gray-800 rounded-2xl shadow-md p-5 mx-3 
                 flex flex-col justify-between hover:shadow-xl transition-all border border-gray-200"
    >
      {/* Resume Preview */}
      <Link to={`/dashboard/resume/${resume.documentId}/edit`} className="w-full">
        <div className="w-full h-[150px] flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 transition">
          <Notebook className="text-gray-400 w-12 h-12" />
        </div>
      </Link>

      {/* Title */}
      <h2 className="text-md font-semibold text-center mt-4 truncate px-1">{resume.title}</h2>

      {/* Dropdown */}
      <div className="absolute bottom-6 right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="h-5 w-5 text-gray-500 hover:text-black cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-lg text-sm">
            <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)} className="text-red-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="bg-white text-gray-900 border border-gray-300 rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Do you want to permanently delete this resume?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={onDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

export default ResumeCardItem;
