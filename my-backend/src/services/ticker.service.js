import YahooFinance from 'yahoo-finance2';
import NodeCache from 'node-cache';

// Initialize the v3 instance
const yahooFinance = new YahooFinance();

// Cache data for 60 seconds to prevent rate limits
const cache = new NodeCache({ stdTTL: 60 });

const SYMBOL_MAP = {
  'EURUSD=X': 'EUR/USD',
  'GBPUSD=X': 'GBP/USD',
  '^GSPC': 'S&P 500',
  'GC=F': 'GOLD',
  'BTC-USD': 'BTC/USD',
  '^NDX': 'NAS100',
  'JPY=X': 'USD/JPY',
  'CL=F': 'OIL (WTI)',
};

export const getTickerData = async () => {
  const cacheKey = 'live_tickers';
  
  // 1. Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  // 2. Fetch from Yahoo Finance if cache is empty
  const symbolsToFetch = Object.keys(SYMBOL_MAP);
  const quotes = await yahooFinance.quote(symbolsToFetch);

  // 3. Format exactly for your frontend
  const formattedTickers = quotes.map((q) => {
    const changePercent = q.regularMarketChangePercent || 0;
    const isUp = changePercent > 0;
    
    return {
      symbol: SYMBOL_MAP[q.symbol],
      price: q.regularMarketPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }),
      change: `${isUp ? '+' : ''}${changePercent.toFixed(2)}%`,
      up: isUp,
    };
  });

  // 4. Save to cache and return
  cache.set(cacheKey, formattedTickers);
  return formattedTickers;
};