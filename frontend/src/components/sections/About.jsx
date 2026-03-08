import SectionLabel from '@/components/ui/SectionLabel'
import useScrollReveal from '@/hooks/useScrollReveal'

const STATS = [
  { number: '10K+', label: 'Students Trained' },
  { number: '10Cr+', label: 'Personal P&L Milestone' },
  { number: '5+', label: 'Years Teaching' },
]

export default function About() {
  const imgRef = useScrollReveal()
  const textRef = useScrollReveal()

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image */}
        <div ref={imgRef} className="reveal relative rounded-2xl overflow-hidden">
          <img
            src="https://res.cloudinary.com/dtbwolk88/image/upload/v1772895940/IMG_0896.JPG_ddrcjd.jpg"
            alt="Harshit Patel"
            className="w-full block brightness-[0.85] saturate-[0.85]"
          />
          {/* Gradient fade at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent pointer-events-none" />
        </div>

        {/* Text */}
        <div ref={textRef} className="reveal">
          <SectionLabel>About Harshit Patel</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-[#f0ede6] mb-6">
            Embark on a journey to become a  
            
            <em className="italic text-gold-light"> Proficient Trader.</em>
          </h2>

          <div className="flex flex-col gap-4 text-muted text-[0.97rem] leading-[1.8]">
            <p>
              I'm Harshit Patel, the owner of the Wizard Trader YouTube
              Channel, and I want to express my gratitude for your visit.
              It is crucial to make it clear that I am not a SEBI Registered
              Research Analyst first and foremost. 
            </p>
            <p>
              This platform's
              material is not meant to offer recommendations or advise
              on investments. Rather, this is a place where I impart the
              wisdom and understanding I've acquired over many
              years of stock trading experience.
            </p>
            <p>
              <em className="italic text-[#f0ede6]">Unleash your profitability with our inspiring trading courses</em>
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-white/[0.08]">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-gold-light leading-none mb-1">
                  {s.number}
                </div>
                <div className="text-xs text-muted tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
