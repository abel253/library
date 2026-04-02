// components/BookItems.js
import React, { useState } from 'react';
import './BookItems.css';
const BookItems = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableItems, setAvailableItems] = useState([
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', status: 'Available' },
    { id: 2, title: 'Design Patterns', author: 'Erich Gamma', status: 'Available' },
    { id: 3, title: 'Refactoring', author: 'Martin Fowler', status: 'Checked Out' },
  ]);
  const [reservedItems, setReservedItems] = useState([]);
  const [message, setMessage] = useState('');

  const handleBook = (item) => {
    if (item.status !== 'Available') {
      setMessage('This item is not available for booking.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    setReservedItems([...reservedItems, { ...item, reservationDate: new Date().toLocaleDateString() }]);
    setAvailableItems(prev => prev.map(i => 
      i.id === item.id ? { ...i, status: 'Reserved' } : i
    ));
    setMessage(`Successfully booked "${item.title}". You have 3 days to pick it up.`);
    setTimeout(() => setMessage(''), 4000);
  };

  const filteredItems = availableItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Book/Reserve Items</h2>
      {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Search Available Items</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or author..."
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-2">Available Items</h3>
        {filteredItems.length === 0 ? (
          <p className="text-gray-500">No items found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border text-left">Title</th>
                <th className="p-2 border text-left">Author</th>
                <th className="p-2 border text-left">Status</th>
                <th className="p-2 border text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.title}</td>
                  <td className="p-2 border">{item.author}</td>
                  <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-sm ${
                      item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-2 border">
                    {item.status === 'Available' && (
                      <button
                        onClick={() => handleBook(item)}
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                      >
                        Book
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {reservedItems.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Your Reserved Items</h3>
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border text-left">Title</th>
                <th className="p-2 border text-left">Author</th>
                <th className="p-2 border text-left">Reservation Date</th>
                <th className="p-2 border text-left">Pickup Deadline</th>
              </tr>
            </thead>
            <tbody>
              {reservedItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.title}</td>
                  <td className="p-2 border">{item.author}</td>
                  <td className="p-2 border">{item.reservationDate}</td>
                  <td className="p-2 border text-yellow-600">Within 3 days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <p className="mt-4 text-sm text-gray-500">Note: Reserved items must be picked up within 3 days, otherwise the reservation will be cancelled.</p>
    </div>
  );
};

export default BookItems;