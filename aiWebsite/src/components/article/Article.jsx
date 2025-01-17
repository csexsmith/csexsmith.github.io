import React from 'react';
import './Article.css';

const Article = ({ title, imageUrl, link }) => {
  return (
    <div className="news-article">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} className="news-article-image" />
        <h2 className="news-article-title">{title}</h2>
      </a>
    </div>
  );
};

export default Article;