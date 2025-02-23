import React from 'react'
import { PortfolioCategory } from '@prisma/client'
import { titleCase } from '@/lib/utils'
interface Portfolio {
  category: PortfolioCategory
  link: string
}

interface PortfolioSectionProps {
  isEditing: boolean
  portfolios: Portfolio[]
  onPortfolioChange: (portfolios: Portfolio[]) => void
}
const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  isEditing,
  portfolios,
  onPortfolioChange,
}) => {
  const socialLinks = [
    PortfolioCategory.GITHUB,
    PortfolioCategory.LINKEDIN,
    PortfolioCategory.INSTAGRAM,
    PortfolioCategory.SPOTIFY,
  ]

  const professionalLinks = [
    PortfolioCategory.TECH,
    PortfolioCategory.DESIGN,
    PortfolioCategory.MANAGEMENT,
    PortfolioCategory.VIDEO,
  ]

  const handlePortfolioChange = (category: PortfolioCategory, link: string) => {
    const updatedPortfolios = portfolios.map((p) =>
      p.category === category ? { ...p, link } : p,
    )
    if (!updatedPortfolios.some((p) => p.category === category)) {
      updatedPortfolios.push({ category, link })
    }
    onPortfolioChange(updatedPortfolios)
  }

  const getPortfolioLink = (category: PortfolioCategory) => {
    return portfolios.find((p) => p.category === category)?.link || ''
  }

  const getCategoryIcon = (category: PortfolioCategory) => {
    const icons = {
      TECH: '💻',
      DESIGN: '🎨',
      MANAGEMENT: '📊',
      VIDEO: '🎥',
      GITHUB: '🐙',
      LINKEDIN: '💼',
      INSTAGRAM: '📸',
      SPOTIFY: '🎵',
    }
    return icons[category] || '🔗'
  }

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold mb-2">Professional Links</h2>
          <div className="space-y-2">
            {professionalLinks.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <div className="w-32 text-xs text-zinc-400">
                  {getCategoryIcon(category)} {titleCase(category)}
                </div>
                <input
                  type="url"
                  value={getPortfolioLink(category)}
                  onChange={(e) =>
                    handlePortfolioChange(category, e.target.value)
                  }
                  className="flex-1 h-8 text-xs bg-transparent placeholder:text-zinc-400 text-zinc-400 border border-zinc-800 rounded-md px-3 transition duration-300 ease focus:outline-none focus:border-zinc-400"
                  placeholder={`Add ${titleCase(category)} link`}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-2">Social Links</h2>
          <div className="space-y-2">
            {socialLinks.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <div className="w-32 text-xs text-zinc-400">
                  {getCategoryIcon(category)} {titleCase(category)}
                </div>
                <input
                  type="url"
                  value={getPortfolioLink(category)}
                  onChange={(e) =>
                    handlePortfolioChange(category, e.target.value)
                  }
                  className="flex-1 h-8 text-xs bg-transparent placeholder:text-zinc-400 text-zinc-400 border border-zinc-800 rounded-md px-3 transition duration-300 ease focus:outline-none focus:border-zinc-400"
                  placeholder={`Add ${titleCase(category)} link`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const activePortfolios = portfolios.filter((p) => p.link)

  if (activePortfolios.length === 0) {
    return (
      <div className="text-sm text-zinc-400">No portfolio links added yet</div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-2 gap-3">
        {activePortfolios.map((portfolio) => (
          <a
            key={portfolio.category}
            href={portfolio.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            {getCategoryIcon(portfolio.category)}{' '}
            {titleCase(portfolio.category)}
          </a>
        ))}
      </div>
    </div>
  )
}

export default PortfolioSection
