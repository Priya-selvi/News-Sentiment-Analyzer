import axios from 'axios';
import Sentiment from 'sentiment';
import dotenv from 'dotenv';

dotenv.config(); // 🔥 important to load .env

const sentiment = new Sentiment();

export const getNews = async (req, res) => {
  try {
    console.log("📡 Fetching from NewsAPI with key:", process.env.NEWS_API_KEY?.slice(0, 6) + "******");

      const { data } = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_API_KEY}&country=in&language=en`
    );
    if (!data.results || data.results.length === 0) {
      console.log("⚠️ No news returned from API:", data);
      return res.json([]);
    }

    const analyzedNews = data.results.map(article => {
      const text = article.description || article.content || '';
      const analysis = sentiment.analyze(text);
      const score = analysis.score;
      const label = score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral';
      
      // Calculate confidence (0-100%)
      const confidence = Math.min(Math.abs(score) * 10, 100);
      
      return { 
        ...article, 
        sentiment: label, 
        sentimentScore: score,
        confidence: Math.round(confidence),
        positiveWords: analysis.positive,
        negativeWords: analysis.negative,
        category: article.category?.[0] || 'general',
        urlToImage: article.image_url, 
        url: article.link 
      };
    });

    res.json(analyzedNews);
  } catch (error) {
    console.error("❌ Error fetching news:", error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Error fetching news', 
      error: error.response?.data || error.message 
    });
  }
};
