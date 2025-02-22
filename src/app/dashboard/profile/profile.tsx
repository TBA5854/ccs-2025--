'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { UserStats } from '../../actions/domains'
import { titleCase } from '@/lib/utils'
import { updateProfile } from '@/app/actions/profile'
import { Gender, PortfolioCategory } from '@prisma/client'
import { Card } from '@/components/ui/card'

interface ProfileClientProps {
  user: UserStats
  image: string
}

const ProfileClient = (props: ProfileClientProps) => {
  const today = new Date()
  const formattedDate = today.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: props.user.name,
    aboutUs: props.user.aboutUs || '',
    gender: props.user.gender || undefined,
    phoneNumber: props.user.phoneNumber || '',
    portfolios: props.user.portfolios || [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await updateProfile(props.user.id, formData)
    if (result.success) {
      setIsEditing(false)
    }
  }

  const EditForm = () => (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-4 mx-12">
        <div>
          <label htmlFor="name" className="block text-[18px] mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-[32px] bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] px-3"
            required
          />
        </div>

        <div>
          <label htmlFor="aboutUs" className="block text-[18px] mb-2">
            About
          </label>
          <textarea
            id="aboutUs"
            value={formData.aboutUs}
            onChange={(e) =>
              setFormData({ ...formData, aboutUs: e.target.value })
            }
            className="w-full bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] px-3 py-2"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-[18px] mb-2">
            Gender
          </label>
          <select
            id="gender"
            value={formData.gender || ''}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value as Gender })
            }
            className="w-full h-[32px] bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] px-3"
          >
            <option value="">Select Gender</option>
            {Object.values(Gender).map((gender) => (
              <option key={gender} value={gender}>
                {titleCase(gender)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-[18px] mb-2">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            className="w-full h-[32px] bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] px-3"
          />
        </div>
        <div>
          <label className="block text-[18px] mb-2">
            Portfolio/Project Links
          </label>
          {formData.portfolios.map((portfolio) => (
            <div key={portfolio.id} className="flex gap-2 mb-2">
              <input
                type="url"
                value={portfolio.link}
                onChange={(e) => {
                  const newPortfolios = formData.portfolios.map((p) =>
                    p.id === portfolio.id ? { ...p, link: e.target.value } : p,
                  )
                  setFormData({ ...formData, portfolios: newPortfolios })
                }}
                className="flex-1 h-[32px] bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] px-3"
                placeholder="https://example.com"
              />
              {formData.portfolios.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newPortfolios = formData.portfolios.filter(
                      (p) => p.id !== portfolio.id,
                    )
                    setFormData({ ...formData, portfolios: newPortfolios })
                  }}
                  className="h-[32px] px-2 bg-red-600 rounded-[6px] text-[14px] hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData({
                ...formData,
                portfolios: [
                  ...formData.portfolios,
                  {
                    id: `temp-${Date.now()}`,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    category: PortfolioCategory.TECH,
                    link: '',
                    userId: props.user.id,
                  },
                ],
              })
            }}
            className="mt-2 h-[32px] px-4 bg-[#238636] rounded-[6px] text-[14px] hover:bg-[#2ea043]"
          >
            Add Link
          </button>
        </div>
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="w-1/2 h-[32px] bg-[#238636] border border-[#F0F6FC] border-opacity-10 rounded-[6px] text-[14px] hover:bg-[#2ea043]"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="w-1/2 h-[32px] bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] text-[14px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )

  const getPronouns = (gender: string | null) => {    
    if (gender === "MALE") {
      return "he/him"
    }
    else if (gender === "FEMALE") {
      return "she/her"
    }
    return "they/them"
  }

  return (
    <div className="container mx-auto py-8 px-4 flex-grow">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">

        {/* Left panel */}
        <div className="col-span-1 md:col-span-3 flex flex-col items-center">
          <div className="flex items-center justify-center mb-4 w-full h-fit rounded-2xl overflow-hidden">
            <Image
              src={props.image.length > 0 ? props.image : '/profile.webp'}
              alt="Raju Rastogi"
              width={200}
              height={200}
              className='rounded-full'
            />
          </div>
          {isEditing ? (
            <EditForm />
          ) : (
            <div className="flex flex-col items-center">
              <div>
                <h1 className="w-full text-[1rem] text-left font-semibold">
                  {props.user.name}
                </h1>

                <span className='w-full text-[#9198A1] text-left'>
                  {props.user.name.split(" ")[0]}{" · "}{getPronouns(props.user.gender)}
                </span>
              </div>
            </div>
          )}
          {/* <div className="w-[302px] h-[1px] bg-[#30363D] my-4" /> */}
          {/* <div className="flex flex-col justify-center items-center mobile:w-full gap-4">
            <h2 className="w-full text-[1rem] text-left font-semibold">
              Achievements
            </h2>
            <Image
              src="/badge.webp"
              alt="Achievement Badge"
              width={70}
              height={70}
            />
            <div className="border-[#1cec1c] border-[2px] rounded-full py-1 px-4 text-[12px] font-bold">
              You chose CSI
            </div>
          </div> */}
          {/* <div className="w-[302px] h-[1px] bg-[#30363D] my-4" /> */}
          {/* <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className="text-[20px] font-semibold self-start mx-12">
              Organizations
            </h2>
            <Image
              src="/org.webp"
              alt="Organization Logo"
              width={71}
              height={71}
            />
          </div> */}
        </div>

        <main className="col-span-1 md:col-span-7 text-left overflow-x-auto">

          {/* README.md panel */}
          <Card className="border-[2px] border-[#30363D] rounded-[6px] bg-[#0D1117] max-w-full w-full mx-auto mb-8">
            <div className="p-4 md:p-6 space-y-4 w-full">

              {/* Topmost row of the block */}
              <div className='flex flex-row justify-between'>
                <span className="text-xs font-apro">
                  {props.user.name.split(" ")[0]}
                  <span className="text-[#9198A1]">{" / "}</span>
                  {"README"}
                  <span className="text-[#9198A1]">{".md"}</span>
                </span>

                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  <span className="flex flex-row gap-1 text-xs font-apro underline">
                    Edit profile
                    <Image
                      src="/icons/edit.svg"
                      width={16}
                      height={16}
                      alt="Contribution Chart"
                      className="rounded-t-[16px]"
                    />
                  </span>
                </button>
              </div>

              {/* Actual customizable content of the block */}
              <div>
                <div className="w-full mx-auto text-xs md:text-[0.9rem] md:text-left font-sans-code leading-normal">
                  <p className="mb-4">
                    {props.user.aboutUs}
                    {!props.user.aboutUs && 
                      <span>
                        Welcome to my profile! I am new to this website and will update this section soon.
                      </span>
                    }  
                  </p>
                  {props.user.portfolios &&
                    <>
                      <p className='mb-1'>
                        These are some of my main projects:
                      </p>
                      <ul>
                        {props.user.portfolios.map((portfolio, index) => (
                          <li 
                            key={portfolio.id}
                            className='list-disc ml-8 underline'
                          >
                            <a href={portfolio.link}>{portfolio.link}</a>
                          </li>
                        ))}
                      </ul>
                  <p className="mt-4 lg:mt-8">
                    Thanks for visiting! 😊
                  </p>
                  </>
                }
                </div>
              </div>
            </div>
          </Card>

          {/* Contributors CSI-ART block here */}
          <Card className="border-[2px] border-[#30363D] rounded-[6px] bg-[#0D1117] max-w-full w-full mx-auto mb-8">
            <div>
              <Image
                src="/assets/contri.png"
                width={878}
                height={162}
                alt="Contribution Chart"
                className="rounded-t-[16px]"
              />
            </div>
          </Card>
        </main>


        {/* <div className="col-span-1 md:col-span-7 text-left overflow-x-auto">
          <div className="mb-6">
            <Image
              src="/contri.webp"
              width={878}
              height={162}
              alt="Contribution Chart"
              className="rounded-t-[10px] mobile:hidden tab:block"
            />
          </div>
          <div className="mb-2">
            <h3 className="text-[20px] font-semibold">Contribution activity</h3>
            <div className="flex items-center mt-1">
              <span className="text-[18px]">{formattedDate}</span>
              <div className="w-[302px] h-[1px] bg-[#30363D] my-4" />
            </div>
          </div>
          <div className="flex items-start mb-6">
            <Image
              src="/side.webp"
              width={32}
              height={325}
              alt="Side Image"
              className="hidden md:block mr-4"
            />
            <div>
              {props.user.attemptedDomains.map((domain, idx) => (
                <div key={domain.id} className="mb-12">
                  <div className="flex items-center mb-2 mt-4">
                    <h4 className="text-[18px] ">
                      Questions completed in {titleCase(domain?.domain)} Domain
                    </h4>
                    <div className="w-[55px] h-[22px] border border-[#C9D1D9] rounded-full flex items-center justify-center text-[14px] ml-2 py-1 px-[1rem]">
                      Public
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ProfileClient
