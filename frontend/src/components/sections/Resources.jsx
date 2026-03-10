import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import useScrollReveal from '@/hooks/useScrollReveal'



const RESOURCES = [
  {
    icon: '📈',
    title: "Beginner's Guide to Price Action",
    desc: 'Master the fundamentals of reading charts without indicators.',
  },
  {
    icon: '🎯',
    title: 'Candlestick Behavior',
    desc: 'Learn the psychology behind key candlestick patterns and setups.',
  },
  {
    icon: '🎓',
    title: 'Free Masterclass — Trading 101',
    desc: '60-minute intro session for absolute beginners.',
  },
  {
    icon: '💬',
    title: 'Student Community Access',
    desc: 'Join thousands of traders sharing charts and strategies daily.',
  },
]

export default function Resources() {
  const textRef = useScrollReveal('reveal-left')
  const cardsRef = useScrollReveal('reveal-right')

  return (
    <section id="resources" className="py-28 px-6 section-tint border-y border-white/[0.08]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Text */}
        <div ref={textRef} className="reveal">
          <SectionLabel>Get Started</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-[#f0ede6] mb-5">
            Start Here With Our
            <br />
            Free Resources
          </h2>
          <p className="text-muted leading-relaxed mb-8 max-w-md">
            No matter your background or goals, everything starts with learning
            the basics clearly and confidently. Thousands of everyday people have
            learned to trade using this simple approach.
          </p>
          <Button variant="primary" href="#blog">
            Access Free Resources →
          </Button>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="reveal flex flex-col gap-3">
          {RESOURCES.map((r) => (
            <div
              key={r.title}
              className="bg-[rgba(22,22,20,0.85)] border border-white/[0.08] rounded-xl px-5 py-4 flex items-center gap-4 hover:border-gold/30 hover:translate-x-1 transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-lg flex-shrink-0">
                {r.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#f0ede6] mb-0.5">
                  {r.title}
                </h4>
                <p className="text-xs text-muted leading-snug">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
