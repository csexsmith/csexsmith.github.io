import React, { useEffect } from 'react';
import  queryDb  from '../../hooks/queryDb';


const News = () => {

  const query = 'SELECT * FROM test_table'; // Example SQL query
  const { data, error, loading } = queryDb(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  console.log('Query results:', data); // Log the query results to the console
  
  return (
    <div>
      <p>sup guys</p>
    </div>
  );
};

export default News;