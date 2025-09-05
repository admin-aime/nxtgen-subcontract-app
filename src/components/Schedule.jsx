import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Schedule.css'

const Schedule = () => {
  const navigate = useNavigate()
  
  const [jobData] = useState([
    {
      id: 1,
      houseNo: '345',
      address: '123 St...',
      bookingDate: '2025-...',
      service: 'Passiv...',
      milestone: '0',
      workPackages: '0'
    },
    {
      id: 2,
      houseNo: '345',
      address: '123 St...',
      bookingDate: '2025-...',
      service: 'Scaffol...',
      milestone: '0',
      workPackages: '0'
    },
    {
      id: 3,
      houseNo: '345',
      address: '123 St...',
      bookingDate: '2025-...',
      service: 'Solar PV',
      milestone: '0',
      workPackages: '0'
    },
    {
      id: 4,
      houseNo: '34',
      address: 'Ellers...',
      bookingDate: '2025-...',
      service: 'Passiv...',
      milestone: '8',
      workPackages: '1'
    },
    {
      id: 5,
      houseNo: '34',
      address: 'Ellers...',
      bookingDate: '2025-...',
      service: 'Door...',
      milestone: '8',
      workPackages: '0'
    },
    {
      id: 6,
      houseNo: '34',
      address: 'Ellers...',
      bookingDate: '2025-...',
      service: 'Loft In...',
      milestone: '8',
      workPackages: '0'
    },
    {
      id: 7,
      houseNo: '5555',
      address: '999 St...',
      bookingDate: '2025-...',
      service: 'Passiv...',
      milestone: '8',
      workPackages: '0'
    },
    {
      id: 8,
      houseNo: '32',
      address: 'Elsley...',
      bookingDate: '2025-...',
      service: 'Passiv...',
      milestone: '8',
      workPackages: '0'
    }
  ])

  const handleViewDetails = (jobId) => {
    console.log('View details for job:', jobId)
    // Add your view details logic here
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <div className="brand-section">
          <div className="brand-indicator"></div>
          <h1 className="brand-title">PAS-AID</h1>
        </div>
        <button onClick={handleBackToDashboard} className="back-button">
          Back to Dashboard
        </button>
      </div>

      <div className="job-details-section">
        <h2 className="section-title">Job Details</h2>
        
        <div className="table-container">
          <table className="job-table">
            <thead>
              <tr>
                <th>HOUSE NO.</th>
                <th>ADDRESS</th>
                <th>BOOKING DATE</th>
                <th>SERVICE</th>
                <th>MILESTONE</th>
                <th>WORK PACKAGES</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobData.map((job) => (
                <tr key={job.id} className="job-row">
                  <td className="house-no">{job.houseNo}</td>
                  <td className="address">{job.address}</td>
                  <td className="booking-date">{job.bookingDate}</td>
                  <td className="service">{job.service}</td>
                  <td className="milestone">{job.milestone}</td>
                  <td className="work-packages">
                    {job.workPackages === '1' ? (
                      <span className="highlight-number">{job.workPackages}</span>
                    ) : (
                      job.workPackages
                    )}
                  </td>
                  <td className="actions">
                    <button 
                      className="view-button"
                      onClick={() => handleViewDetails(job.id)}
                      aria-label="View job details"
                    >
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" 
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Schedule
