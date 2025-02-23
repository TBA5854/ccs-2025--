import { RiArrowDropDownLine } from 'react-icons/ri'

export default function QuestionPanel({ question }: { question: string }) {
  return (
    <div className="md:absolute md:top-[2em] md:left-12 md:w-[40%] md:min-h-screen h-auto">
      {/* Fixed Header */}
      <div className="hidden md:flex md:fixed md:top-12 lg:top-14 md:left-12 md:w-[40%] items-center md:border-b-4 md:border-gray-800 bg-[#09090B] pt-2 z-50">
        <RiArrowDropDownLine className="text-4xl text-zinc-400" />
        <p className="text-[1rem] font-normal text-[#EBEBEB] font-mono">
          question.md
        </p>
      </div>

      {/* Push content down to avoid overlap */}
      <div className="pl-4 pr-24 pt-12">
        <div className="flex md:hidden flex-row items-center">
          <RiArrowDropDownLine className="text-4xl text-zinc-400" />
          <p className="text-[1rem] font-normal text-[#EBEBEB] font-mono">
            question.md
          </p>
        </div>
        <p className="md:text-[16px] ml-4 md:ml-0 font-mono text-[#D4D4EB]">
          {question}
        </p>
      </div>
    </div>
  )
}
