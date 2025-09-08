import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Schedule.css';

const Schedule = () => {
  const navigate = useNavigate();

  const jobData = [
    {
      id: 'J001',
      customer: 'ABC Manufacturing',
      location: '123 Industrial Ave',
      date: '2024-01-15',
      time: '09:00 AM',
      status: 'Pending',
      priority: 'High',
      technician: 'John Smith',
      description: 'Routine maintenance check on industrial equipment',
      notes: 'Customer requested early morning appointment'
    },
    {
      id: 'J002',
      customer: 'XYZ Corp',
      location: '456 Business Blvd',
      date: '2024-01-15',
      time: '02:00 PM',
      status: 'In Progress',
      priority: 'Medium',
      technician: 'Sarah Johnson',
      description: 'Equipment repair and calibration',
      notes: 'Parts may need to be ordered'
    },
    {
      id: 'J003',
      customer: 'Tech Solutions Inc',
      location: '789 Tech Park',
      date: '2024-01-16',
      time: '10:30 AM',
      status: 'Completed',
      priority: 'Low',
      technician: 'Mike Davis',
      description: 'Software update and system optimization',
      notes: 'All systems running smoothly'
    },
    {
      id: 'J004',
      customer: 'Global Industries',
      location: '321 Commerce St',
      date: '2024-01-16',
      time: '03:45 PM',
      status: 'Pending',
      priority: 'High',
      technician: 'Lisa Wilson',
      description: 'Emergency repair request',
      notes: 'Urgent - production line down'
    },
    {
      id: 'J005',
      customer: 'Metro Services',
      location: '654 Service Rd',
      date: '2024-01-17',
      time: '11:15 AM',
      status: 'In Progress',
      priority: 'Medium',
      technician: 'Tom Brown',
      description: 'Preventive maintenance schedule',
      notes: 'Regular quarterly service'
    }
  ];

  const handleViewDetails = (job) => {
    navigate('/details', { state: { jobData: job } });
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>Job Schedule</h1>
        <div className="header-actions">
          <button className="btn-primary">Add New Job</button>
          <button className="btn-secondary">Export</button>
        </div>
      </div>

      <div className="schedule-content">
        <div className="table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Technician</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobData.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.customer}</td>
                  <td>{job.location}</td>
                  <td>{job.date}</td>
                  <td>{job.time}</td>
                  <td>
                    <span className={`status ${job.status.toLowerCase().replace(' ', '-')}`}>
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <span className={`priority ${job.priority.toLowerCase()}`}>
                      {job.priority}
                    </span>
                  </td>
                  <td>{job.technician}</td>
                  <td>
                    <button 
                      className="action-btn view-btn"
                      onClick={() => handleViewDetails(job)}
                      title="View Details"
                    >
                      👁️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
