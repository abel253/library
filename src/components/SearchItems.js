// components/SearchItems.js
import React, { useState } from 'react';
import './SearchItems.css';

const SearchItems = ({ userType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const mockItems = [
    { id: 1, title: 'Software Engineering', author: 'Roger S. Pressman', isbn: '978-0-07-285318-6', status: 'Available', location: 'Main Library - Floor 2', callNumber: 'QA76.758 .P74' },
    { id: 2, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0-262-03384-8', status: 'Checked Out', location: 'Main Library - Floor 1', callNumber: 'QA76.6 .I58' },
    { id: 3, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '978-0-201-61622-4', status: 'Available', location: 'Science Library', callNumber: 'QA76.6 .H86' },
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
    <div>
      <h2 className="text-xl font-bold mb-4">Search Library Items</h2>
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="isbn">ISBN</option>
          <option value="callNumber">Call Number</option>
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

      {searched && (
        <div>
          <h3 className="font-semibold mb-2">Results ({results.length})</h3>
          {results.length === 0 ? (
            <p className="text-gray-500">No items found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 border text-left">Title</th>
                  <th className="p-2 border text-left">Author</th>
                  <th className="p-2 border text-left">Call Number</th>
                  <th className="p-2 border text-left">Status</th>
                  <th className="p-2 border text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                {results.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{item.title}</td>
                    <td className="p-2 border">{item.author}</td>
                    <td className="p-2 border">{item.callNumber}</td>
                    <td className="p-2 border">
                      <span className={`px-2 py-1 rounded text-sm ${
                        item.status === 'Available' ? 'bg-green-100 text-green-800' :
                        item.status === 'Checked Out' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2 border">{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchItems;