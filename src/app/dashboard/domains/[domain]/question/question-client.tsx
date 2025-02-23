'use client'
import { useState, useEffect } from 'react'
import QuestionPanel from '@/components/questions-page/question-panel'
import AnswerPanel from '@/components/questions-page/answer-panel'
import type { Question } from '@prisma/client'
import { submitQuestion } from '@/app/actions/questions'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { ImSpinner2 } from 'react-icons/im'
import Link from 'next/link'

import next_q_icon from '@/../public/icons/next_q.svg'
import prev_q_icon from '@/../public/icons/prev_q.svg'
import reset_a_icon from '@/../public/icons/reset_a.svg'
import home_icon from '@/../public/icons/home.svg'
import next from 'next'

export default function QuestionsPage({
  questions,
  answers: initialAnswers,
  sessionId,
}: {
  questions: Question[]
  answers: string[]
  sessionId: string
}) {
  const [mutex, setMutex] = useState(false)
  const handlePrevious = () => {
    setMutex(true)
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
    setMutex(false)
  }
  const submitAttempts: any[] = []
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Find first unanswered question
    const firstUnansweredIndex = initialAnswers.findIndex((answer) => !answer)
    return firstUnansweredIndex === -1 ? 0 : firstUnansweredIndex
  })
  const [answers, setAnswers] = useState<string[]>(initialAnswers)
  const [navbarHeight, setNavbarHeight] = useState(20)

  const getDisabledWhen = (name: string) => {
    if (name === 'next') {
      return currentIndex === questions.length - 1 && !answers[currentIndex]
    } else if (name === 'prev') {
      return currentIndex === 0
    }
    return true
  }

  const handleNext = async () => {
    setMutex(true)
    const promise = submitQuestion({
      questionId: questions[currentIndex].id,
      answer: answers[currentIndex],
      sessionId,
    })
    submitAttempts.push(promise)
    setMutex(false)
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }

    if (currentIndex === questions.length - 1) {
      await Promise.all(submitAttempts)
      // TODO: @padhai-head
      // toast.success("Quiz completed successfully!");
      redirect('/dashboard/domains?completed=true')
    }
  }

  useEffect(() => {
    const banner = document.getElementById('profile-completion-banner')
    if (banner) {
      banner.style.display = 'none'
    }
    const navbar = document.getElementById('navbar-top')
    if (navbar) {
      const navbarHeightPx = navbar.offsetHeight
      const navbarHeightVh = (navbarHeightPx / window.innerHeight) * 100
      setNavbarHeight(navbarHeightVh)
    }
    //god save me from these hacky fixes!!!!!!!!!!!!!!!!!
  }, [])
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && event.shiftKey) {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, answers])
  return (
    <main className="flex-1 relative flex flex-col min-h-screen">
      <section className="flex flex-col md:flex-row w-full h-full relative -top-2">
        {/* Sidebar navigation for questions page */}
        <aside
          className={`hidden md:flex flex-col w-[3em] h-full items-center justify-top gap-4 pt-4 z-10 fixed border-r-2 border-[#3C444C] bg-black`}
        >
          {/* Back to domain selection page */}
          <Link href="/dashboard/domains" type="button">
            <div className="relative group">
              <Image
                src={home_icon}
                width={32}
                height={32}
                alt="domains"
                className="relative w-6 h-6 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </Link>

          {/* Next & previous quick access ribbon */}
          {[
            {
              icon: next_q_icon,
              name: 'next',
              tip: 'Next Question',
              action: handleNext,
            },
            {
              icon: prev_q_icon,
              name: 'prev',
              tip: 'Previous Question',
              action: handlePrevious,
            },
          ].map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={item.action}
              disabled={getDisabledWhen(item.name)}
            >
              <div className="relative -left-2 group">
                <Image
                  key={item.name}
                  src={item.icon}
                  width={32}
                  height={32}
                  alt={item.name}
                  className="relative left-2 w-6 h-6 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            </button>
          ))}
        </aside>

        {/* Question & Answer panels */}
        <section className="flex-1 flex flex-col md:flex-row gap-4 h-fit md:pl-12">
          {/* Question Panel here*/}
          <div className="w-fit">
            {/* On mobile */}
            <div className="md:hidden md:mb-4 min-h-[150px] max-h-[300px] overflow-y-auto">
              <QuestionPanel question={questions[currentIndex].question} />
            </div>

            {/* On tabs & desktop */}
            <div className={`hidden md:flex`}>
              <QuestionPanel question={questions[currentIndex].question} />
            </div>
          </div>

          {/* Answer Panel here */}
          <div className="w-fit">
            {/* On mobile */}
            <div className="md:hidden md:mb-4 min-h-[150px] max-h-[300px] overflow-y-auto">
              <AnswerPanel
                currentIndex={currentIndex}
                answers={answers}
                setAnswers={setAnswers}
                topPosition={navbarHeight}
              />
            </div>

            {/* On tabs & desktop */}
            <div className={`hidden md:flex`} id="answer-panel">
              <AnswerPanel
                currentIndex={currentIndex}
                answers={answers}
                setAnswers={setAnswers}
                topPosition={navbarHeight}
              />
            </div>
          </div>
        </section>
      </section>

      <div className="fixed h-[2em] bottom-0 w-full border-t-4 border-[#1F2937] bg-black"></div>

      {/* Navigation buttons with dynamic positioning */}
      <div className="fixed bottom-0 border-t border-gray-800 bg-[#09090b] z-[100] py-2 mt-auto w-full px-6">
        <div className="flex justify-between md:justify-end items-center px-2 md:px-0 gap-2 md:gap-4">
          <button
            className="
              inline-block w-1/2 md:w-1/6 px-4 py-2 
              text-[14px] uppercase tracking-widest cursor-pointer 
              text-white/80 bg-white/10 border border-white/10 
              rounded-[15px] backdrop-blur-[30px] 
              disabled:cursor-not-allowed disabled:opacity-50
            "
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            type="button"
          >
            &lt;&lt; Prev
          </button>

          <button
            className="
              inline-block w-1/2 md:w-1/6 px-4 py-2 
              text-[14px] uppercase tracking-widest cursor-pointer 
              text-white/80 bg-white/10 border border-white/10 
              rounded-[15px] backdrop-blur-[30px] 
              disabled:cursor-not-allowed disabled:opacity-50
            "
            onClick={handleNext}
            disabled={
              currentIndex === questions.length - 1 && !answers[currentIndex]
            }
            type="button"
          >
            {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next >>'}
          </button>
        </div>
      </div>
    </main>
  )
}
