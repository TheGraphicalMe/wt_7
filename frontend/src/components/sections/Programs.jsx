import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import useScrollReveal from '@/hooks/useScrollReveal'
import programsData from '@/data/programsData'

export default function Programs() {
  const headerRef = useScrollReveal()

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
            <ProgramCard key={program.id} program={program} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ program, delay }) {
  const ref = useScrollReveal()

  return (
    <div
      ref={ref}
      className="reveal rounded-2xl overflow-hidden border border-white/[0.08] bg-card hover:-translate-y-1 hover:border-gold/25 transition-all duration-300"
      style={{ transitionDelay: `${delay}s` }}
    >

    {/* Thumbnail */}
    {program.image ? (
      <div className="relative">
        <img
          src={program.image}
          alt={program.title}
          className="w-full aspect-[3/4] object-cover object-center block brightness-90"
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
      <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#1a1a16] to-[#111110] flex flex-col items-center justify-center gap-3">
        <span className="text-4xl">{program.emoji}</span>
        <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-muted border border-white/[0.08] rounded-full px-3 py-1">
          Coming Soon
        </span>
      </div>
    )}

      {/* Body */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-[#f0ede6] mb-2">
          {program.title}
        </h3>
        <p className="text-xs text-muted leading-relaxed mb-5">
          {program.description}
        </p>
        {program.comingSoon ? (
          <Button variant="ghost">{program.ctaLabel}</Button>
        ) : (
          <Button variant="outline" href={program.ctaHref}>
            {program.ctaLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
