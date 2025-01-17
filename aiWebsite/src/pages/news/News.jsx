import React, { useEffect, useState } from 'react';
import queryDb from '../../hooks/queryDb';
import Article from '../../components/article/Article';

const News = () => {
  const [newsArticlesData, setNewsArticlesData] = useState([]);
  const query = 'SELECT outlet, headline, link FROM news_articles';

  const { data, error, loading } = queryDb(query);

  useEffect(() => {
    if (data) {
      // Transform the data into the format required for rendering
      const transformedData = data.map((row) => ({
        title: row.headline,
        imageUrl: 'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png', // Placeholder image (replace if image URLs are available in your table)
        link: row.link, // Link to the article
      }));
      setNewsArticlesData(transformedData);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="news-page">
      {newsArticlesData.map((article, index) => (
        <Article
          key={index}
          title={article.title}
          imageUrl={article.imageUrl}
          link={article.link} // Pass the link to the Article component if you want clickable articles
        />
      ))}
    </div>
  );
};

export default News;