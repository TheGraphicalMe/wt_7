import express from 'express';
import cors from 'cors';
import tickerRoutes from './routes/ticker.routes.js';

const app = express();

// Middleware allowing your frontend to connect
app.use(cors()); 
app.use(express.json());

// Connect your routes
app.use('/api/tickers', tickerRoutes);

// Health check
app.use('/', (req, res) => res.send('API is running...'));

export default app;