import TextEditor from './text-editor'
import { RiArrowDropDownLine } from 'react-icons/ri'
import Image from 'next/image'
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
    <div className="ml-3 md:ml-0 md:absolute md:top-[2em] md:right-0 md:w-[60%] md:min-h-screen h-auto md:border-l-2 border-[#3C444C]">
      {/* Fixed Header */}
      <div className="md:fixed md:top-12 lg:top-14 md:right-0 md:w-[60%] flex items-center md:border-b-4 md:border-l-2 md:border-gray-800 md:border-l-[#3C444C] bg-[#09090B] pt-2 z-50">
        <Image
          src="/logos/typescript.svg"
          className="mr-2 ml-3 "
          alt="TypeScript Image"
          width={22}
          height={22}
        />{' '}
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
