import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '../(auth)/auth'
import Navbar from '@/components/Navbar'
import { RiErrorWarningLine } from 'react-icons/ri'
import { prisma } from '@/lib/db'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) {
    redirect('/')
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  const onboardingCompleted =
    !!user?.gender && !!user?.aboutUs && !!user?.phoneNumber

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar username={session?.user.name} image={session.user.image || ''} />
      {!onboardingCompleted && (
        <div
          className="w-full py-3 bg-orange-400/20 border-orange-900/70 border-b px-4 md:px-8 font-apro flex items-center gap-4"
          id="profile-completion-banner"
        >
          <RiErrorWarningLine className="w-16 md:w-8 h-16 md:h-8 text-yellow-200" />
          <div className="">
            <h1 className="font-semibold text-sm lg:text-base">
              Profile Completion Required!
            </h1>
            <p className="text-xs lg:text-sm">
              To enhance your experience and ensure seamless communication,
              please visit{' '}
              <Link href={'/dashboard/profile'} className="underline">
                Profile
              </Link>{' '}
              and fill your personal details.
            </p>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
