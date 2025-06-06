import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "./../../../services/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreate = async () => {
    if (!resumeTitle.trim()) return;
    setLoading(true);

    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    try {
      const resp = await GlobalApi.CreateNewResume(data);
      if (resp) {
        setLoading(false);
        navigate(`/dashboard/resume/${resp.data.data.documentId}/edit`);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Add Resume Card */}
      <div
        className="relative w-[300px] h-[280px] bg-gradient-to-br from-gray-900 to-gray-800/80 text-white 
                   rounded-2xl shadow-lg p-6 mx-3 flex flex-col items-center justify-center 
                   hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer border border-gray-700"
        onClick={() => setOpenDialog(true)}
      >
        <Plus className="text-6xl mb-2 text-blue-400" />
        <p className="text-lg font-semibold">Add New Resume</p>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gray-900/90 backdrop-blur-lg text-white border border-gray-700 rounded-xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-blue-400 text-xl">Create New Resume</DialogTitle>
            <DialogDescription>
              <p className="text-gray-400 mt-2">Enter a unique and relevant title for your resume.</p>
              <Input
                className="mt-4 bg-gray-800 text-white border-gray-600 focus-visible:ring-1 focus-visible:ring-blue-500"
                placeholder="e.g., Full Stack Developer Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={!resumeTitle || loading}
              onClick={onCreate}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Create Resume"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
