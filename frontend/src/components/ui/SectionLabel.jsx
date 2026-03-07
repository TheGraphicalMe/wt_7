/**
 * SectionLabel
 * Renders the small uppercase mono label above section titles.
 * Includes a decorative left line.
 */
export default function SectionLabel({ children, center = false }) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.2em] uppercase text-gold mb-3 ${
        center ? 'justify-center' : ''
      }`}
    >
      {!center && <span className="inline-block w-6 h-px bg-gold" />}
      {children}
    </div>
  )
}
