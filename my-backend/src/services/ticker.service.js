import YahooFinance from 'yahoo-finance2';
import NodeCache from 'node-cache';

const yahooFinance = new YahooFinance();

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

  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  const symbolsToFetch = Object.keys(SYMBOL_MAP);

  const quotes = await Promise.all(
    symbolsToFetch.map(symbol => yahooFinance.quote(symbol))
  );

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

  cache.set(cacheKey, formattedTickers);

  return formattedTickers;
};