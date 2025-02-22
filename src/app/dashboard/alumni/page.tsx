import React from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { alumniData } from '@/data/alumni'
import Link from 'next/link'
import Image from 'next/image'

const AlumniPage = () => {
  return (
    <div className="w-full h-full bg-[#0A0A0A]">
      <div className="w-full h-full md:w-4/5 mx-auto flex flex-col lg:flex-row px-4 lg:px-10 lg:mt-12">
        {/* LEFT PANEL */}
        <div className="static ml-2 lg:w-[40%] text-white h-fit">
          <div className="hidden lg:block lg:fixed w-[80%] lg:w-[20%]">
            <h1 className="text-white font-sans-code text-2xl lg:text-[36px] font-semibold leading-[30px] mb-2 lg:mb-4">
              Alumni
            </h1>
            <hr className="w-full h-[3px] bg-[#30363D] border-none mb-2 lg:mb-4" />
            <p className="w-full text-[1rem] lg:text-[0.8rem] leading-[19px] text-[#9198A1] font-normal font-sans-code mb-4 lg:mb-6">
              Our alumni are a testament to the excellence and impact of our
              community. They have gone on to achieve remarkable success in
              diverse fields, from technology and entrepreneurship to research
              and leadership.
            </p>
          </div>
        </div>

        {/* PROJECTS LISTING */}
        <div className="lg:w-[60%] mt-[2em] lg:mt-[-8px] lg:h-fit mb-[2em]">
          <div className="border-[3px] border-[#30363D] rounded-[6px]">
            <div className="h-full">
              {alumniData.map((person, index) => (
                <div
                  key={person.name}
                  className={`p-2 lg:p-3 relative border-gray-700 ${
                    index !== 6 ? 'border-b-2 lg:border-b-3 w-full' : ''
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2 lg:gap-3">
                    <div className="flex items-center gap-x-4">
                      <Image
                        src={person.src}
                        alt={person.name}
                        width={200}
                        height={200}
                        className="w-[60px] h-[60px] lg:h-[75px] lg:w-[75px] aspect-square"
                      />
                      <div>
                        <div className="flex-grow relative">
                          {/* title */}
                          <div className="flex justify-between items-start">
                            <Link
                              href={person.linkedin}
                              className="text-[19px] text-[rgba(88,166,255,1)] flex items-center font-sans-code font-normal leading-[25px]"
                            >
                              <span className="mt-1 font-normal text-lg">
                                {person.name}
                              </span>
                            </Link>
                          </div>

                          {/* description */}
                          <div className="flex flex-row">
                            <p className="text-xs md:text-[13px] text-[#8B949E] font-normal leading-[21px] md:mt-1 font-sans-code">
                              {person.expertise}, {person.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlumniPage
