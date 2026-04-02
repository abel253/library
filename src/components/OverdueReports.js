// components/OverdueReports.js
import React, { useState } from 'react';
import './OverdueReports.css';
const OverdueReports = () => {
  const [overdueItems, setOverdueItems] = useState([
    { id: 1, title: 'Software Engineering', borrower: 'John Student', dueDate: '2024-04-01', daysOverdue: 5, fine: 5.00, email: 'john@university.edu' },
    { id: 2, title: 'Clean Code', borrower: 'Alice Johnson', dueDate: '2024-04-05', daysOverdue: 1, fine: 1.00, email: 'alice@university.edu' },
  ]);
  const [showEmailSent, setShowEmailSent] = useState(false);

  const handleSendEmail = () => {
    setShowEmailSent(true);
    setTimeout(() => setShowEmailSent(false), 3000);
  };

  const totalFine = overdueItems.reduce((sum, item) => sum + item.fine, 0);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Overdue Items Report</h2>
      
      {showEmailSent && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          Email notifications sent to all users with overdue items.
        </div>
      )}
      
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">Total Overdue Items: {overdueItems.length}</p>
        <p className="font-semibold">Total Fines Accrued: ${totalFine.toFixed(2)}</p>
      </div>
      
      {overdueItems.length === 0 ? (
        <p className="text-gray-500">No overdue items at this time.</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border text-left">Item Title</th>
                <th className="p-2 border text-left">Borrower</th>
                <th className="p-2 border text-left">Due Date</th>
                <th className="p-2 border text-left">Days Overdue</th>
                <th className="p-2 border text-left">Fine</th>
                <th className="p-2 border text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {overdueItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.title}</td>
                  <td className="p-2 border">{item.borrower}</td>
                  <td className="p-2 border text-red-600">{item.dueDate}</td>
                  <td className="p-2 border">{item.daysOverdue} days</td>
                  <td className="p-2 border">${item.fine.toFixed(2)}</td>
                  <td className="p-2 border">{item.email}</td>
                </tr>
              ))}
            </tbody>
           </table>
          
          <div className="mt-6">
            <button
              onClick={handleSendEmail}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Send Email Notifications to Overdue Users
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OverdueReports;