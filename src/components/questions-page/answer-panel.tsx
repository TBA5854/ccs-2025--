import TextEditor from './text-editor'
import { RiArrowDropDownLine } from 'react-icons/ri'

export default function AnswerPanel({
  currentIndex,
  answers,
  setAnswers,
  topPosition,
}: {
  currentIndex: number
  answers: string[]
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>
  topPosition: number
}) {
  return (
    <div className="absolute top-[2em] right-0 w-[60%] min-h-screen h-auto border-l-4 border-[#1F2937]">
      {/* Fixed Header */}
      <div className="fixed top-12 lg:top-14 right-0 w-[60%] flex items-center border-b-4 border-l-4 border-gray-800 bg-black pt-2 z-50">
        <RiArrowDropDownLine className="text-4xl text-zinc-400" />
        <p className="text-[1rem] font-normal text-[#EBEBEB] font-mono">
          answer.ts
        </p>
      </div>

      <TextEditor
        currentIndex={currentIndex}
        answers={answers}
        setAnswers={setAnswers}
      />
    </div>
  )
}
