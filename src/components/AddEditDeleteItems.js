// components/AddEditDeleteItems.js
import React, { useState } from 'react';
import './AddEditDeleteItems.css';
const AddEditDeleteItems = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Software Engineering', author: 'Roger S. Pressman', isbn: '978-0-07-285318-6', callNumber: 'QA76.758 .P74', location: 'Main Library' },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0-13-235088-4', callNumber: 'QA76.76 .M37', location: 'Science Library' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ title: '', author: '', isbn: '', callNumber: '', location: '' });
  const [message, setMessage] = useState('');

  const handleAdd = () => {
    if (!newItem.title || !newItem.author) {
      setMessage('Title and Author are required');
      return;
    }
    const newId = Math.max(...items.map(i => i.id), 0) + 1;
    setItems([...items, { ...newItem, id: newId }]);
    setNewItem({ title: '', author: '', isbn: '', callNumber: '', location: '' });
    setMessage('Item added successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleUpdate = () => {
    setItems(items.map(i => i.id === editingItem.id ? editingItem : i));
    setEditingItem(null);
    setMessage('Item updated successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(i => i.id !== id));
      setMessage('Item deleted successfully');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.callNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Library Items</h2>
      {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-3">Add New Item</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Title *"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Author *"
              value={newItem.author}
              onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="ISBN"
              value={newItem.isbn}
              onChange={(e) => setNewItem({ ...newItem, isbn: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Call Number"
              value={newItem.callNumber}
              onChange={(e) => setNewItem({ ...newItem, callNumber: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Location"
              value={newItem.location}
              onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Add Item
            </button>
          </div>
        </div>

        <div className="border rounded p-4">
          <h3 className="font-semibold mb-3">Search Items</h3>
          <input
            type="text"
            placeholder="Search by title, author, or call number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          
          <div className="max-h-96 overflow-y-auto">
            {filteredItems.map(item => (
              <div key={item.id} className="border-b py-2">
                {editingItem?.id === item.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full p-1 border rounded"
                    />
                    <input
                      type="text"
                      value={editingItem.author}
                      onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                      className="w-full p-1 border rounded"
                    />
                    <div className="flex gap-2">
                      <button onClick={handleUpdate} className="bg-blue-600 text-white px-2 py-1 rounded">Save</button>
                      <button onClick={() => setEditingItem(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.author} | {item.callNumber}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditDeleteItems;