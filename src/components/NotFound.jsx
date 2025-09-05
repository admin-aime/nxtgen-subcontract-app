import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        
        <div className="notfound-actions">
          <Link to="/schedule" className="home-btn">
            Go to Schedule
          </Link>
          <Link to="/dashboard" className="dashboard-btn">
            Go to Dashboard
          </Link>
        </div>

        <div className="helpful-links">
          <h3>Helpful Links</h3>
          <ul>
            <li><Link to="/schedule">Job Schedule</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/reports">Reports</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
