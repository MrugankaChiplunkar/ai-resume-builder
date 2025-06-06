// "use client"

import { Loader2, Plus, Sparkles } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { v4 as uuidv4 } from "uuid"
import GlobalApi from "./../../../services/GlobalApi"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router"

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTitle, setResumeTitle] = useState("")
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onCreate = async () => {
    if (!resumeTitle.trim()) return
    setLoading(true)

    const uuid = uuidv4()
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    }

    try {
      const resp = await GlobalApi.CreateNewResume(data)
      if (resp) {
        setLoading(false)
        setOpenDialog(false)
        setResumeTitle("")
        navigate(`/dashboard/resume/${resp.data.data.documentId}/edit`)
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <>
      {/* Add Resume Card */}
      <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
        <Card
          className="relative w-full h-[320px] border-2 border-dashed border-blue-300 hover:border-blue-500 
                     bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100
                     cursor-pointer transition-all duration-300 group overflow-hidden"
          onClick={() => setOpenDialog(true)}
        >
          <CardContent className="h-full flex flex-col items-center justify-center p-8 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"></div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-4 right-4 w-8 h-8 bg-blue-200 rounded-full opacity-60"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 text-center"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                           flex items-center justify-center mb-6 mx-auto shadow-lg
                           group-hover:shadow-xl transition-shadow duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Plus className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">Create New Resume</h3>
              <p className="text-gray-600 text-sm mb-4">Start building your professional resume with AI assistance</p>

              <div className="flex items-center justify-center text-blue-600 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-1" />
                AI-Powered
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader className="text-center pb-6">
              <div
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                              flex items-center justify-center mx-auto mb-4"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create New Resume
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-2">
                Give your resume a unique and descriptive title to get started
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Resume Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Full Stack Developer Resume"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  onKeyPress={(e) => e.key === "Enter" && onCreate()}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                  className="flex-1 h-12 border-2 hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={onCreate}
                  disabled={!resumeTitle.trim() || loading}
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 
                             hover:from-blue-700 hover:to-purple-700 text-white border-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create Resume
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddResume
