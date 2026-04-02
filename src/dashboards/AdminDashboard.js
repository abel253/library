// dashboards/AdminDashboard.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchItems from '../components/SearchItems';
import ChangeUserType from '../components/ChangeUserType';
import ConfigureDueDate from '../components/ConfigureDueDate';
import ConfigureFine from '../components/ConfigureFine';
import OverdueReports from '../components/OverdueReports';
 import './dashboard.css';
const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('search');

  const tabs = [
    { id: 'search', name: 'Search Items', component: SearchItems },
    { id: 'userType', name: 'Change User Types', component: ChangeUserType },
    { id: 'dueDate', name: 'Configure Due Date', component: ConfigureDueDate },
    { id: 'fine', name: 'Configure Fine', component: ConfigureFine },
    { id: 'overdue', name: 'Overdue Reports', component: OverdueReports },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b">
            <nav className="flex">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium ${
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
            {ActiveComponent && <ActiveComponent user={user} userType="Administrator" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;