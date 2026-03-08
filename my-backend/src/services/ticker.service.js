import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();
import NodeCache from 'node-cache';
import Bottleneck from 'bottleneck';

// Cache results for 5 minutes instead of 60 seconds (reduces API calls)
const cache = new NodeCache({ stdTTL: 300 });

// Only allow 1 request at a time, with 1.5 second gap between each
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1500,
});

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

// Retry a function up to 3 times with exponential backoff
async function withRetry(fn, retries = 3, baseDelay = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const is429 =
        error.message?.includes('429') ||
        error.message?.includes('Too Many Requests');

      if (is429 && attempt < retries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.warn(
          `⚠️  Rate limited (attempt ${attempt}/${retries}). Retrying in ${delay}ms...`
        );
        await new Promise((r) => setTimeout(r, delay));
      } else {
        throw error;
      }
    }
  }
}

// Fetch a single quote — throttled + retried
async function fetchSingleQuote(symbol) {
  return limiter.schedule(() =>
    withRetry(() => yahooFinance.quote(symbol))
  );
}

export const getTickerData = async () => {
  const cacheKey = 'live_tickers';

  // Return cached data if available
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('✅ Returning cached ticker data');
    return cachedData;
  }

  console.log('🔄 Fetching fresh ticker data from Yahoo Finance...');

  const symbolsToFetch = Object.keys(SYMBOL_MAP);
  const results = [];

  // Fetch one by one (throttled), NOT all at once
  for (const symbol of symbolsToFetch) {
    try {
      const q = await fetchSingleQuote(symbol);
      const changePercent = q.regularMarketChangePercent || 0;
      const isUp = changePercent > 0;

      results.push({
        symbol: SYMBOL_MAP[q.symbol],
        price: q.regularMarketPrice.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        }),
        change: `${isUp ? '+' : ''}${changePercent.toFixed(2)}%`,
        up: isUp,
      });

      console.log(`✅ Fetched ${symbol}`);
    } catch (error) {
      console.error(`❌ Failed to fetch ${symbol}:`, error.message);
      // Add a placeholder so frontend doesn't break
      results.push({
        symbol: SYMBOL_MAP[symbol],
        price: 'N/A',
        change: '0.00%',
        up: false,
      });
    }
  }

  // Cache the results
  cache.set(cacheKey, results);

  return results;
};