import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = { Positive: '#10b981', Negative: '#ef4444', Neutral: '#6b7280' };

function Dashboard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
      .then(res => { setNews(res.data); setLoading(false); });
  }, []);

  if (loading) return <div className="loader"><div className="spinner"></div></div>;

  const sentimentCounts = news.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(sentimentCounts).map(([name, value]) => ({ name, value }));

  const categoryCounts = news.reduce((acc, item) => {
    const cat = item.category || 'general';
    if (!acc[cat]) acc[cat] = { category: cat, Positive: 0, Negative: 0, Neutral: 0 };
    acc[cat][item.sentiment]++;
    return acc;
  }, {});
  const barData = Object.values(categoryCounts).slice(0, 8);

  const avgConfidence = news.length ? Math.round(news.reduce((s, a) => s + (a.confidence || 0), 0) / news.length) : 0;

  return (
    <div className="container">
      <h2 className="page-title">📊 Sentiment Analytics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{news.length}</span>
          <span className="stat-label">Total Articles</span>
        </div>
        <div className="stat-card positive-stat">
          <span className="stat-number">{sentimentCounts.Positive || 0}</span>
          <span className="stat-label">😊 Positive</span>
        </div>
        <div className="stat-card negative-stat">
          <span className="stat-number">{sentimentCounts.Negative || 0}</span>
          <span className="stat-label">😞 Negative</span>
        </div>
        <div className="stat-card neutral-stat">
          <span className="stat-number">{sentimentCounts.Neutral || 0}</span>
          <span className="stat-label">😐 Neutral</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{avgConfidence}%</span>
          <span className="stat-label">Avg Confidence</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Sentiment by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Positive" fill="#10b981" />
              <Bar dataKey="Negative" fill="#ef4444" />
              <Bar dataKey="Neutral" fill="#6b7280" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
