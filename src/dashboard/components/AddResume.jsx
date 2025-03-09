import { Loader2, PlusSquare } from "lucide-react";
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
  const navigation = useNavigate();

  const onCreate = async () => {
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

    GlobalApi.CreateNewResume(data)
      .then((resp) => {
        if (resp) {
          setLoading(false);
          navigation("/dashboard/resume/" + resp.data.data.documentId + "/edit");
        }
      })
      .catch(() => setLoading(false));
  };

  return (
    <div>
      {/* Add Resume Card - Color Adjustments */}
      <div
        className="relative w-[300px] h-[280px] bg-gray-900 text-white rounded-xl shadow-lg p-6 mx-3
                    flex flex-col items-center justify-center cursor-pointer transform transition-all hover:from-black-1000 hover:to-blue-300 transition-all hover:shadow-2xl"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare className="text-6xl text-white" />
        <p className="mt-2 text-white font-semibold">Add Resume</p>
      </div>

      {/* Dialog for Adding Resume */}
      <Dialog open={openDialog}>
        <DialogContent className="bg-gray-900 text-white border border-gray-700 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-blue-400">Create New Resume</DialogTitle>
            <DialogDescription>
              <p className="text-gray-300">Add a title for your resume.</p>
              <Input
                className="mt-2 bg-gray-800 text-white border-gray-600"
                placeholder="Eg. Java Developer Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5 mt-4">
              <Button onClick={() => setOpenDialog(false)} variant="ghost" className="text-gray-400 hover:text-black">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={onCreate}
                className="bg-blue-700 from black hover:bg-blue-500 text-white"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
//add resume page
export default AddResume;


