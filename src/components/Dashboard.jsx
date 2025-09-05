import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>PAS-AID Dashboard</h1>
        <div className="user-info">
          <span>Welcome, John Doe</span>
          <Link to="/profile" className="profile-link">Profile</Link>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <Link to="/schedule" className="dashboard-card">
            <div className="card-icon">📅</div>
            <h3>Job Schedule</h3>
            <p>View and manage your job assignments</p>
          </Link>

          <Link to="/reports" className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Reports</h3>
            <p>View performance reports and analytics</p>
          </Link>

          <Link to="/profile" className="dashboard-card">
            <div className="card-icon">👤</div>
            <h3>Profile</h3>
            <p>Manage your profile and personal information</p>
          </Link>

          <Link to="/settings" className="dashboard-card">
            <div className="card-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Configure application preferences</p>
          </Link>
        </div>

        <div className="quick-stats">
          <h2>Quick Stats</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Active Jobs</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">45</div>
              <div className="stat-label">Completed This Month</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
