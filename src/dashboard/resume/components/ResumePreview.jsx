// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import React, { useContext } from 'react';
// import PersonalDetailsPreview from './Preview-Components/PersonalDetailsPreview';
// import SummaryPreview from './Preview-Components/SummaryPreview';
// import ProfessionalExperiencePreview from './Preview-Components/ProfessionalExperiencePreview';
// import EducationPreview from './Preview-Components/EducationPreview';
// import SkillsPreview from './Preview-Components/SkillsPreview';

// function ResumePreview() {
//   const { resumeInfo } = useContext(ResumeInfoContext);

//   return (
//     <div
//       className="shadow-2xl h-full p-10 md:p-14 border-t-[6px] rounded-lg bg-gray-900 text-white transition-all transform hover:scale-[1.02]"
//       style={{
//         borderColor: resumeInfo?.themeColor || '#ffffff',
//       }}
//     >
//       {/* Personal Details */}
//       <PersonalDetailsPreview resumeInfo={resumeInfo} />

//       {/* Summary */}
//       <SummaryPreview resumeInfo={resumeInfo} />

//       {/* Professional Experience */}
//       <ProfessionalExperiencePreview resumeInfo={resumeInfo} />

//       {/* Educational Details */}
//       <EducationPreview resumeInfo={resumeInfo} />

//       {/* Skills */}
//       <SkillsPreview resumeInfo={resumeInfo} />
//     </div>
//   );
// }

// export default ResumePreview;
// "use client"

// import { useContext } from "react"
// import { motion } from "framer-motion"
// import { ResumeInfoContext } from "@/context/ResumeInfoContext"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Download, Eye, Share2 } from "lucide-react"
// import PersonalDetailsPreview from "./Preview-Components/PersonalDetailsPreview"
// import SummaryPreview from "./Preview-Components/SummaryPreview"
// import ProfessionalExperiencePreview from "./Preview-Components/ProfessionalExperiencePreview"
// import EducationPreview from "./Preview-Components/EducationPreview"
// import SkillsPreview from "./Preview-Components/SkillsPreview"

// function ResumePreview() {
//   const { resumeInfo } = useContext(ResumeInfoContext)

//   return (
//     <div className="space-y-6">
//       {/* Preview Header */}
//       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//         <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
//                   <Eye className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
//                   <p className="text-sm text-gray-600">See how your resume looks</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Badge variant="secondary" className="bg-green-100 text-green-700">
//                   Auto-updating
//                 </Badge>
//                 <Button size="sm" variant="outline" className="flex items-center gap-2">
//                   <Share2 className="w-4 h-4" />
//                   Share
//                 </Button>
//                 <Button size="sm" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
//                   <Download className="w-4 h-4" />
//                   Download
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Resume Preview */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         <Card className="border-0 shadow-2xl overflow-hidden">
//           <div
//             className="bg-white p-8 md:p-12 min-h-[800px] transition-all duration-300"
//             style={{
//               borderTop: `6px solid ${resumeInfo?.themeColor || "#3b82f6"}`,
//             }}
//           >
//             {/* Personal Details */}
//             <PersonalDetailsPreview resumeInfo={resumeInfo} />

//             {/* Summary */}
//             <SummaryPreview resumeInfo={resumeInfo} />

//             {/* Professional Experience */}
//             <ProfessionalExperiencePreview resumeInfo={resumeInfo} />

//             {/* Educational Details */}
//             <EducationPreview resumeInfo={resumeInfo} />

//             {/* Skills */}
//             <SkillsPreview resumeInfo={resumeInfo} />
//           </div>
//         </Card>
//       </motion.div>

//       {/* Preview Actions */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.4 }}
//         className="flex justify-center gap-4"
//       >
//         <Button variant="outline" className="flex items-center gap-2">
//           <Eye className="w-4 h-4" />
//           Full Screen Preview
//         </Button>
//         <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//           <Download className="w-4 h-4" />
//           Download PDF
//         </Button>
//       </motion.div>
//     </div>
//   )
// }

// export default ResumePreview
"use client";

import { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, Share2 } from "lucide-react";
import PersonalDetailsPreview from "./Preview-Components/PersonalDetailsPreview";
import SummaryPreview from "./Preview-Components/SummaryPreview";
import ProfessionalExperiencePreview from "./Preview-Components/ProfessionalExperiencePreview";
import EducationPreview from "./Preview-Components/EducationPreview";
import SkillsPreview from "./Preview-Components/SkillsPreview";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const previewRef = useRef(null);

  // 🖥️ Fullscreen Preview
  const handleFullScreen = () => {
    const elem = previewRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  // 📄 Download PDF
  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("resume-preview.pdf");
  };

  return (
    <div className="space-y-6">
      {/* Preview Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                  <p className="text-sm text-gray-600">See how your resume looks</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Auto-updating
                </Badge>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  size="sm"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  onClick={handleDownloadPDF}
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Resume Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div
            ref={previewRef}
            className="bg-white p-8 md:p-12 min-h-[800px] transition-all duration-300"
            style={{
              borderTop: `6px solid ${resumeInfo?.themeColor || "#3b82f6"}`,
            }}
          >
            <PersonalDetailsPreview resumeInfo={resumeInfo} />
            <SummaryPreview resumeInfo={resumeInfo} />
            <ProfessionalExperiencePreview resumeInfo={resumeInfo} />
            <EducationPreview resumeInfo={resumeInfo} />
            <SkillsPreview resumeInfo={resumeInfo} />
          </div>
        </Card>
      </motion.div>

      {/* Preview Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-center gap-4 pb-3"
      >
        <Button variant="outline" className="flex items-center gap-2" onClick={handleFullScreen}>
          <Eye className="w-4 h-4" />
          Full Screen Preview
        </Button>
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={handleDownloadPDF}
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </motion.div>
    </div>
  );
}

export default ResumePreview;
