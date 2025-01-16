import React from 'react';
import './NewsArticle.css';

const NewsArticle = ({ title, imageUrl }) => {
  return (
    <div className="news-article">
      <img src={imageUrl} alt={title} className="news-article-image" />
      <h2 className="news-article-title">{title}</h2>
    </div>
  );
};

export default NewsArticle;