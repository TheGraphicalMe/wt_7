import { useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import useScrollReveal from '@/hooks/useScrollReveal'
import faqData from '@/data/faqData'

export default function FAQ() {
  const [openId, setOpenId] = useState(null)
  const headerRef = useScrollReveal()
  const listRef = useScrollReveal()

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section id="faq" className="py-28 px-6 bg-surface border-t border-white/[0.08]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="reveal text-center mb-14">
          <SectionLabel center>FAQ</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#f0ede6]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div ref={listRef} className="reveal">
          {faqData.map((item) => {
            const isOpen = openId === item.id
            return (
              <div
                key={item.id}
                className="border-t border-white/[0.08] last:border-b last:border-white/[0.08]"
              >
                <button
                  className="w-full flex justify-between items-center gap-4 py-5 text-left font-body text-base font-medium text-[#f0ede6] hover:text-gold-light transition-colors duration-200"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                >
                  {item.question}
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-sm text-gold transition-all duration-200 ${
                      isOpen
                        ? 'border-gold/40 bg-gold/10'
                        : 'border-white/[0.08]'
                    }`}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {/* Answer with CSS height transition */}
                <div
                  className="overflow-hidden transition-all duration-350 ease-in-out"
                  style={{ maxHeight: isOpen ? '300px' : '0px' }}
                >
                  <p className="text-muted text-sm leading-relaxed pb-5">
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
