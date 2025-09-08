import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon } from '@heroicons/react/24/outline';

const Schedule = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Load jobs from localStorage or use mock data exactly matching the image
    const savedJobs = JSON.parse(localStorage.getItem('scheduledJobs') || '[]');
    
    if (savedJobs.length === 0) {
      // Mock data exactly matching the uploaded image
      const mockJobs = [
        {
          _id: 'job_001',
          houseNo: '345',
          address: '123 St...',
          bookingDate: '2025-...',
          service: 'Passiv...',
          milestone: '0',
          workPackages: '0'
        },
        {
          _id: 'job_002',
          houseNo: '345',
          address: '123 St...',
          bookingDate: '2025-...',
          service: 'Scaffol...',
          milestone: '0',
          workPackages: '0'
        },
        {
          _id: 'job_003',
          houseNo: '345',
          address: '123 St...',
          bookingDate: '2025-...',
          service: 'Solar PV',
          milestone: '0',
          workPackages: '0'
        },
        {
          _id: 'job_004',
          houseNo: '34',
          address: 'Ellers...',
          bookingDate: '2025-...',
          service: 'Passiv...',
          milestone: '8',
          workPackages: '1'
        },
        {
          _id: 'job_005',
          houseNo: '34',
          address: 'Ellers...',
          bookingDate: '2025-...',
          service: 'Door ...',
          milestone: '8',
          workPackages: '0'
        },
        {
          _id: 'job_006',
          houseNo: '34',
          address: 'Ellers...',
          bookingDate: '2025-...',
          service: 'Loft In...',
          milestone: '8',
          workPackages: '0'
        },
        {
          _id: 'job_007',
          houseNo: '5555',
          address: '999 St...',
          bookingDate: '2025-...',
          service: 'Passiv...',
          milestone: '8',
          workPackages: '0'
        },
        {
          _id: 'job_008',
          houseNo: '32',
          address: 'Elsley ...',
          bookingDate: '2025-...',
          service: 'Passiv...',
          milestone: '8',
          workPackages: '0'
        },
        {
          _id: 'job_009',
          houseNo: '32',
          address: 'Elsley ...',
          bookingDate: '2025-...',
          service: 'Solar PV',
          milestone: '8',
          workPackages: '0'
        },
        {
          _id: 'job_010',
          houseNo: '32',
          address: 'Elsley ...',
          bookingDate: '2025-...',
          service: 'Door ...',
          milestone: '8',
          workPackages: '0'
        }
      ];
      localStorage.setItem('scheduledJobs', JSON.stringify(mockJobs));
      setJobs(mockJobs);
    } else {
      setJobs(savedJobs);
    }
  }, []);

  const handleViewDetails = (jobId) => {
    navigate(`/details/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header - exactly matching the image */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-7 bg-yellow-400 rounded-sm"></div>
          <h1 className="text-2xl font-bold text-white tracking-wide">PAS-AID</h1>
        </div>
      </div>

      {/* Horizontal line */}
      <div className="mx-8 border-t border-gray-600"></div>

      {/* Job Details Section */}
      <div className="px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold text-white mb-8 tracking-wide">Job Details</h2>

        {/* Table Container */}
        <div className="w-full">
          <table className="w-full table-fixed">
            {/* Table Header */}
            <thead>
              <tr>
                <th className="w-20 text-left pb-4 text-xs font-bold text-white uppercase tracking-widest">
                  HOUSE<br />NO.
                </th>
                <th className="w-28 text-left pb-4 text-xs font-bold text-white uppercase tracking-widest">
                  ADDRESS
                </th>
                <th className="w-32 text-left pb-4 text-xs font-bold text-white uppercase tracking-widest">
                  BOOKING<br />DATE
                </th>
                <th className="w-28 text-left pb-4 text-xs font-bold text-white uppercase tracking-widest">
                  SERVICE
                </th>
                <th className="w-24 text-left pb-4 text-xs font-bold text-white uppercase tracking-widest">
                  MILESTONE
                </th>
                <th className="w-28 text-left pb-4 text-xs font-bold text-white uppercase tracking-widest">
                  WORK<br />PACKAGES
                </th>
                <th className="w-12"></th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job._id} className="group">
                  <td className="py-3 text-white text-sm font-medium border-b border-gray-700">
                    {job.houseNo}
                  </td>
                  <td className="py-3 text-white text-sm border-b border-gray-700">
                    {job.address}
                  </td>
                  <td className="py-3 text-white text-sm border-b border-gray-700">
                    {job.bookingDate}
                  </td>
                  <td className="py-3 text-white text-sm border-b border-gray-700">
                    {job.service}
                  </td>
                  <td className="py-3 text-white text-sm border-b border-gray-700">
                    {job.milestone}
                  </td>
                  <td className="py-3 text-white text-sm border-b border-gray-700">
                    {job.workPackages}
                  </td>
                  <td className="py-3 border-b border-gray-700">
                    <button
                      onClick={() => handleViewDetails(job._id)}
                      className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                      title="View Details"
                    >
                      <EyeIcon className="h-4 w-4 text-gray-400 hover:text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No jobs available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
