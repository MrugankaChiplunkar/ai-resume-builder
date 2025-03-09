import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { 
  BtnBold, BtnBulletList, BtnItalic, BtnLink, 
  BtnNumberedList, BtnStrikeThrough, BtnUnderline, 
  Editor, EditorProvider, Separator, Toolbar 
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../services/AIModel';

const PROMPT = 'Position Title: {positionTitle}, Depending on Position Title give me 4-5 bullet points for my experience in resume, give me result in HTML format';

function RichTextEditor({ onRichTextEditorChange, index }) {
  const [value, setValue] = useState('');
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);

    if (!resumeInfo.experience[index]?.title) {
      toast('Please add position title');
      setLoading(false);
      return;
    }

    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const rawText = await result.response.text();
      console.log("AI Response:", rawText);

      let generatedText = rawText;
      try {
        const resp = JSON.parse(rawText);
        generatedText = typeof resp[0] === "string" ? resp[0] : "";
      } catch (jsonError) {
        console.warn("Non-JSON AI response, using raw text");
      }

      setValue(generatedText); 
      onRichTextEditorChange(generatedText, index); 

    } catch (error) {
      console.error("Error parsing AI response:", error);
      setValue("");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 shadow-xl rounded-xl border border-gray-700 bg-black text-white mt-5">
      <div className='flex justify-between items-center mb-4'>
        <label className="font-semibold text-lg">Work Summary</label>
        <Button 
          variant='outline' 
          size='sm' 
          onClick={GenerateSummaryFromAI}
          className='flex gap-2 border-gray-500 text-white bg-gray-900 hover:bg-gray-700'
        >
          {loading ? 
            <LoaderCircle className='animate-spin'/> : 
            <>
              <Brain className='h-4 w-4'/> Generate Summary from AI 
            </>
          }
        </Button>
      </div>
      
      <EditorProvider>
        <Editor 
          key={value} 
          value={value} 
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value, index); // Ensure parent updates
          }}
          className="w-full h-48 p-3 border border-gray-600 bg-gray-900 text-white rounded-lg"
        >
          <Toolbar className="bg-gray-800 text-white p-2 rounded-lg shadow-md">
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
