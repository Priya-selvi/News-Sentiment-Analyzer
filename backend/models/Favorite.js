import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  description: String,
  url: String,
  link: String,
  urlToImage: String,
  sentiment: String,
  sentimentScore: Number,
  confidence: Number,
  positiveWords: [String],
  negativeWords: [String],
  category: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Favorite', favoriteSchema);
