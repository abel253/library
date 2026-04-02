// components/PublicSearch.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PublicSearch.css';

const PublicSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const mockItems = [
    { id: 1, title: 'Software Engineering', author: 'Roger S. Pressman', isbn: '978-0-07-285318-6', status: 'Available', location: 'Main Library - Floor 2' },
    { id: 2, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0-262-03384-8', status: 'Checked Out', location: 'Main Library - Floor 1' },
    { id: 3, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '978-0-201-61622-4', status: 'Available', location: 'Science Library' },
    { id: 4, title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0-13-235088-4', status: 'Available', location: 'Main Library - Floor 3' },
    { id: 5, title: 'Design Patterns', author: 'Erich Gamma', isbn: '978-0-201-63361-0', status: 'Reserved', location: 'Reference Section' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = mockItems.filter(item => 
      item[searchType].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Library Circulation System</h1>
          <div>
            <Link to="/login" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 mr-2">Login</Link>
            <Link to="/signup" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Sign Up</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Search Library Catalog</h2>
          <form onSubmit={handleSearch} className="flex gap-4">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="isbn">ISBN</option>
            </select>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term..."
              className="flex-1 p-2 border rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Search
            </button>
          </form>
        </div>

        {searched && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h3 className="text-xl font-bold p-4 border-b">Search Results ({results.length} items)</h3>
            {results.length === 0 ? (
              <p className="p-4 text-gray-500">No items found matching your search.</p>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Author</th>
                    <th className="p-3 text-left">ISBN</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(item => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{item.title}</td>
                      <td className="p-3">{item.author}</td>
                      <td className="p-3">{item.isbn}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          item.status === 'Available' ? 'bg-green-100 text-green-800' :
                          item.status === 'Checked Out' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3">{item.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        <p className="mt-4 text-center text-gray-500 text-sm">
          Login to renew items, reserve items, and view your checked out items.
        </p>
      </main>
    </div>
  );
};

export default PublicSearch;