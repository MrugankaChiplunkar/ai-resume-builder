// import { Button } from '@/components/ui/button';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import { Brain, LoaderCircle } from 'lucide-react';
// import React, { useContext, useState } from 'react';
// import { 
//   BtnBold, BtnBulletList, BtnItalic, BtnLink, 
//   BtnNumberedList, BtnStrikeThrough, BtnUnderline, 
//   Editor, EditorProvider, Separator, Toolbar 
// } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../services/AIModel';

// const PROMPT = 'Position Title: {positionTitle}, Depending on Position Title give me 4-5 bullet points for my experience in resume, give me result in HTML format';

// function RichTextEditor({ onRichTextEditorChange, index }) {
//   const [value, setValue] = useState('');
//   const { resumeInfo } = useContext(ResumeInfoContext);
//   const [loading, setLoading] = useState(false);

//   const GenerateSummaryFromAI = async () => {
//     setLoading(true);

//     if (!resumeInfo.experience[index]?.title) {
//       toast('Please add position title');
//       setLoading(false);
//       return;
//     }

//     const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

//     try {
//       const result = await AIChatSession.sendMessage(prompt);
//       const rawText = await result.response.text();
//       console.log("AI Response:", rawText);

//       let generatedText = rawText;
//       try {
//         const resp = JSON.parse(rawText);
//         generatedText = typeof resp[0] === "string" ? resp[0] : "";
//       } catch (jsonError) {
//         console.warn("Non-JSON AI response, using raw text");
//       }

//       setValue(generatedText); 
//       onRichTextEditorChange(generatedText, index); 

//     } catch (error) {
//       console.error("Error parsing AI response:", error);
//       setValue("");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="p-6 shadow-xl rounded-xl border border-gray-700 bg-black text-white mt-5">
//       <div className='flex justify-between items-center mb-4'>
//         <label className="font-semibold text-lg">Work Summary</label>
//         <Button 
//           variant='outline' 
//           size='sm' 
//           onClick={GenerateSummaryFromAI}
//           className='flex gap-2 border-gray-500 text-white bg-gray-900 hover:bg-gray-700'
//         >
//           {loading ? 
//             <LoaderCircle className='animate-spin'/> : 
//             <>
//               <Brain className='h-4 w-4'/> Generate Summary from AI 
//             </>
//           }
//         </Button>
//       </div>

//       <EditorProvider>
//         <Editor 
//           key={value} 
//           value={value} 
//           onChange={(e) => {
//             setValue(e.target.value);
//             onRichTextEditorChange(e.target.value, index); // Ensure parent updates
//           }}
//           className="w-full h-48 p-3 border border-gray-600 bg-gray-900 text-white rounded-lg"
//         >
//           <Toolbar className="bg-gray-800 text-white p-2 rounded-lg shadow-md">
//             <BtnBold />
//             <BtnItalic />
//             <BtnUnderline />
//             <BtnStrikeThrough />
//             <Separator />
//             <BtnNumberedList />
//             <BtnBulletList />
//             <Separator />
//             <BtnLink />
//           </Toolbar>
//         </Editor>
//       </EditorProvider>
//     </div>
//   );
// }

// export default RichTextEditor;


"use client"

import { useContext, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { Brain, Loader2, FileText, Sparkles } from "lucide-react"
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg"
// import { AIChatSession } from "./../../../../../services/AIModel"
import { toast } from "sonner"

const PROMPT =
  "Position Title: {positionTitle}, Depending on Position Title give me 4-5 bullet points for my experience in resume, give me result in HTML format"

function RichTextEditor({ onRichTextEditorChange, index }) {
  const [value, setValue] = useState("")
  const { resumeInfo } = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false)

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo.experience[index]?.title) {
      toast.error("Please add position title first")
      return
    }

    setLoading(true)
    const prompt = PROMPT.replace("{positionTitle}", resumeInfo.experience[index].title)

    try {
      const result = await AIChatSession.sendMessage(prompt)
      const rawText = await result.response.text()

      let generatedText = rawText
      try {
        const resp = JSON.parse(rawText)
        generatedText = typeof resp[0] === "string" ? resp[0] : ""
      } catch (jsonError) {
        console.warn("Non-JSON AI response, using raw text")
      }

      setValue(generatedText)
      onRichTextEditorChange(generatedText, index)
      toast.success("AI content generated successfully!")
    } catch (error) {
      console.error("Error parsing AI response:", error)
      toast.error("Failed to generate AI content")
      setValue("")
    }

    setLoading(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-blue-600" />
              Work Summary
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={GenerateSummaryFromAI}
              disabled={loading}
              className="flex items-center gap-2 border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
              {loading ? "Generating..." : "Generate with AI"}
            </Button>
          </div>
          <p className="text-sm text-gray-600">Describe your key responsibilities and achievements</p>
        </CardHeader>

        <CardContent>
          <EditorProvider>
            <Editor
              key={value}
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                onRichTextEditorChange(e.target.value, index)
              }}
              className="min-h-[200px]"
            >
              <Toolbar className="bg-gray-50 border border-gray-200 rounded-t-lg p-2">
                <BtnBold className="mx-1" />
                <BtnItalic className="mx-1" />
                <BtnUnderline className="mx-1" />
                <BtnStrikeThrough className="mx-1" />
                <Separator />
                <BtnNumberedList className="mx-1" />
                <BtnBulletList className="mx-1" />
                <Separator />
                <BtnLink className="mx-1" />
              </Toolbar>
            </Editor>
          </EditorProvider>

          {value && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Sparkles className="w-3 h-3 mr-1" />
                Content Added
              </Badge>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default RichTextEditor
