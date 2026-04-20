import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import useScrollReveal from '@/hooks/useScrollReveal'
import programsData from '@/data/programsData'

export default function Programs() {
  const headerRef = useScrollReveal('reveal-left')

  return (
    <section id="programs" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="reveal mb-12">
          <SectionLabel>Our Exclusive Programs</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#f0ede6]">
            Choose Your Path
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programsData.map((program, i) => (
            <ProgramCard key={program.id} program={program} delay={i * 0.1} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ program, delay, index }) {
  const ref = useScrollReveal(index % 2 === 0 ? 'reveal-left' : 'reveal-right')

  return (
    <div
      ref={ref}
      className="reveal rounded-2xl overflow-hidden border border-white/[0.08] bg-[rgba(22,22,20,0.85)] hover:-translate-y-1 hover:border-gold/25 transition-all duration-300 flex flex-col"
      style={{ transitionDelay: `${delay}s` }}
    >

      {/* Thumbnail */}
      {program.image ? (
        <div className="relative">
          <img
            src={program.image}
            alt={program.title}
            className={`w-full aspect-[893/1600] object-center block brightness-90 ${
              program.imageFit === 'contain' ? 'object-contain bg-black' : 'object-cover'
            }`}
          />
          {/* Overlay — only shows if comingSoon */}
          {program.comingSoon && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-[2px]">
              <span className="text-4xl">{program.emoji}</span>
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-white border border-white/30 rounded-full px-3 py-1 bg-black/40">
                Coming Soon
              </span>
            </div>
          )}
        </div>
      ) : (
        // Fallback dark placeholder (for cards with no image at all)
        <div className="w-full aspect-[893/1600] bg-gradient-to-br from-[#1a1a16] to-[#111110] flex flex-col items-center justify-center gap-3">
          <span className="text-4xl">{program.emoji}</span>
          <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-muted border border-white/[0.08] rounded-full px-3 py-1">
            Coming Soon
          </span>
        </div>
      )}

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-semibold text-[#f0ede6] mb-2">
          {program.title}
        </h3>
        {/* flex-1 on the description pushes everything below it to the bottom */}
        <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
          {program.description}
        </p>

        {/* Footer Container - Always pushed to the bottom */}
        <div className="mt-auto flex flex-col">
          
          {/* Pricing & Coupon Section */}
          {(program.totalInvestment || program.couponCode || program.couponValue) && (
            <div className="border-t border-white/[0.08] pt-5 mb-6 flex flex-col gap-4">
              
              {/* Total Investment */}
              {program.totalInvestment && (
                <div>
                  <span className="font-mono text-[0.65rem] tracking-widest uppercase text-muted block mb-1">
                    Total Investment
                  </span>
                  <div className="font-display text-2xl font-bold text-[#f0ede6]">
                    {program.totalInvestment}
                  </div>
                </div>
              )}

              {/* Coupon Box Area - Fixed height reserves empty space if no coupon exists */}
              <div className="h-[46px] w-full">
                {program.couponCode && (
                  <div className="w-full h-full bg-white/[0.03] border border-white/[0.08] border-dashed px-3 flex justify-between items-center gap-2 rounded-xl">
                    <span className="font-body text-xs text-muted whitespace-nowrap">
                      {program.couponValue ? `Save ${program.couponValue}:` : 'Use code:'}
                    </span>
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="font-display text-sm text-[#cbb375] tracking-wider truncate font-bold">
                        {program.couponCode}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigator.clipboard.writeText(program.couponCode);
                        }}
                        className="text-[#cbb375] hover:text-white p-1 transition-colors flex-shrink-0"
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
              </div>

            </div>
          )}

          {/* CTA Button */}
          {program.comingSoon ? (
            <Button variant="ghost" className="w-full text-center text-base py-3.5 px-7 rounded-lg">
              {program.ctaLabel}
            </Button>
          ) : (
            <Button
              variant="outline"
              href={program.ctaHref}
              className="w-full text-center text-base py-3.5 px-7 rounded-lg"
            >
              {program.ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}