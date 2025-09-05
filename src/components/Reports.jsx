import React, { useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('last30days');

  const reportData = {
    overview: {
      totalJobs: 156,
      completedJobs: 142,
      pendingJobs: 14,
      averageCompletionTime: '2.3 hours',
      successRate: '91.0%'
    },
    performance: [
      { technician: 'John Doe', completed: 45, pending: 3, rating: 4.8 },
      { technician: 'Jane Smith', completed: 38, pending: 2, rating: 4.9 },
      { technician: 'Mike Johnson', completed: 32, pending: 5, rating: 4.6 },
      { technician: 'Sarah Wilson', completed: 27, pending: 4, rating: 4.7 }
    ],
    jobTypes: [
      { type: 'Maintenance', count: 65, percentage: 41.7 },
      { type: 'Inspection', count: 42, percentage: 26.9 },
      { type: 'Repair', count: 28, percentage: 17.9 },
      { type: 'Installation', count: 21, percentage: 13.5 }
    ]
  };

  const handleExport = () => {
    alert('Report exported successfully!');
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Reports & Analytics</h1>
        <div className="reports-controls">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="date-range-select"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="lastyear">Last Year</option>
          </select>
          <button className="export-btn" onClick={handleExport}>
            Export Report
          </button>
        </div>
      </div>

      <div className="reports-nav">
        <button
          className={`nav-btn ${selectedReport === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedReport('overview')}
        >
          Overview
        </button>
        <button
          className={`nav-btn ${selectedReport === 'performance' ? 'active' : ''}`}
          onClick={() => setSelectedReport('performance')}
        >
          Performance
        </button>
        <button
          className={`nav-btn ${selectedReport === 'jobtypes' ? 'active' : ''}`}
          onClick={() => setSelectedReport('jobtypes')}
        >
          Job Types
        </button>
      </div>

      <div className="reports-content">
        {selectedReport === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Jobs</h3>
                <div className="stat-value">{reportData.overview.totalJobs}</div>
              </div>
              <div className="stat-card">
                <h3>Completed Jobs</h3>
                <div className="stat-value">{reportData.overview.completedJobs}</div>
              </div>
              <div className="stat-card">
                <h3>Pending Jobs</h3>
                <div className="stat-value">{reportData.overview.pendingJobs}</div>
              </div>
              <div className="stat-card">
                <h3>Avg. Completion Time</h3>
                <div className="stat-value">{reportData.overview.averageCompletionTime}</div>
              </div>
              <div className="stat-card">
                <h3>Success Rate</h3>
                <div className="stat-value">{reportData.overview.successRate}</div>
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'performance' && (
          <div className="performance-section">
            <h2>Technician Performance</h2>
            <div className="performance-table">
              <table>
                <thead>
                  <tr>
                    <th>Technician</th>
                    <th>Completed Jobs</th>
                    <th>Pending Jobs</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.performance.map((tech, index) => (
                    <tr key={index}>
                      <td>{tech.technician}</td>
                      <td>{tech.completed}</td>
                      <td>{tech.pending}</td>
                      <td>
                        <span className="rating">
                          ⭐ {tech.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedReport === 'jobtypes' && (
          <div className="jobtypes-section">
            <h2>Job Types Distribution</h2>
            <div className="jobtypes-chart">
              {reportData.jobTypes.map((job, index) => (
                <div key={index} className="job-type-item">
                  <div className="job-type-info">
                    <span className="job-type-name">{job.type}</span>
                    <span className="job-type-count">{job.count} jobs</span>
                  </div>
                  <div className="job-type-bar">
                    <div
                      className="job-type-fill"
                      style={{ width: `${job.percentage}%` }}
                    ></div>
                  </div>
                  <span className="job-type-percentage">{job.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
