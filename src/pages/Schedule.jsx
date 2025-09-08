import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, PlusIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

const Schedule = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Load jobs from localStorage or use mock data
    const savedJobs = JSON.parse(localStorage.getItem('scheduledJobs') || '[]');
    
    if (savedJobs.length === 0) {
      // Add some mock data if no jobs exist
      const mockJobs = [
        {
          _id: 'job_001',
          date: new Date().toISOString().split('T')[0],
          time: '09:00',
          measure: 'Passive Ventilation',
          contractorName: 'Cray Valley - Arron Grover',
          houseNo: '34',
          address: 'Ellersby Road',
          status: 'Scheduled'
        },
        {
          _id: 'job_002',
          date: new Date().toISOString().split('T')[0],
          time: '14:30',
          measure: 'Insulation Assessment',
          contractorName: 'Green Energy Solutions',
          houseNo: '12',
          address: 'Oak Street',
          status: 'Scheduled'
        }
      ];
      localStorage.setItem('scheduledJobs', JSON.stringify(mockJobs));
      setJobs(mockJobs);
    } else {
      setJobs(savedJobs);
    }
  }, []);

  const filteredJobs = jobs.filter(job => job.date === selectedDate);

  const handleViewDetails = (jobId) => {
    navigate(`/details/${jobId}`);
  };

  const handleAddJob = () => {
    navigate('/add-job');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-6 bg-yellow-400"></div>
              <h1 className="text-xl font-bold">PAS-AID Schedule</h1>
            </div>
            <button
              onClick={handleAddJob}
              className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Job</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Date Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No jobs scheduled for this date</p>
              <button
                onClick={handleAddJob}
                className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Schedule a Job
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-2 text-yellow-400">
                        <ClockIcon className="h-4 w-4" />
                        <span className="font-medium">{job.time}</span>
                      </div>
                      <span className="px-2 py-1 bg-green-600 text-green-100 text-xs rounded-full">
                        {job.status}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {job.measure}
                    </h3>
                    
                    <div className="text-sm text-gray-300 space-y-1">
                      <p><span className="text-gray-400">Contractor:</span> {job.contractorName}</p>
                      <p><span className="text-gray-400">Address:</span> {job.houseNo} {job.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewDetails(job._id)}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
                      title="View Details"
                    >
                      <EyeIcon className="h-5 w-5 text-gray-300 group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
