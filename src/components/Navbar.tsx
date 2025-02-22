'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import aboutLogo from 'public/logos/navbar-logos/about.svg'
import projectsLogo from 'public/logos/navbar-logos/projects.svg'
import domainsLogo from 'public/logos/navbar-logos/domains.svg'
import alumniLogo from 'public/logos/navbar-logos/alumni.svg'
import faqsLogo from 'public/logos/navbar-logos/faqs.svg'
import csiLogo from 'public/icons/favicon.png'

import NavLink from './nav-link'
import { MenuIcon, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { projects } from '@/data/projects'
import { alumniData } from '@/data/alumni'

const navLinks = [
  {
    id: 'about',
    label: 'About',
    Icon: aboutLogo,
    href: '/dashboard',
  },
  {
    id: 'project',
    label: 'Projects',
    Icon: projectsLogo,
    href: '/dashboard/projects',
  },
  {
    id: 'domains',
    label: 'Domains',
    Icon: domainsLogo,
    href: '/dashboard/domains',
  },
  {
    id: 'alumni',
    label: 'Alumni',
    Icon: alumniLogo,
    href: '/dashboard/alumni',
  },
  {
    id: 'faqs',
    label: 'FAQs',
    Icon: faqsLogo,
    href: '/dashboard/faqs',
  },
]
interface NavbarProps {
  username: string
  image: string
}

const Navbar: React.FunctionComponent<NavbarProps> = ({
  username,
  image,
}: NavbarProps) => {
  const [activeLink, setActiveLink] = useState('')
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const path = usePathname()
  function handleToggleNavbar() {
    setIsNavbarOpen(!isNavbarOpen)
  }

  return (
    <nav
      className="top-0 left-0 right-0 bg-black text-white py-2 px-4 sm:px-8 border-b-[2px] border-[#3c444c] sticky z-[1000]"
      id="navbar-top"
    >
      <div className="mx-auto flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex lg:hidden items-center gap-[16px] w-full justify-between">
            <button
              className="mr-4 p-[2px] border-[1px] rounded-[6px] border-slate-600"
              onClick={handleToggleNavbar}
              type="button"
            >
              <MenuIcon className="text-slate-200 p-[2px]" />
            </button>
            <div className="flex items-center justify-center">
              <Link href={'/'}>
                <Image src={csiLogo} width={32} height={32} alt="" />
              </Link>
            </div>
          </div>
        </div>

        {/* Top bar of the page */}
        <div className="flex flex-row justify-between items-center">
          {/* All navigation links here */}
          <div className="hidden lg:flex flex-row gap-4 md:gap-8 mt-2 text-center text-[#C9D1D9] font-sans-code text-[16px] font-normal leading-[30px]">
            <div className="flex items-center justify-center">
              <Link href={'/'}>
                <Image
                  src={csiLogo}
                  width={40}
                  height={40}
                  alt=""
                  className="relative bottom-[2px]"
                />
              </Link>
            </div>

            {navLinks.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Link href={item.href} passHref>
                  <NavLink
                    {...item}
                    isActive={
                      item.id === 'about' && path === '/dashboard'
                        ? true
                        : path.includes(item.id)
                    }
                    onLinkClick={() => setActiveLink(item.id)}
                  />
                </Link>

                {(item.id === 'domains' ||
                  item.id === 'project' ||
                  item.id === 'alumni') && (
                  <div
                    className="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[rgba(110,118,129,0.4)] 
                              text-[#C9D1D9] text-[12px] font-[500] leading-[18px] font-['Noto_Sans'] text-center "
                  >
                    {item.id === 'domains'
                      ? 4
                      : item.id === 'alumni'
                        ? alumniData.length
                        : projects.length}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Profile icon & round one alert */}
          <div className="hidden lg:flex flex-row items-center justify-content-center">
            <Link
              href={'/dashboard/domains'}
              className="hidden lg:flex font-apro font-semibold text-nowrap border-[1px] border-white/50 bg-black hover:bg-[#47b562] text-white px-8 py-2 rounded-[0.5rem] mr-4 shadow-[0px_0px_8px_#ffffff80] text-xs md:text-sm"
            >
              <span className="animate-pulse duration-[800]">
                Round 1 is Live!
              </span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="rounded-[0.25rem] overflow-hidden"
            >
              <Image
                src={image.length > 0 ? image : '/git.webp'}
                width={45}
                height={45}
                alt="Profile Icon"
                className="flex-shrink-0 aspect-square w-20 md:w-[32px]"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`sm:hidden fixed top-0 left-0 w-2/3 h-screen bg-zinc-950 z-50 
          transform transition-transform duration-300 ease-in-out
          border-r-[1px] border-t-[1px] border-b-[1px] rounded-r-xl border-slate-600
          ${isNavbarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4">
          <button
            onClick={handleToggleNavbar}
            className="mb-8 p-[2px] border-[1px] rounded-[6px] border-slate-600"
            type="button"
          >
            <X className="text-slate-200 p-[2px]" />
          </button>

          <nav className="space-y-6 mb-auto">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 mb-2 items-center font-light">
                <Image
                  src={image.length > 0 ? image : '/git.webp'}
                  width={50}
                  height={50}
                  alt="FAQs Icon"
                  className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto"
                />
                {/* TODO@jrs : Replace with the actual username and photograph */}
                <span className="ml-2">{username}</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link key={item.id} href={item.href} passHref>
                  <NavLink
                    {...item}
                    isActive={path.split('/')[-1] === item.id}
                    onLinkClick={() => {
                      setActiveLink(item.id)
                      setIsNavbarOpen(false)
                    }}
                  />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Background Overlay */}
      {isNavbarOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleToggleNavbar}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleToggleNavbar()
            }
          }}
        />
      )}
    </nav>
  )
}

export default Navbar
