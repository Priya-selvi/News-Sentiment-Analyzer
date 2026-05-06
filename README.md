# 📰 NewsSentiment - Advanced News Analyzer

A modern, full-stack news sentiment analysis application with real-time analytics, smart filtering, and beautiful UI.

![Version](https://img.shields.io/badge/version-2.0-blue)
![React](https://img.shields.io/badge/React-19.1-61dafb)
![Node](https://img.shields.io/badge/Node-ES6+-green)

---

## ✨ Features

### 🧠 Smart Sentiment Analysis
- **Confidence Scoring**: Each article shows 0-100% confidence level
- **Word Highlighting**: Positive/negative words highlighted in descriptions
- **Emoji Indicators**: Visual sentiment representation (😊 😞 😐)
- **Detailed Metrics**: Sentiment score, positive/negative word extraction

### 🔍 Advanced Search & Filtering
- **Keyword Search**: Real-time search across titles and descriptions
- **Sentiment Filter**: Filter by Positive, Negative, or Neutral
- **Category Filter**: Browse by news categories (sports, tech, politics, etc.)
- **Results Counter**: Shows filtered vs total articles

### 📊 Analytics Dashboard
- **Sentiment Distribution**: Interactive pie chart
- **Category Analysis**: Bar chart showing sentiment by category
- **Key Metrics**: Total articles, sentiment breakdown, avg confidence
- **Visual Insights**: Understand news trends at a glance

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Frosted glass effect with backdrop blur
- **Dark Mode**: Toggle between light/dark themes (persisted)
- **Smooth Animations**: Hover effects, transitions, loading states
- **Skeleton Loading**: Beautiful loading placeholders
- **Responsive Design**: Works on all screen sizes

### ⚡ Performance Optimizations
- **API Caching**: 5-minute cache to reduce API calls
- **Lazy Loading**: Images load on-demand
- **Optimized Rendering**: useMemo for filtered results
- **Fast Build**: Vite for lightning-fast development

### ❤️ User Features
- **Save Favorites**: Bookmark articles to MongoDB
- **Persistent Storage**: Favorites saved per session
- **Quick Actions**: One-click save/remove
- **Visual Feedback**: Success animations on actions

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Vite** - Build tool
- **CSS3** - Custom styling (no frameworks)

### Backend
- **Node.js + Express** - REST API
- **MongoDB + Mongoose** - Database
- **Sentiment.js** - NLP sentiment analysis
- **Axios** - HTTP client
- **NewsData.io API** - News source

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB running on `localhost:27017`
- NewsData.io API key

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd news-analyzer
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/newsSentiment
NEWS_API_KEY=your_newsdata_io_api_key
```

Start backend:
```bash
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Open Browser**
```
http://localhost:5173
```

---

## 📁 Project Structure

```
news-analyzer/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── newsController.js  # News + sentiment logic
│   │   └── favoriteController.js
│   ├── models/
│   │   └── Favorite.js        # Mongoose schema
│   ├── routes/
│   │   ├── newsRoutes.js
│   │   └── favoriteRoutes.js
│   ├── .env
│   └── server.js              # Express app
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Nav + dark mode toggle
│   │   │   ├── NewsList.jsx       # Main news feed
│   │   │   ├── NewsCard.jsx       # Enhanced card with sentiment
│   │   │   ├── SearchFilter.jsx   # Search + filter controls
│   │   │   ├── Dashboard.jsx      # Analytics page
│   │   │   ├── Favorites.jsx      # Saved articles
│   │   │   └── Loader.jsx         # Loading spinner
│   │   ├── App.jsx            # Routes
│   │   ├── index.css          # Global styles
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 🎯 API Endpoints

### News
- `GET /api/news` - Fetch latest news with sentiment analysis

### Favorites
- `GET /api/favorites` - Get all saved articles
- `POST /api/favorites` - Save an article
- `DELETE /api/favorites/:id` - Remove saved article

---

## 🎨 UI Features Breakdown

### NewsCard Enhancements
- Category badge overlay
- Confidence progress bar
- Highlighted positive/negative words
- Word tags showing key sentiment terms
- Smooth hover animations
- Glassmorphism background

### Dashboard Components
- 5 stat cards (total, positive, negative, neutral, avg confidence)
- Pie chart for sentiment distribution
- Bar chart for category-wise sentiment
- Responsive grid layout

### Dark Mode
- System-aware default
- Persisted in localStorage
- Smooth color transitions
- Optimized contrast ratios

---

## 🔮 Future Enhancements

### Phase 2 (Recommended Next Steps)
- [ ] **User Authentication** (JWT-based login/signup)
- [ ] **Per-user Favorites** (link favorites to user accounts)
- [ ] **Advanced NLP** (entity extraction, topic modeling)
- [ ] **Real-time Updates** (WebSocket for live news)
- [ ] **Export Reports** (PDF/CSV export of analytics)
- [ ] **Multi-language Support** (i18n)
- [ ] **PWA Support** (offline mode, push notifications)

---

## 📊 Sentiment Analysis Details

The app uses the `sentiment` npm package which:
- Analyzes text using AFINN-165 wordlist
- Scores from -5 (very negative) to +5 (very positive)
- Extracts positive/negative words
- Confidence calculated as: `min(abs(score) * 10, 100)`

**Example:**
```javascript
Text: "This amazing breakthrough is terrible for competitors"
Score: 2 (slightly positive)
Confidence: 20%
Positive: ["amazing", "breakthrough"]
Negative: ["terrible"]
```

---

## 🐛 Troubleshooting

**MongoDB Connection Error**
```bash
# Start MongoDB
mongod --dbpath /path/to/data
```

**API Rate Limit**
- NewsData.io free tier: 200 requests/day
- Caching reduces API calls (5-min TTL)

**Build Warnings**
- Large chunk size is expected (recharts library)
- Production build is optimized

---

## 📝 License

MIT License - feel free to use for your portfolio!

---

## 🙌 Credits

- **NewsData.io** - News API
- **Sentiment.js** - NLP library
- **Recharts** - Chart library
- **Vite** - Build tool

---

## 💼 Portfolio Tips

**Highlight These Features in Interviews:**
1. ✅ Real-world API integration with error handling
2. ✅ Advanced state management (search, filter, cache)
3. ✅ Data visualization with charts
4. ✅ Performance optimization (caching, lazy loading)
5. ✅ Modern UI patterns (glassmorphism, dark mode)
6. ✅ Full-stack architecture (REST API, MongoDB)
7. ✅ NLP integration (sentiment analysis)

**Demo Flow:**
1. Show dark mode toggle
2. Search for "technology" → filter by positive sentiment
3. Open Dashboard → explain charts
4. Save a favorite → show persistence
5. Explain confidence scores and word highlighting

---

Made with ❤️ by [Your Name]
