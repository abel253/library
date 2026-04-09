import React, { useState } from 'react';
import './SearchItems.css';

const SearchItems = ({ userType }) => {
  const mockItems = [
    { id: 1, title: 'Software Engineering', author: 'Roger S. Pressman', isbn: '978-0-07-285318-6', status: 'Available', location: 'Main Library - Floor 2', callNumber: 'QA76.758 .P74' },
    { id: 2, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0-262-03384-8', status: 'Checked Out', location: 'Main Library - Floor 1', callNumber: 'QA76.6 .I58' },
    { id: 3, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '978-0-201-61622-4', status: 'Available', location: 'Science Library', callNumber: 'QA76.6 .H86' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');
  // መጀመሪያ ገጹ ሲከፈት ሁሉንም መጽሐፍት እንዲያሳይ
  const [results, setResults] = useState(mockItems);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // trim() አላስፈላጊ የሆኑ የፊትና የኋላ ክፍተቶችን (spaces) ያጠፋል
    const cleanSearchTerm = searchTerm.trim().toLowerCase();

    const filtered = mockItems.filter(item => {
      const itemValue = String(item[searchType]).toLowerCase();
      return itemValue.includes(cleanSearchTerm);
    });

    setResults(filtered);
  };

  // ተጠቃሚው የጻፈውን ሲያጠፋ ሁሉንም ዳታ መልሶ እንዲያሳይ
  const onInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      setResults(mockItems);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Search Library Items</h2>
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2 border rounded bg-white"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="isbn">ISBN</option>
          <option value="callNumber">Call Number</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={onInputChange}
          placeholder={`Search by ${searchType}...`}
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>

      <div>
        <h3 className="font-semibold mb-2">Items Found: {results.length}</h3>
        {results.length === 0 ? (
          <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded">
            ⚠️ No items found matching "<strong>{searchTerm}</strong>". Check your spelling or search type.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border text-left">Title</th>
                  <th className="p-3 border text-left">Author</th>
                  <th className="p-3 border text-left">Status</th>
                  <th className="p-3 border text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                {results.map(item => (
                  <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                    <td className="p-3 border font-semibold">{item.title}</td>
                    <td className="p-3 border">{item.author}</td>
                    <td className="p-3 border">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 border text-gray-600">{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchItems;