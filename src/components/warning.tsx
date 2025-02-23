import { RiErrorWarningLine } from 'react-icons/ri'
import Link from 'next/link'

interface ErrorBannerProps {
  title: string
  message: string
  linkText?: string
  linkHref?: string
}

const ErrorBanner = ({ title, message, linkText, linkHref }: ErrorBannerProps) => {
  return (
    <div className="top-16 left-0 right-0 z-50 w-full py-3 bg-orange-400/20 border-orange-900/70 border-b px-4 md:px-8 font-apro flex items-center gap-4" role="alert">
    <RiErrorWarningLine className="w-16 md:w-8 h-16 md:h-8 text-yellow-200" />
    <div>
      <h1 className="font-semibold text-sm lg:text-base">
        {title}
      </h1>
      <p className="text-xs lg:text-sm">
        {message}
        {linkText && linkHref && (
          <>
            {' '}
            <Link href={linkHref} className="underline">
              {linkText}
            </Link>
          </>
        )}
      </p>
    </div>
  </div>
  )
}

export default ErrorBanner