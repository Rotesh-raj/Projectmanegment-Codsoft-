import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, tasks: 0, completed: 0 });

  useEffect(() => {
    // Fetch stats from API
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Projects</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.projects}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Tasks</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.tasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Completion Rate</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div className="bg-indigo-600 h-4 rounded-full" style={{width: `${(stats.completed/stats.tasks)*100}%`}}></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{Math.round((stats.completed/stats.tasks)*100)}%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
