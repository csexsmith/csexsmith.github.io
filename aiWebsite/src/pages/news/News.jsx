import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios for making HTTP requests
import queryDb from '../../hooks/queryDb';
import Article from '../../components/article/Article';
import SearchBar from '../../components/searchbar/SearchBar'; // Import the reusable SearchBar component
import './News.css'; // Ensure you have this file for styling

const News = () => {
  const [newsArticlesData, setNewsArticlesData] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]); // For filtered results
  const [searchKeyword, setSearchKeyword] = useState(''); // For search input
  const [sortBySentiment, setSortBySentiment] = useState('All'); // For sorting by sentiment
  const query = 'SELECT DISTINCT outlet, headline, link, sentiment FROM news_articles';

  const { data, error, loading } = queryDb(query);

  // Fetch thumbnails and transform data
  useEffect(() => {
    if (data && newsArticlesData.length === 0) {
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
        setFilteredArticles(result); // Initialize filtered articles with all articles
      });
    }
  }, [data, newsArticlesData.length]);

  // Handle search input change
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);
    applyFilters(keyword, sortBySentiment); // Apply both filters
  };

  // Handle sorting by sentiment
  const handleSortBySentiment = (e) => {
    const sentiment = e.target.value;
    setSortBySentiment(sentiment);
    applyFilters(searchKeyword, sentiment); // Apply both filters
  };

  // Function to apply both filters
  const applyFilters = (keyword, sentiment) => {
    let filtered = [...newsArticlesData];

    // Filter by search keyword
    if (keyword) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(keyword)
      );
    }

    // Filter by sentiment
    if (sentiment !== 'All') {
      filtered = filtered.filter(
        (article) => article.sentiment.toLowerCase() === sentiment.toLowerCase()
      );
    }

    setFilteredArticles(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* Container for Search Bar and Sentiment Dropdown */}
      <div className="filters-container">
        <div className="search-bar-wrapper">
          <SearchBar
            placeholder="Search headlines..."
            value={searchKeyword}
            onChange={handleSearch}
          />
        </div>
        <div className="sort-dropdown-container">
          <label htmlFor="sort-by-sentiment" className="label-white"></label>
          <select
            id="sort-by-sentiment"
            value={sortBySentiment}
            onChange={handleSortBySentiment}
            className="sort-dropdown"
          >
            <option value="All">All</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
            <option value="Unknown">Neutral</option>
          </select>
        </div>
      </div>

      {/* News Articles Grid */}
      <div className="news-page">
        {filteredArticles.map((article, index) => (
          <Article
            key={index}
            title={article.title}
            imageUrl={article.imageUrl}
            link={article.link}
            sentiment={article.sentiment}
          />
        ))}
      </div>
    </div>
  );
};

export default News;