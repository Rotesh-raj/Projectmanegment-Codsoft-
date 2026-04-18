import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">Project Management</h2>
      </div>
      <nav className="space-y-2">
        <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-gray-100">
          <span className="w-5 h-5 mr-3">📊</span>
          Dashboard
        </Link>
        <Link to="/projects" className="flex items-center p-3 rounded-lg hover:bg-gray-100">
          <span className="w-5 h-5 mr-3">📁</span>
          Projects
        </Link>
        <Link to="/tasks" className="flex items-center p-3 rounded-lg hover:bg-gray-100">
          <span className="w-5 h-5 mr-3">📋</span>
          Tasks
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
