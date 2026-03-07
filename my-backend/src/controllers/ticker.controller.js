import { getTickerData } from '../services/ticker.service.js';

export const getTickers = async (req, res) => {
  try {
    const tickers = await getTickerData();
    res.status(200).json({ success: true, data: tickers });
  } catch (error) {
    console.error('Error in getTickers controller:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch ticker data' });
  }
};