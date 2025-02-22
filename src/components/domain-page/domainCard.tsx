import type { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { domainCardProps } from '@/types/domain-card-props'

const DomainCard: FC<domainCardProps & { loading: boolean }> = ({
  domainName,
  domainIcon,
  description,
  buttonLabel,
  disabled,
  loading,
}) => {

  const getIconRotations = (dname: string) => {
    if (dname === "Tech" || dname === "Design") {
      return 'rotate-12';
    }
    else if (dname === "Management" || dname === "Video") {
      return '-rotate-12';
    }
  }

  const getCardBorders = (dname: string) => {
    if (dname === "Tech") {
      return 'border-[#477CFE]/20';
    }
    else if (dname === "Design") {
      return 'border-[#9747FF]/20';
    }
    else if (dname === "Management") {
      return 'border-[#F5A10A]/20';
    }
    else if (dname === "Video") {
      return 'border-[#C93028]/20';
    }
  }

  const getButtonClasses = (disabled: boolean, dname: string) => {
    if (disabled) {
      return 'bg-[#21262D]/50 text-[#C9D1D9]/50 cursor-not-allowed hover:bg-[#21262D]/50';
    } 
    else if (dname === "Tech") {
      return 'bg-[#477CFE]/20 text-[#C9D1D9] hover:bg-[#477CFE]';
    }
    else if (dname === "Design") {
      return 'bg-[#9747FF]/20 text-[#C9D1D9] hover:bg-[#9747FF]';
    }
    else if (dname === "Management") {
      return 'bg-[#F5A10A]/20 text-[#C9D1D9] hover:bg-[#F5A10A]';
    }
    else if (dname === "Video") {
      return 'bg-[#C93028]/20 text-[#C9D1D9] hover:bg-[#C93028]';
    }
  };

  return (
    <div className={`border-4  rounded-[6px] shadow-md p-4 flex flex-col h-full justify-between ${getCardBorders(domainName)}`}>
      <div className="flex items-center space-x-4 mb-4">
        <Image
          src={domainIcon}
          alt="logo"
          width={32}
          height={32}
          className={`w-8 h-8 md:w-8 md:h-8 ${getIconRotations(domainName)}`}
        />
        <span className="text-[1rem] lg:text-[1rem] text-[#C9D1D9] font-sans-code font-semibold leading-[20px] text-center">
          {domainName}
        </span>
      </div>
      <p className="text-[14px] text-[#9198A1] font-sans-code font-normal leading-[18px] ml-1 -mt-2">
        {description}
      </p>
      <Link
        href={
          disabled
            ? '#'
            : `/dashboard/domains/${domainName.toLowerCase()}/question`
        }
      >
        {loading ? (
          <div className="mt-4 h-[40px] w-full lg:max-w-[200px] bg-gray-700 rounded-[6px] animate-pulse" />
        ) : (
          <button
            disabled={disabled}
            type="button"
            className={`mt-4 py-1.5 px-5 w-full h-[40px] border border-[rgba(240,246,252,0.10)] rounded-[6px] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400 text-[13px] font-sans font-medium leading-[20px] text-center
              ${
                getButtonClasses(disabled, domainName)
              }`}
          >
            {buttonLabel}
          </button>
        )}
      </Link>
    </div>
  )
}

export default DomainCard
