import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
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
    <div>
      <div className='flex justify-between my-2'>
        <label>Work Summary</label>
        <Button 
          variant='outline' 
          size='sm' 
          onClick={GenerateSummaryFromAI}
          className='flex gap-2 border-primary text-primary mb-2'
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
        <Editor key={value} value={value} onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(e.target.value, index); // Ensure parent updates
        }}>
          <Toolbar>
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
