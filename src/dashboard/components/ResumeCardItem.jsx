import { MoreVertical, Notebook } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
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

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);

  const onDelete = () => {
    GlobalApi.DeleteResumeById(resume.documentId).then((resp) => {
      console.log(resp);
      toast('Resume Deleted');
      refreshData();
    });
  };

  return (
    <div className="relative w-[300px] h-[280px] bg-gray-900 text-white rounded-xl shadow-lg p-6 mx-3
                    flex flex-col items-center justify-between transform transition-all hover:scale-105">
      {/* Clickable Card */}
      <Link to={`/dashboard/resume/${resume.documentId}/edit`} className="w-full">
        <div className="w-full h-[150px] flex items-center justify-center bg-gray-800 rounded-lg shadow-md">
          <Notebook className="text-gray-400 w-12 h-12" />
        </div>
      </Link>

      {/* Resume Title */}
      <h2 className="text-lg font-semibold text-center mt-4">{resume.title}</h2>

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-5 w-5 cursor-pointer text-gray-400 hover:text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 text-white border border-gray-700 rounded-md">
          <DropdownMenuItem onClick={() => navigation(`/dashboard/resume/${resume.documentId}/edit`)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}>Download</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openAlert}>
        <AlertDialogContent className="bg-gray-900 text-white border border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCardItem;
