'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import DomainCard from '@/components/domain-page/domainCard'
import type { domainCardProps } from '@/types/domain-card-props'
import techLogo from 'public/icons/puzzle_tech.svg'
import designLogo from 'public/icons/puzzle_design.svg'
import videoLogo from 'public/icons/puzzle_video.svg'
import managementLogo from 'public/icons/puzzle_management.svg'
import { getAttemptedDomains } from '@/app/actions/domains'
import type { AttemptedDomain } from '@prisma/client'
import { DomainStatus } from '@/types/domain-card-props'

const MAX_DOMAIN_ATTEMPTS = 2

export default function DomainsPage() {
  const [selectedDomains, setSelectedDomains] = useState<AttemptedDomain[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDomains() {
      setLoading(true)
      const attmptedDomains = await getAttemptedDomains()
      setSelectedDomains(attmptedDomains?.data || [])
      setLoading(false)
    }
    fetchDomains()
  }, [])

  const getDomainStatus = (domainName: string): DomainStatus => {
    const domainAttempt = selectedDomains.find(
      (domain) => domain.domain === domainName,
    )

    if (!domainAttempt) return DomainStatus.NOT_STARTED
    if (domainAttempt.submitted) return DomainStatus.COMPLETED
    return DomainStatus.IN_PROGRESS
  }

  const getButtonLabel = (
    status: DomainStatus,
    defaultLabel: string,
  ): string => {
    switch (status) {
      case DomainStatus.IN_PROGRESS:
        return 'Continue Test'
      case DomainStatus.COMPLETED:
        return 'Test Finished'
      default:
        return defaultLabel
    }
  }

  const isDisabled = (status: DomainStatus): boolean => {
    return (
      status === DomainStatus.COMPLETED ||
      (selectedDomains.filter((d) => !d.submitted).length >=
        MAX_DOMAIN_ATTEMPTS &&
        status === DomainStatus.NOT_STARTED)
    )
  }

  const content: domainCardProps[] = [
    {
      domainName: 'Tech',
      domainIcon: techLogo,
      description:
        'Development, data science, cybersecurity and more! We discuss the latest trends in tech and create ground-breaking solutions. Those who dare enter, suffer from sleepless nights resolving merge conflicts.',
      status: getDomainStatus('TECH'),
      get buttonLabel() {
        return getButtonLabel(this.status, "Let's Start Coding")
      },
      get disabled() {
        return isDisabled(this.status)
      },
    },
    {
      domainName: 'Management',
      domainIcon: managementLogo,
      description:
        'The glue that holds everything together and keeps us going forward. Organize events and drive real-world impact. Enter if you thrive in chaos and can turn last-minute disasters into seamless executions.',
      status: getDomainStatus('MANAGEMENT'),
      get buttonLabel() {
        return getButtonLabel(this.status, 'Get those finances right')
      },
      get disabled() {
        return isDisabled(this.status)
      },
    },
    {
      domainName: 'Design',
      domainIcon: designLogo,
      description:
        'Master UI/UX, branding, and digital art to create stunning visuals that leave a lasting impact. If you choose to dive into design, you will learn to make things look good (without losing your mind).',
      status: getDomainStatus('DESIGN'),
      get buttonLabel() {
        return getButtonLabel(this.status, 'Dive Into Design')
      },
      get disabled() {
        return isDisabled(this.status)
      },
    },
    {
      domainName: 'Video',
      domainIcon: videoLogo,
      description:
        "Ready to unleash your inner director? Learn the art of cinematography, editing, and storytelling to produce eye-catching reels that stand out! Once you start, you'll never watch videos the same way again.",
      status: getDomainStatus('VIDEO'),
      get buttonLabel() {
        return getButtonLabel(this.status, 'Live. Camera. Action.')
      },
      get disabled() {
        return isDisabled(this.status)
      },
    },
  ]

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 h-full">
      <div className="flex flex-col items-center gap-4 sm:gap-6 text-center mt-[2em] md:mt-[4em] md:mb-[2em]">
        <h1 className="text-white font-sans-code text-lg lg:text-2xl font-semibold leading-normal sm:leading-relaxed px-2">
          Welcome to CSI! Let&apos;s get started.
        </h1>
        <p className="text-[#9198A1] font-sans-code text-sm -mt-4 sm:text-base lg:text-md font-normal leading-relaxed max-w-3xl px-2">
          You can choose upto 2 domains. Once you start a questionaire, you
          cannot pause it. All the best!
        </p>
      </div>

      {/* Domains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-1 gap-4 lg:gap-8 max-w-[1000px] mx-auto px-2 sm:px-4 my-8">
        {content.map((domain) => (
          <DomainCard {...domain} loading={loading} key={domain.domainName} />
        ))}
      </div>
    </main>
  )
}
