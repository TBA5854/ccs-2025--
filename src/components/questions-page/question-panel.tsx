import { RiArrowDropDownLine } from 'react-icons/ri'

export default function QuestionPanel({ question }: { question: string }) {
  return (
    <div className="absolute top-[2em] left-12 w-[40%] min-h-screen h-auto">
      {/* Fixed Header */}
      <div className="fixed top-12 lg:top-14 left-12 w-[40%] flex items-center border-b-4 border-gray-800 bg-black pt-2 z-50">
        <RiArrowDropDownLine className="text-4xl text-zinc-400" />
        <p className="text-[1rem] font-normal text-[#EBEBEB] font-mono">
          question.md
        </p>
      </div>

      {/* Push content down to avoid overlap */}
      <div className="pl-4 pr-24 pt-12">
        <p className="md:text-[16px] font-mono text-[#D4D4EB]">{question}</p>
      </div>
    </div>
  )
}
