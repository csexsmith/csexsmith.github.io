import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios for making HTTP requests
import queryDb from '../../hooks/queryDb';
import Article from '../../components/article/Article';

const News = () => {
  const [newsArticlesData, setNewsArticlesData] = useState([]);
  const query = 'SELECT DISTINCT outlet, headline, link, sentiment FROM news_articles';

  const { data, error, loading } = queryDb(query);

  useEffect(() => {
    if (data && newsArticlesData.length === 0) {
      // Function to fetch thumbnail image using Microlink API
      const fetchThumbnail = async (link) => {
        try {
          const response = await axios.get(`https://api.microlink.io?url=${link}`);
          console.log('Microlink Response:', response.data);  // Check full response
          const thumbnail = response.data.data.image?.url || 'https://via.placeholder.com/250';  // Fallback image if no image found
          console.log('Thumbnail:', thumbnail);  // Check the thumbnail URL being used
          return thumbnail;
        } catch (error) {
          console.error('Error fetching thumbnail:', error);
          return 'https://via.placeholder.com/250';  // Fallback image in case of error
        }
      };

      const transformedData = data.map(async (row) => {
        const thumbnail = await fetchThumbnail(row.link);  // Fetch the thumbnail for each article link
        return {
          title: row.headline,
          imageUrl: thumbnail,  // Use fetched thumbnail
          link: row.link,
          sentiment: row.sentiment || 'unknown',
        };
      });

      // Wait for all async thumbnail fetches to complete before updating the state
      Promise.all(transformedData).then((result) => {
        setNewsArticlesData(result);
      });
    }
  }, [data, newsArticlesData.length]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="news-page">
      {newsArticlesData.map((article, index) => (
        <Article
          key={index}
          title={article.title}
          imageUrl={article.imageUrl}
          link={article.link}
          sentiment={article.sentiment}
        />
      ))}
    </div>
  );
};

export default News;