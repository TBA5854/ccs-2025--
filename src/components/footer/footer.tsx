import SocialMediaLink from './socialMediaLink'
import github from '../../../public/logos/github.svg'
import linkedin from '../../../public/logos/linkedin.svg'
import instagram from '../../../public/logos/instagram.svg'
import twitter from '../../../public/logos/twitter.svg'

export default function Footer() {
  return (
    <div className="flex flex-row justify-center align-items-center">
      <SocialMediaLink
        href="https://github.com/csivitu"
        icon={github}
      />
      <SocialMediaLink
        href="https://www.linkedin.com/company/csivitu/"
        icon={linkedin}
      />
      <SocialMediaLink
        href="https://x.com/csivitu"
        icon={twitter}
      />
      <SocialMediaLink
        href="https://www.instagram.com/csivitu/"
        icon={instagram}
      />
    </div>
  )
}
