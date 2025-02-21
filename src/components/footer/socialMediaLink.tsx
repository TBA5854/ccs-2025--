import Image from 'next/image'
import { StaticImageData } from 'next/image'

export default function SocialMediaLink({
  href,
  icon,
}: {
  href: string
  icon: StaticImageData
}) {
  return (
    <a
      href={href}
      className={`flex flex-row items-center m-4 p-2 rounded-xl opacity-75 hover:bg-slate-700 transition-colors`}
      target="__blank"
    >
      <Image src={icon} alt="logo" style={{ width: '1.5em', height: '1.5em' }} />
    </a>
  )
}
