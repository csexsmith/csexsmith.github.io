import React, { useEffect, useState } from 'react';
import './Article.css';

const Article = ({ title, imageUrl, link, sentiment }) => {

  const [thumbnail, setThumbnail] = useState(null);

  // Determine the sentiment color
  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return '#4caf50'; // Green
      case 'negative':
        return '#f44336'; // Red
      case 'neutral':
        return '#9e9e9e'; // Gray
      default:
        return '#bdbdbd'; // Default/Unknown
    }
  };

  return (
    <div className="news-article">
      <img src={imageUrl} className="news-article-image" />
      <h2 className="news-article-title">{title}</h2>
      <div className="sentiment-indicator" style={{ backgroundColor: getSentimentColor(sentiment) }}>
        {sentiment}
      </div>
      <a href={link} className="news-article-link" target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
};

export default Article;