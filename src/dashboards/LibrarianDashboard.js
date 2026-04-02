// dashboards/LibrarianDashboard.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchItems from '../components/SearchItems';
import IssueItem from '../components/IssueItem';
import RetrieveItem from '../components/RetrieveItem';
import AddEditDeleteItems from '../components/AddEditDeleteItems';
import ChangeDefaultDueDate from '../components/ChangeDefaultDueDate';
import OverdueReports from '../components/OverdueReports';

import './dashboard.css';
const LibrarianDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('search');

  const tabs = [
    { id: 'search', name: 'Search Items', component: SearchItems },
    { id: 'issue', name: 'Issue Item', component: IssueItem },
    { id: 'retrieve', name: 'Retrieve/Return Item', component: RetrieveItem },
    { id: 'manageItems', name: 'Add/Edit/Delete Items', component: AddEditDeleteItems },
    { id: 'dueDate', name: 'Change Default Due Date', component: ChangeDefaultDueDate },
    { id: 'overdue', name: 'Overdue Reports', component: OverdueReports },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b overflow-x-auto">
            <nav className="flex whitespace-nowrap">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 font-medium ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {ActiveComponent && <ActiveComponent user={user} userType="Librarian" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;