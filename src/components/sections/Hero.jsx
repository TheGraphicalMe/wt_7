import Button from '@/components/ui/Button'
import TickerTape from '@/components/ui/TickerTape'

export default function Hero() {
  return (
    <>
      {/* Spacer for fixed nav */}
      <div className="h-[70px]" />

      {/* Ticker */}
      <TickerTape />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-hero bg-cover bg-center brightness-[0.5] saturate-[0.7]" />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(201,169,110,0.12) 0%, transparent 70%), linear-gradient(to bottom, rgba(10,10,8,0.3) 0%, rgba(10,10,8,0) 40%, rgba(10,10,8,0.7) 80%, #0a0a08 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl animate-fadeUp">
          <span className="inline-block font-mono text-[0.72rem] tracking-[0.2em] uppercase text-gold border border-gold/30 rounded-full px-4 py-1.5 mb-6">
            Trading Made Simple For Anyone
          </span>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] text-[#f0ede6] mb-5">
            Your First Step Towards Trading
            <br />
            Becoming a{' '}
            <em className="italic text-gold-light font-display">
              Profitable Career
            </em>
          </h1>

          <p className="text-muted text-base md:text-lg leading-relaxed max-w-[520px] mx-auto mb-10">
            Learn to trade based on your skill level, even if you've never
            placed a trade before.
          </p>

          <Button
            variant="primary"
            href="https://www.wizardtrader7.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the next masterclass →
          </Button>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-[0.65rem] tracking-[0.15em] uppercase animate-fadeUp">
          <span>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-scrollPulse" />
        </div> */}
      </section>
    </>
  )
}
