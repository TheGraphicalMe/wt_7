import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import useScrollReveal from '@/hooks/useScrollReveal'

export const PLATFORMS = [
  {
    title: 'Vantage',
    badge: 'FOREX & CFDS',
    desc: 'Trade Forex, indices, commodities, and crypto CFDs with tight spreads on a trusted multi-asset broker.',
    code: 'WTARMY',
    stats: [
      { value: '1000+', label: 'INSTRUMENTS' },
      { value: '172', label: 'COUNTRIES' },
      { value: '10+', label: 'YEARS' },
    ],
    link: 'https://www.vantagemarkets.com/open-live-account/?affid=MjMxNDMwMzU=&invitecode=WTARMY',
    logo: '/assets/media/vantage.jpg',
    logoFit: 'contain',
  },
  {
    title: 'Delta Exchange',
    badge: 'CRYPTO DERIVATIVES',
    desc: 'Advanced crypto derivatives exchange offering futures, options, and perpetual contracts with competitive fees and professional trading tools.',
    code: 'https://www.delta.exchange/?code=RGKEWS',
    stats: [
      { value: '200+', label: 'MARKETS' },
      { value: '0.02%', label: 'MAKER FEE' },
      { value: '100X', label: 'LEVERAGE' },
    ],
    link: 'https://www.delta.exchange/?code=RGKEWS',
    logo: '/assets/media/delta.jpg',
  },
  {
    title: 'Exness',
    badge: 'MULTI-ASSET BROKER',
    desc: 'Experience instant withdrawals and market-leading spreads with one of the most reliable multi-asset brokers in the world.',
    code:  'https://one.exnessonelink.com/a/xume42lkdk',
    stats: [
      { value: 'INSTANT', label: 'WITHDRAWAL' },
      { value: '0.0', label: 'SPREADS' },
      { value: 'HIGH', label: 'LEVERAGE' },
    ],
    link: 'https://one.exnessonelink.com/a/xume42lkdk',
    logo: '/assets/media/exness.jpg',
  },
  {
    title: 'XM',
    badge: 'FOREX & COMMODITIES',
    desc: 'Trade a wide range of instruments with ultra-low spreads and exceptional execution.',
    code: 'Wizardtrader', 
    stats: [
      { value: '1000+', label: 'ASSETS' },
      { value: '0', label: 'REQUOTES' },
      { value: '24/7', label: 'SUPPORT' },
    ],
    link: 'https://clicks.pipaffiliates.com/c?c=1182283&l=en&p=1',
    logo: '/assets/media/xm.jpg',
  },
]

export default function Platforms() {
  const headerRef = useScrollReveal('reveal-up')

  return (
    <section id="platforms" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="reveal text-center mb-16">
          <SectionLabel center>Recommended Platforms</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#f0ede6] mb-4">
            Start Trading With the
            <br />
            {/* UPDATED: Changed from text-gold-light to text-purple-300 */}
            <em className="italic text-purple-300">Right Tools</em>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            Platforms personally vetted and recommended by Wizard Trader 7 for
            serious traders at every level.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {PLATFORMS.map((platform, i) => (
            <PlatformCard key={platform.title} platform={platform} delay={i * 0.12} />
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
  const ref = useScrollReveal(
    platform.title === 'Exness' || delay === 0
      ? 'reveal-left'
      : 'reveal-right'
  )

  return (
    <div
      ref={ref}
      className="reveal group relative bg-[rgba(22,22,20,0.85)] border border-white/[0.08] hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          // UPDATED: Changed gold RGBA to a semi-transparent purple (93, 33, 234)
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(147, 51, 234, 0.15), transparent)`,
        }}
      />

      {/* Top accent bar */}
      <div
        className="h-px w-full"
        style={{
          // UPDATED: Changed gold RGBA to a semi-transparent purple
          background: `linear-gradient(to right, transparent, rgba(147, 51, 234, 0.5), transparent)`,
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
                alt={platform.title}
                className={`w-full h-full ${platform.logoFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.innerHTML = `<span class="font-display text-xl font-bold text-[#f0ede6]">${platform.title[0]}</span>`
                }}
              />
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-[#f0ede6]">
                {platform.title}
              </h3>
              {/* UPDATED: Changed text-gold, border-gold/20, bg-gold/5 to purple-400, purple-600/20, purple-600/5 */}
              <span className="inline-block font-mono text-[0.62rem] tracking-widest uppercase border rounded px-2 py-0.5 mt-0.5 text-purple-400 border-purple-600/20 bg-purple-600/5">
                {platform.badge}
              </span>
            </div>
          </div>

          {/* Arrow icon */}
          {/* UPDATED: Changed border-gold/40, text-gold to purple-400/40, text-purple-400 */}
          <div className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-muted group-hover:border-purple-400/40 group-hover:text-purple-400 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed mb-7">
          {platform.desc}
        </p>

        {/* Promo Code Box */}
        {platform.code && (
          <div className="mb-6 bg-white/[0.03] border border-white/[0.08] border-dashed px-3 py-2.5 rounded-xl flex justify-between items-center gap-2">
            <span className="font-body text-xs text-muted whitespace-nowrap">Use partner code:</span>
            <div className="flex items-center gap-2 overflow-hidden">
              {/* UPDATED: Changed text-gold to text-purple-400 */}
              <span className="font-display text-sm text-purple-400 tracking-wider truncate">
                {platform.code}
              </span>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigator.clipboard.writeText(platform.code);
                }}
                // UPDATED: Changed text-gold hover:text-gold-light to purple-400 hover:text-purple-300
                className="text-purple-400 hover:text-purple-300 p-1 transition-colors flex-shrink-0"
                title="Copy code"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-7">
          {platform.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-3 rounded-xl border border-white/[0.06] bg-white/[0.02]"
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
          // UPDATED: bg-gold -> purple-600, text-black -> white, hover:bg-[#ffe599] -> purple-500
          // UPDATED: Changed shadow and hover:shadow RGBA to use purple color
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-body font-semibold text-sm tracking-wide bg-purple-600 text-white hover:bg-purple-500 transition-all duration-200 shadow-[0_0_15px_rgba(147, 51, 234, 0.3)] hover:shadow-[0_0_25px_rgba(147, 51, 234, 0.5)] hover:-translate-y-px"
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