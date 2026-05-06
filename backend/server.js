import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // must be first before any env usage

import passport, { initPassport } from './config/passport.js';
import connectDB from './config/db.js';
import newsRoutes from './routes/newsRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import authRoutes from './routes/authRoutes.js';

connectDB();
initPassport(); // initialize after dotenv

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/favorites', favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
