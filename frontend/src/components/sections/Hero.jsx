import Button from '@/components/ui/Button'
import TickerTape from '@/components/ui/TickerTape'

const IMAGE_URL_MOBILE  = 'https://res.cloudinary.com/dtbwolk88/image/upload/f_auto,q_auto,w_800/v1772895942/IMG_2033.JPG_xixqhy.jpg'
const IMAGE_URL_DESKTOP = 'https://res.cloudinary.com/dtbwolk88/image/upload/f_auto,q_auto,w_1400/v1772895942/IMG_2033.JPG_xixqhy.jpg'

const GRADIENT = `
  linear-gradient(to right, #0a0a08 0%, rgba(10,10,8,0.9) 15%, rgba(10,10,8,0.4) 35%, transparent 55%),
  radial-gradient(ellipse 70% 40% at 50% 99%, rgba(168,85,247,0.18) 0%, transparent 70%),
  linear-gradient(to bottom, rgba(10,10,8,0.3) 0%, rgba(10,10,8,0) 40%, rgba(10,10,8,0.7) 80%, #0a0a08 100%)
`

export default function Hero() {
  return (
    <>
      {/* Spacer for fixed nav */}
      <div className="h-[70px] md:hidden" />

      {/* Ticker */}
      {/* <TickerTape /> */}

      {/* ── MOBILE layout (below md) ── */}
      <section className="md:hidden flex flex-col h-[calc(100vh-70px)]">

        {/* Image container takes remaining space */}
        <div className="relative w-full flex-1 min-h-0 bg-bg overflow-hidden flex items-end justify-center">
          <img
            src={IMAGE_URL_MOBILE}
            alt="Wizard Trader 7 — Trading Made Simple"
            fetchPriority="high"
            className="hero-img absolute inset-0 w-full h-full object-cover object-right-bottom brightness-[0.9] saturate-[0.8]"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 70% 40% at 50% 99%, rgba(168,85,247,0.18) 0%, transparent 70%),
                linear-gradient(to bottom, rgba(10,10,8,0.1) 0%, rgba(10,10,8,0) 30%, rgba(10,10,8,0.7) 80%, #0a0a08 100%)
              `,
            }}
          />
        </div>

        {/* Text area takes its natural height */}
        <div className="px-6 py-6 flex flex-col gap-5 bg-bg shrink-0 z-10 relative">
          <span className="inline-block font-mono text-[0.7rem] tracking-[0.2em] uppercase text-gold border border-gold/30 rounded-full px-4 py-1.5 w-fit">
            Trading Made Simple For Anyone
          </span>
          <h1 className="font-display text-4xl font-bold leading-[1.15] text-[#f0ede6]">
            Your First Step Towards Trading Becoming a{' '}
            <em className="italic text-gold-light">Profitable Career</em>
          </h1>
          <p className="text-muted text-sm leading-relaxed">
            Learn to trade based on your skill level, even if you've never placed a trade before.
          </p>
          <Button
            variant="primary"
            href="https://www.wizardtrader7.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit"
          >
            Become Student →
          </Button>
        </div>
      </section>

      {/* ── DESKTOP layout (md and above) ── */}
      <section className="hidden md:flex relative h-screen min-h-[600px] flex-col items-start justify-center pt-[70px] px-6 md:px-20 overflow-hidden">

        {/* Background image — your exact original */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={IMAGE_URL_DESKTOP}
            alt="Wizard Trader 7 — Trading Made Simple"
            fetchPriority="high"
            className="hero-img absolute top-0 left-0 w-full h-full object-cover brightness-[0.8] saturate-[0.8]"
          />
        </div>

        {/* Gradient overlay — your exact original */}
        <div
          className="absolute inset-0"
          style={{ background: GRADIENT }}
        />

        {/* Content — your exact original */}
        <div className="relative z-10 max-w-2xl animate-fadeUp">
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
          <p className="text-muted text-base md:text-lg leading-relaxed mx-auto mb-10">
            Learn to trade based on your skill level, even if you've never
            placed a trade before.
          </p>
          <Button
            variant="primary"
            href="https://www.wizardtrader7.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Become Student →
          </Button>
        </div>
      </section>
    </>
  )
}