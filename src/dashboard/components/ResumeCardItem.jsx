import { MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../services/GlobalApi'


function ResumeCardItem({resume,refreshData}) {

  const navigation = useNavigate();

  const[openAlert,setOpenAlert] = useState(false);

  const onDelete=()=>{
    GlobalApi.DeleteResumeById(resume.documentId).then(resp=>{
      console.log(resp);
      toast('Resume Deleted');
      refreshData();
    })
  }

  //const onMenuClick=(url)=>{
    //navigation(url);
  //}

  return (
    <div className=''>
    <Link to = {'/dashboard/resume/'+resume.documentId+"/edit"}>

      <div className='p-14 bg-secondary flex items-center justify-center h-[280px] border-primary rounded-lg
      hover:scale-105 transition-all hover:shadow-md shadow-primary'>
        <Notebook /> 
      </div>
    </Link>
    <div>
    <h2 className='text-center my-1'>{resume.title}</h2>
    <DropdownMenu>
        <DropdownMenuTrigger><MoreVertical className='h-4 w-4 cursor-pointer' /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={()=>navigation('/dashboard/resume/'+resume.documentId+"/edit")}>
            Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+"/view")}
            >View</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+"/view")}>
            Download</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <AlertDialog open={openAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your resume from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>


    </div>
    </div>
    
  )
}

export default ResumeCardItem
