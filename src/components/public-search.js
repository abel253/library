import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PublicSearch.css';

const PublicSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost/library/search.php?search=${searchTerm}&type=${searchType}`);
      const data = await response.json();
      setResults(data);
      setSearched(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="public-search-page">
      <header className="library-heros">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Find Your Next Great Read</h1>
            <p>Access thousands of academic resources, books, and journals from anywhere.</p>
            
            <div className="hero-search-container">
              <form onSubmit={handleSearch} className="hero-search-form" >
                <select 
                  value={searchType} 
                  onChange={(e) => setSearchType(e.target.value)}
                  className="search-select"
                >
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="isbn">ISBN</option>
                </select> <br/><br/>
                <input 
                  type="text" 
                  placeholder="Search by book title, author, or ISBN..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                   required
                /><br/><br/>
                <button type="submit" className="search-submit-btn">Search Now</button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        {searched && (
          <div className="search-results-section">
            <h3 className="results-count">Search Results ({results.length} items)</h3>
            {results.length === 0 ? (
              <div className="no-results">No items found matching your search.</div>
            ) : (
              <div className="table-wrapper">
                <table className="mau-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>ISBN</th>
                      <th>Status</th>
                      <th>Location</th>
                      {/* አዲስ የተጨመሩ Header */}
                      <th>Shelf No.</th>
                      <th>Sub-Shelf</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((item, index) => (
                      <tr key={index}>
                        <td className="title-cell">{item.title}</td>
                        <td>{item.author || 'N/A'}</td>
                        <td className="isbn-text">{item.isbn || 'N/A'}</td>
                        <td>
                          <span className={`status-badge ${item.status === 'AVAILABLE' ? 'available' : 'borrowed'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="location-text">{item.location}</td>
                        {/* አዲስ የተጨመሩ ዳታዎች */}
                        <td className="shelf-text">{item.shelf_number || 'N/A'}</td>
                        <td className="shelf-text">{item.sub_shelf_number || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicSearch;