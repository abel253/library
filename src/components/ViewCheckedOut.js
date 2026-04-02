// components/ViewCheckedOut.js
import React, { useState } from 'react';
import './ViewCheckedOut.css';
import './Responsive.css';
const ViewCheckedOut = ({ user }) => {
  const [checkedOutItems] = useState([
    { id: 1, title: 'Software Engineering', author: 'Roger S. Pressman', issueDate: '2024-04-01', dueDate: '2024-04-15', fine: 0 },
    { id: 2, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', issueDate: '2024-04-05', dueDate: '2024-04-20', fine: 0 },
  ]);

  const totalFine = checkedOutItems.reduce((sum, item) => sum + item.fine, 0);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Checked Out Items</h2>
      
      {checkedOutItems.length === 0 ? (
        <p className="text-gray-500">You have no items checked out.</p>
      ) : (
        <>
          <table className="w-full border-collapse mb-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border text-left">Item Title</th>
                <th className="p-2 border text-left">Author</th>
                <th className="p-2 border text-left">Issue Date</th>
                <th className="p-2 border text-left">Due Date</th>
                <th className="p-2 border text-left">Fine</th>
              </tr>
            </thead>
            <tbody>
              {checkedOutItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.title}</td>
                  <td className="p-2 border">{item.author}</td>
                  <td className="p-2 border">{item.issueDate}</td>
                  <td className={`p-2 border ${new Date(item.dueDate) < new Date() ? 'text-red-600 font-semibold' : ''}`}>
                    {item.dueDate}
                    {new Date(item.dueDate) < new Date() && <span className="ml-2 text-xs">(Overdue)</span>}
                  </td>
                  <td className="p-2 border">${item.fine}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {totalFine > 0 && (
            <div className="bg-red-100 p-4 rounded">
              <p className="font-semibold text-red-800">Total Fine: ${totalFine}</p>
              <p className="text-sm text-red-600">Please pay your fines to continue borrowing.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewCheckedOut;