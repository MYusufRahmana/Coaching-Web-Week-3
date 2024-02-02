import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
      setIsLoading(false);
      setError('');
    } catch (error) {
      setError('Failed to fetch quote. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          {isLoading ? (
            <p className="card-text">Loading...</p>
          ) : error ? (
            <p className="card-text text-danger">{error}</p>
          ) : (
            <>
              <blockquote className="blockquote mb-0">
                <p className="mb-0">{quote}</p>
                <footer className="blockquote-footer mt-2">{author}</footer>
              </blockquote>
              <button className="btn btn-primary mt-3" onClick={fetchQuote}>
                Search Quote Random
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
