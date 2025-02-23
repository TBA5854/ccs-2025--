import React from 'react'
import { projects, Languages } from '@/data/projects'
import Link from 'next/link'

const ProjectPage = () => {
  function getLanguageColor(language: string) {
    switch (language) {
      case Languages.JAVASCRIPT:
        return 'rgb(241, 224, 90)'
      case Languages.TYPESCRIPT:
        return '#3178c6'
      case Languages.PYTHON:
        return 'rgb(53, 114, 165)'
      case Languages.GO:
        return 'rgb(0, 173, 216)'
      default:
        return 'rgba(255, 193, 7, 1)'
    }
  }
  return (
    <div className="w-full h-full bg-[#0A0A0A]">
      <div className="w-full h-full md:w-4/5 mx-auto flex flex-col lg:flex-row px-4 lg:px-10 lg:mt-12">
        {/* LEFT PANEL */}
        <div className="static ml-2 lg:w-[40%] text-white h-fit">
          <div className="hidden lg:block lg:fixed w-[80%] lg:w-[20%]">
            <h1 className="text-white font-sans-code text-2xl lg:text-[36px] font-semibold leading-[30px] mb-2 lg:mb-4">
              Projects
            </h1>
            <hr className="w-full h-[3px] bg-[#30363D] border-none mb-2 lg:mb-4" />
            <p className="w-full text-[1rem] lg:text-[0.8rem] leading-[19px] text-[#9198A1] font-normal font-sans-code mb-4 lg:mb-6">
              Explore our collection of innovative projects, crafted with
              creativity and skill. Whether built for events or personal growth,
              each project showcases our dedication and passion!
            </p>

            {/* Horizontal colored bars */}
            <div className="mt-2 w-full max-w-sm h-[4px] bg-gray-800 flex rounded-lg overflow-hidden gap-x-1">
              <div className="flex-[6] bg-[#F5502A] rounded-l-[6px]" />
              <div className="flex-[4] bg-[#6541B2]" />
              <div className="flex-[3] bg-[#FFB249]" />
              <div className="flex-[1] bg-[#54A3FF] rounded-r-[6px]" />
            </div>

            {/* Legend for above bars */}
            <div className="flex flex-wrap mt-2 gap-y-2 gap-[2%] w-full">
              {['Debugging', 'Coding', 'Designing', 'Planning'].map(
                (proj, index) => (
                  <div key={proj} className="flex items-center w-[49%]">
                    <span
                      className="w-[8px] h-[8px] mr-2 rounded-full"
                      style={{
                        backgroundColor:
                          index === 0
                            ? '#F5502A'
                            : index === 1
                              ? '#6541B2'
                              : index === 2
                                ? '#FFB249'
                                : '#54A3FF',
                      }}
                    />
                    <span className="text-xs text-[#9198A1] font-sans-code">
                      {proj}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* PROJECTS LISTING */}
        <div className="lg:w-[60%] mt-[2em] lg:mt-[-8px] lg:h-fit mb-[2em]">
          <div className="border-[3px] border-[#30363D] rounded-[6px] ">
            <div className="h-full">
              {projects.map((project, index) => (
                <div
                  key={project.projectTitle}
                  className={`p-2 lg:p-3 relative border-gray-700 ${
                    index !== projects.length - 1
                      ? 'border-b-2 lg:border-b-3 w-full'
                      : ''
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2 lg:gap-3">
                    <div className="flex-grow relative">
                      {/* title */}
                      <div className="flex justify-between items-start">
                        <Link
                          href={project.repoLink}
                          className="text-[19px] text-[rgba(88,166,255,1)] flex items-center font-sans-code font-normal leading-[25px]"
                        >
                          <span className="mt-1 font-normal text-lg">
                            {project.projectTitle}
                          </span>
                        </Link>
                      </div>

                      {/* description */}
                      <p className="text-xs md:text-[13px] text-[#8B949E] font-normal leading-[21px] md:mt-1 font-sans-code">
                        {project.projectDescription}
                      </p>

                      {/* tags */}
                      <div className="flex flex-wrap items-center mt-2 md:mt-1 gap-4">
                        {/* programming language */}
                        <div className="flex items-center">
                          <span
                            className="w-2 h-2 mr-1 rounded-full"
                            style={{
                              backgroundColor: getLanguageColor(
                                project.language,
                              ),
                            }}
                          />
                          <span className="text-[12px] text-[#8B949E] font-sans-code">
                            {project.language}
                          </span>
                        </div>

                        {/* project type */}
                        <div className="flex items-center text-[12px] text-[#8B949E] font-sans-code">
                          <span>{project.type}</span>
                        </div>

                        {/* project author */}
                        <div className="flex items-center text-[12px] text-[#8B949E] font-sans-code">
                          <img
                            src="/github.webp"
                            alt="Raju Rastogi"
                            className="w-4 h-4 lg:w-13 lg:h-13 rounded-full mr-1"
                          />
                          <Link href={project.authorLink}>
                            <span>{project.builtBy}</span>
                          </Link>
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

export default ProjectPage
