const TICKERS = [
  { symbol: 'EUR/USD', price: '1.0842', change: '+0.12%', up: true },
  { symbol: 'GBP/USD', price: '1.2634', change: '-0.08%', up: false },
  { symbol: 'S&P 500', price: '5,234.18', change: '+0.43%', up: true },
  { symbol: 'GOLD', price: '2,312.40', change: '+0.65%', up: true },
  { symbol: 'BTC/USD', price: '67,842', change: '+1.20%', up: true },
  { symbol: 'NAS100', price: '18,102', change: '-0.22%', up: false },
  { symbol: 'USD/JPY', price: '154.62', change: '+0.18%', up: true },
  { symbol: 'OIL (WTI)', price: '79.34', change: '-0.31%', up: false },
]

export default function TickerTape() {
  // Duplicate for seamless infinite scroll
  const items = [...TICKERS, ...TICKERS]

  return (
    <div className="bg-card border-y border-white/[0.08] overflow-hidden py-2.5">
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map((ticker, i) => (
          <span
            key={i}
            className="flex items-center gap-2 px-8 font-mono text-[0.75rem] tracking-wide text-muted flex-shrink-0"
          >
            <span className="text-[#f0ede6]/60">{ticker.symbol}</span>
            <span className={ticker.up ? 'text-green-400' : 'text-red-400'}>
              {ticker.up ? '▲' : '▼'} {ticker.price}{' '}
              <span className="opacity-80">{ticker.change}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
