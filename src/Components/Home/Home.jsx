import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import img from '../../assets/Images/WhatsApp Image 2024-06-22 at 00.21.24_9542e8b9.jpg'
function Home() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const fetchFreelancers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5104/api/Freelancer/filter-freelancers`, {
        params: {
          search,
          pageIndex,
          pageSize
        }
      });
      setFreelancers(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (search) {
      fetchFreelancers();
    // }
    console.log(freelancers.length);
  }, [search, pageIndex, pageSize]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handlePageSizeChange = (e) => setPageSize(parseInt(e.target.value, 12));
  const handleSubmit = (e) => {
    e.preventDefault();
    setPageIndex(1); 
    fetchFreelancers();
  };

  const handlePreviousPage = () => {
    setPageIndex((prevPageIndex) => Math.max(prevPageIndex - 1, 1));
  };

  const handleNextPage = () => {
    setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };

  return (
    <div className="home-container">
      <img src={img}  className="home-image" />
      <form onSubmit={handleSubmit} className="home-form">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search freelancers"
          className="home-input"
        />
        <button type="submit" className="home-button">Search</button>
      </form>
      <div className="home-pagination-controls">
        {/* Additional pagination controls can be added here */}
      </div>
      {loading && <div className="home-loading">Loading...</div>}
      {error && <div className="home-error">Error: {error.message}</div>}
      <div className="home-freelancer-list">
        {freelancers.map((freelancer) => (
          <div key={freelancer.id} className="home-freelancer-card">
            <img src="https://picsum.photos/id/237/200/300" alt={`${freelancer.name}'s avatar`} className="home-freelancer-image" />
            <h3>{freelancer.name}</h3>
            <p><strong>Profession:</strong> {freelancer.profession}</p>
            <p><strong>Location:</strong> {freelancer.city}, {freelancer.street}</p>
          </div>
        ))}
      </div>
      <div className="home-pagination-arrows">
        <button onClick={handlePreviousPage} disabled={pageIndex === 1} className="home-pagination-button">
          &larr; 
        </button>
        <span className="home-pagination-info">Page {pageIndex}</span>
        {freelancers.length<6?
        <button onClick={handleNextPage} className="home-pagination-button" disabled>
           &rarr;
        </button>
        :<button onClick={handleNextPage} className="home-pagination-button">
        &rarr;
        </button>}
      </div>
    </div>
  );
}

export default Home;
