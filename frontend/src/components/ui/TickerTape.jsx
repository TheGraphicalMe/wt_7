import { useState, useEffect } from 'react';

export default function TickerTape() {
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        // Fetching from your new local Node.js server
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tickers`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        
        if (result.success) {
          // result.data matches the array you saw in your browser!
          setTickers(result.data); 
        } else {
          throw new Error(result.message || 'Failed to load tickers');
        }
      } catch (err) {
        console.error("Error fetching tickers:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // 1. Fetch immediately when the component loads
    fetchTickers();

    // 2. Set up a timer to fetch fresh data every 60 seconds silently
    const intervalId = setInterval(fetchTickers, 60000);

    // 3. Cleanup the timer if the component is removed
    return () => clearInterval(intervalId);
  }, []);

  // Show a clean loading state while fetching the first time
  if (loading) {
    return (
      <div className="bg-[rgba(22,22,20,0.85)] border-y border-white/[0.08] py-2.5 text-center text-muted font-mono text-[0.75rem]">
        Loading live market data...
      </div>
    );
  }

  // If the backend fails, return null to hide the tape, or show an error
  if (error || tickers.length === 0) {
    return null; 
  }

  // Duplicate the array for a seamless infinite CSS scroll
  const items = [...tickers, ...tickers];

  return (
    <div className="bg-[rgba(22,22,20,0.85)] border-y border-white/[0.08] overflow-hidden py-2.5">
      {/* Added hover:pause so users can hover to read a specific price */}
      <div className="flex animate-ticker whitespace-nowrap hover:[animation-play-state:paused]">
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
  );
}