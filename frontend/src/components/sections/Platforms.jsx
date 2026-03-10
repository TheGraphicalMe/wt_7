import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import useScrollReveal from '@/hooks/useScrollReveal'

const PLATFORMS = [
  {
    name: 'Vantage',
    logo: 'https://res.cloudinary.com/dtbwolk88/image/upload/v1773133867/Vantage-Logo_e8slzo.png',
    logoAlt: 'Vantage Markets',
    badge: 'Forex & CFDs',
    badgeColor: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
    description:
      'Trade Forex, indices, commodities, and crypto CFDs with tight spreads on a trusted multi-asset broker.',
    stats: [
      { value: '1000+', label: 'Instruments' },
      { value: '172', label: 'Countries' },
      { value: '10+', label: 'Years' },
    ],
    link: 'https://vigco.co/la-com/WTARMY',
    accentColor: 'rgba(59,130,246,0.08)',
    borderHover: 'hover:border-blue-400/30',
    glowColor: 'rgba(59,130,246,0.15)',
  },
  {
    name: 'Delta Exchange',
    logo: 'https://res.cloudinary.com/dtbwolk88/image/upload/v1773133475/delta-exchange-logo2_gjbdu5.png',
    logoAlt: 'Delta Exchange',
    badge: 'Crypto Derivatives',
    badgeColor: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
    description:
      'Advanced crypto derivatives exchange offering futures, options, and perpetual contracts with competitive fees and professional trading tools.',
    stats: [
      { value: '200+', label: 'Markets' },
      { value: '0.02%', label: 'Maker Fee' },
      { value: '100x', label: 'Leverage' },
    ],
    link: 'https://www.delta.exchange/?code=RGKEWS',
    accentColor: 'rgba(168,85,247,0.08)',
    borderHover: 'hover:border-purple-400/30',
    glowColor: 'rgba(168,85,247,0.15)',
  },
]

export default function Platforms() {
  const headerRef = useScrollReveal()

  return (
    <section id="platforms" className="py-28 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="reveal text-center mb-16">
          <SectionLabel center>Recommended Platforms</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#f0ede6] mb-4">
            Start Trading With the
            <br />
            <em className="italic text-gold-light">Right Tools</em>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            Platforms personally vetted and recommended by Wizard Trader 7 for
            serious traders at every level.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {PLATFORMS.map((platform, i) => (
            <PlatformCard key={platform.name} platform={platform} delay={i * 0.12} />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-muted text-xs mt-10 opacity-50">
          * Affiliate links — we may earn a commission at no extra cost to you.
        </p>
      </div>
    </section>
  )
}

function PlatformCard({ platform, delay }) {
  const ref = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`reveal group relative bg-card border border-white/[0.08] ${platform.borderHover} rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${platform.glowColor}, transparent)`,
        }}
      />

      {/* Top accent bar */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(to right, transparent, ${platform.glowColor}, transparent)`,
        }}
      />

      <div className="p-8 relative z-10">

        {/* Logo + Badge row */}
    <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">

            {/* Logo box */}
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
            <img
                src={platform.logo}
                alt={platform.logoAlt}
                className="w-full h-full object-contain"
                onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.innerHTML = `<span class="font-display text-xl font-bold text-bg">${platform.name[0]}</span>`
                }}
            />
            </div>

            <div>
                <h3 className="font-display text-xl font-bold text-[#f0ede6]">
                    {platform.name}
                </h3>
                <span className={`inline-block font-mono text-[0.62rem] tracking-widest uppercase border rounded px-2 py-0.5 mt-0.5 ${platform.badgeColor}`}>
                    {platform.badge}
                </span>
            </div>
        </div>

        {/* Arrow icon */}
        <div className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-muted group-hover:border-gold/40 group-hover:text-gold transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
        </div>
    </div>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed mb-7">
          {platform.description}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-7">
          {platform.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-3 rounded-xl border border-white/[0.06]"
              style={{ background: platform.accentColor }}
            >
              <div className="font-display text-lg font-bold text-[#f0ede6] leading-none mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-[0.6rem] tracking-widest uppercase text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
            <a
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-body font-semibold text-sm tracking-wide bg-gold text-bg hover:bg-gold-light transition-all duration-200 shadow-gold hover:shadow-gold-lg hover:-translate-y-px"
            >
          Open Account
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}