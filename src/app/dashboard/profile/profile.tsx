'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { UserStats } from '../../actions/domains'
import { titleCase } from '@/lib/utils'
import { updateProfile } from '@/app/actions/profile'
import { Gender, PortfolioCategory } from '@prisma/client'
import { Card } from '@/components/ui/card'
import type { AttemptedDomain } from '@prisma/client'
import { getAttemptedDomains } from '@/app/actions/domains'
import { UpdateProfileData } from '@/app/actions/profile'

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

  const [selectedDomains, setSelectedDomains] = useState<AttemptedDomain[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [plink, setPlink] = useState('')
  const [formData, setFormData] = useState(() => ({
    name: props.user.name,
    aboutUs: props.user.aboutUs || '',
    gender: props.user.gender || undefined,
    phoneNumber: props.user.phoneNumber || '',
    portfolios: props.user.portfolios || [],
  }))

  const onboardingCompleted =
    !!props.user?.gender && !!props.user?.aboutUs && !!props.user?.phoneNumber

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await updateProfile(props.user.id, formData)
      if (result.success) {
        setIsEditing(false)
      } else {
        alert('Failed to update profile. Please try again.')
      }
    } catch (error) {
      console.error('Profile update error:', error)
      alert('An error occurred while updating your profile.')
    }
  }

  const getPronouns = (gender: string | null) => {
    if (gender === 'MALE') {
      return 'he/him'
    } else if (gender === 'FEMALE') {
      return 'she/her'
    }
    return 'they/them'
  }

  useEffect(() => {
    async function fetchDomains() {
      setLoading(true)
      const attmptedDomains = await getAttemptedDomains()
      setSelectedDomains(attmptedDomains?.data || [])
      setLoading(false)
    }
    fetchDomains()
  }, [])

  const getDomainStatus = (domainName: string): boolean => {
    const domainAttempt = selectedDomains.find(
      (domain) => domain.domain === domainName,
    )

    if (domainAttempt?.submitted) return true
    return false
  }

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen">
      <div className="w-[100%] md:w-[88%] mx-auto mt-[1em] md:mt-[2em]">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
          {/* Left panel */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-top md:items-center">
            {isEditing ? (
              <div className="flex flex-col gap-2 mx-4">
                {/* Enter display name here */}
                <div>
                  <label
                    htmlFor="name"
                    className="w-full text-xs text-left mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full h-fit text-xs bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] p-2"
                    required
                  />
                </div>

                {/* Enter gender preference here */}
                <div>
                  <label
                    htmlFor="gender"
                    className="w-full text-xs text-left mb-2"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={formData.gender || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value as Gender,
                      })
                    }
                    className="w-full h-fit text-xs bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] p-2"
                  >
                    <option value="">Select Gender</option>
                    {Object.values(Gender).map((gender) => (
                      <option key={gender} value={gender}>
                        {titleCase(gender)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Enter phone number here */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="w-full text-xs text-left mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full h-fit text-xs bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] p-2"
                  />
                </div>

                {/* Enter portfolio link here */}
                <div>
                  <label
                    htmlFor="portfolioLink"
                    className="w-full text-xs text-left mb-2"
                  >
                    Portfolio Link
                  </label>
                  <input
                    id="portfolioLink"
                    type="tel"
                    value={formData.portfolios[0].link}
                    onChange={(e) => {
                      setPlink(e.target.value)
                      formData.portfolios[0].link = e.target.value
                      console.log(plink)
                    }}
                    className="w-full h-fit text-xs bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] p-2"
                  />
                </div>

                {/* Save and cancel buttons here */}
                <div className="hidden md:flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="w-1/2 h-[32px] bg-[#238636] border border-[#F0F6FC] border-opacity-10 rounded-[6px] text-[14px] hover:bg-[#2ea043]"
                  >
                    Save
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
            ) : (
              <div className="w-[88%] mx-auto flex flex-col items-center lg:items-start">
                <div className="w-full flex flex-row items-center gap-4 md:flex-col md:items-center lg:items-start mb-4">
                  <Image
                    src={props.image.length > 0 ? props.image : '/profile.webp'}
                    alt={props.user.name}
                    width={260}
                    height={260}
                    className="w-24 h-24 md:w-[260px] md:h-[260px] rounded-full border-2 border-[#30363D]"
                  />

                  {/* User Details - aligned right on mobile */}
                  <div className="flex flex-col text-left md:text-center lg:text-left md:mt-4">
                    <h1 className="text-xl md:text-[1.5rem] font-semibold">
                      {props.user.name}
                    </h1>
                    <span className="text-sm md:text-[1rem] text-[#9198A1]">
                      {props.user.name.split(' ')[0]} {' · '}{' '}
                      {getPronouns(props.user.gender)}
                    </span>
                  </div>
                </div>

                {/* <div className="w-full h-[1px] bg-[#30363D] my-4" /> */}

                {/* Display first portfolio link here */}
                {/* <h2 className="text-[1rem] text-left font-semibold self-start mb-2">
                  Portfolio
                </h2> */}

                {props.user.portfolios.length > 0 && (
                  <div className="w-[88%] text-left text-xs">
                    {'🔗 '}
                    <span className="underline">
                      {props.user.portfolios[0].link}
                    </span>
                  </div>
                )}
                <div className="w-full h-[1px] bg-[#30363D] my-4" />

                {!isEditing && (
                  <div className="flex py-2 items-center justify-left w-full">
                    <div className="hidden md:flex w-full flex-col gap-2 pt-0 mb-1">
                      <button type="button" onClick={() => setIsEditing(true)}>
                        <span className="hidden md:flex flex-row items-center justify-center gap-1 bg-[#21262D] w-[96%] px-2 py-1 border border-[#F0F6FC] border-opacity-10 rounded-[6px] text-[14px]">
                          Update your profile
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Display achievement badges here */}
                <h2 className="text-[1rem] text-left font-semibold self-start mb-2">
                  Achievements
                </h2>
                <div className="flex flex-wrap justify-left items-left mobile:w-full gap-2">
                  <div className="rounded-full bg-[#18181B] w-fit h-fit p-2 border-[#30363D] border-2 text-xs hover:scale-105">
                    🦄 signed-up
                  </div>

                  {onboardingCompleted && (
                    <div className="rounded-full bg-[#18181B] w-fit h-fit p-2 border-[#30363D] border-2 text-xs hover:scale-105">
                      😽 profile ready
                    </div>
                  )}

                  {getDomainStatus('TECH') && (
                    <div className="rounded-full bg-[#18181B] w-fit h-fit p-2 border-[#30363D] border-2 text-xs hover:scale-105">
                      📱developer
                    </div>
                  )}

                  {getDomainStatus('MANAGEMENT') && (
                    <div className="rounded-full bg-[#18181B] w-fit h-fit p-2 border-[#30363D] border-2 text-xs hover:scale-105">
                      💸 manager
                    </div>
                  )}

                  {getDomainStatus('DESIGN') && (
                    <div className="rounded-full bg-[#18181B] w-fit h-fit p-2 border-[#30363D] border-2 text-xs hover:scale-105">
                      🎨 designer
                    </div>
                  )}

                  {getDomainStatus('VIDEO') && (
                    <div className="rounded-full bg-[#18181B] w-fit h-fit p-2 border-[#30363D] border-2 text-xs hover:scale-105">
                      📹 videographer
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <main className="col-span-1 md:col-span-7 text-left overflow-x-auto m-4">
            {/* README.md panel */}
            <Card className="border-0 md:border-[2px] border-[#30363D] rounded-0 md:rounded-[6px] bg-[#0D1117] max-w-full w-full mx-auto mb-8">
              <div className="p-4 md:p-6 space-y-4 w-full">
                {/* Topmost row of the block */}
                <div className="flex flex-row justify-between">
                  <span className="text-xs font-apro">
                    {props.user.name.split(' ')[0]}
                    <span className="text-[#9198A1]">{' / '}</span>
                    {'README'}
                    <span className="text-[#9198A1]">{'.md'}</span>
                  </span>

                  {/* {!isEditing && 
                    <button type="button" onClick={() => setIsEditing(true)}>
                      <span className="hidden md:flex flex-row gap-1 text-xs font-apro underline">
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
                  } */}
                </div>

                {/* Actual customizable content of the block */}
                <div>
                  <div className="w-full mx-auto text-xs md:text-[0.9rem] md:text-left font-sans-code leading-normal">
                    {isEditing ? (
                      <>
                        {/* Enter about section here */}
                        <div>
                          <label
                            htmlFor="aboutUs"
                            className="w-full text-xs text-left mb-2"
                          >
                            About
                          </label>
                          <textarea
                            id="aboutUs"
                            value={formData.aboutUs}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                aboutUs: e.target.value,
                              })
                            }
                            className="w-full bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] px-3 py-2"
                            rows={3}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Display about section here */}
                        <p className="mb-4 min-h-[120px] break-words">
                          {props.user.aboutUs}
                          {!props.user.aboutUs &&
                            'Welcome to my profile! I am new to this website and will update this section soon. Thanks for visiting! 😊'}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Contributors CSI-ART block here */}
            <Card className="hidden md:block border-[2px] border-[#30363D] rounded-[6px] bg-[#0D1117] max-w-full w-full mx-auto mb-8">
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

            {/* Save and cancel buttons here for MOBILE */}

            <div className="flex flex-col md:hidden gap-2 pt-2 mb-4">
              {isEditing && (
                <>
                  <button
                    type="submit"
                    className="w-[96%] h-[32px] mx-auto bg-[#238636] border border-[#F0F6FC] border-opacity-10 rounded-[6px] text-[14px] hover:bg-[#2ea043]"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-[96%] h-[32px] mx-auto bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] text-[14px]"
                  >
                    Cancel
                  </button>
                </>
              )}
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-[96%] h-[32px] mx-auto bg-[#21262D] border border-[#F0F6FC] border-opacity-10 rounded-[6px] text-[14px]"
                >
                  Update your profile
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    </form>
  )
}

export default ProfileClient
