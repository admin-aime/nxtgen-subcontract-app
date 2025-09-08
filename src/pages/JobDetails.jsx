import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronUpIcon, ChevronDownIcon, ArrowLeftIcon, CameraIcon, DocumentIcon } from '@heroicons/react/24/outline';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isServiceDetailsExpanded, setIsServiceDetailsExpanded] = useState(true);
  const [isMilestoneExpanded, setIsMilestoneExpanded] = useState(true);
  const [formData, setFormData] = useState({
    contractorName: '',
    houseNo: '',
    address: ''
  });
  const [taskData, setTaskData] = useState({
    taskName: 'Dry Ridge Works Step 1 Tasks',
    taskInstructions: '1. Take picture of existing tiles before you start work\n\n2. Take off the existing ridge',
    expectedHours: '0',
    photoEvidence: [],
    uploadedEvidence: []
  });

  useEffect(() => {
    // Fetch job details based on ID
    const fetchJobDetails = () => {
      // Get jobs from localStorage or use mock data
      const savedJobs = JSON.parse(localStorage.getItem('scheduledJobs') || '[]');
      const foundJob = savedJobs.find(job => job._id === id);
      
      if (foundJob) {
        setJob(foundJob);
        setFormData({
          contractorName: foundJob.contractorName || 'Cray Valley - Arron Grover',
          houseNo: foundJob.houseNo || '34',
          address: foundJob.address || 'Ellersby Road'
        });
        
        // Load task data if exists
        if (foundJob.taskData) {
          setTaskData(foundJob.taskData);
        }
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTaskDataChange = (field, value) => {
    setTaskData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setTaskData(prev => ({
      ...prev,
      uploadedEvidence: [...prev.uploadedEvidence, ...files]
    }));
  };

  const handleSave = () => {
    // Save updated job details including task data
    const savedJobs = JSON.parse(localStorage.getItem('scheduledJobs') || '[]');
    const updatedJobs = savedJobs.map(job => 
      job._id === id 
        ? { ...job, ...formData, taskData }
        : job
    );
    localStorage.setItem('scheduledJobs', JSON.stringify(updatedJobs));
    
    // Show success message or navigate back
    alert('Job details updated successfully!');
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/schedule')}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-6 bg-yellow-400"></div>
                <h1 className="text-xl font-bold">PAS-AID</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Measure Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Measure: {job.measure || 'Passive Ventilation'}
          </h2>
        </div>

        {/* Service Details Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
          <button
            onClick={() => setIsServiceDetailsExpanded(!isServiceDetailsExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-750 transition-colors rounded-lg"
          >
            <span className="text-lg font-medium">Service Details</span>
            {isServiceDetailsExpanded ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {isServiceDetailsExpanded && (
            <div className="px-6 pb-6 border-t border-gray-700">
              <div className="pt-6">
                <h3 className="text-lg font-medium mb-6 text-white">Service Details</h3>
                
                <div className="space-y-6">
                  {/* Contractor Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                      Contractor Name
                    </label>
                    <input
                      type="text"
                      value={formData.contractorName}
                      onChange={(e) => handleInputChange('contractorName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="Enter contractor name"
                    />
                  </div>

                  {/* House Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                      House No.
                    </label>
                    <input
                      type="text"
                      value={formData.houseNo}
                      onChange={(e) => handleInputChange('houseNo', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="Enter house number"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="Enter address"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Milestone Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
          <button
            onClick={() => setIsMilestoneExpanded(!isMilestoneExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-750 transition-colors rounded-lg"
          >
            <span className="text-lg font-medium">Milestone: Pre</span>
            {isMilestoneExpanded ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {isMilestoneExpanded && (
            <div className="px-6 pb-6 border-t border-gray-700">
              <div className="pt-6">
                <h3 className="text-lg font-medium mb-6 text-white">Task details: 1</h3>
                
                <div className="space-y-6">
                  {/* Task Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                      Task Name
                    </label>
                    <input
                      type="text"
                      value={taskData.taskName}
                      onChange={(e) => handleTaskDataChange('taskName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="Enter task name"
                    />
                  </div>

                  {/* Task Instructions */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                      Task Instruction
                    </label>
                    <textarea
                      value={taskData.taskInstructions}
                      onChange={(e) => handleTaskDataChange('taskInstructions', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
                      placeholder="Enter task instructions"
                    />
                  </div>

                  {/* Expected Hours */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                      Expected Hours
                    </label>
                    <input
                      type="number"
                      value={taskData.expectedHours}
                      onChange={(e) => handleTaskDataChange('expectedHours', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="0"
                      min="0"
                      step="0.5"
                    />
                  </div>

                  {/* Photo Evidence */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                      Photo Evidence
                    </label>
                    <div className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-650 transition-colors cursor-pointer">
                      <CameraIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>

                  {/* Uploaded Evidence */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                      Uploaded Evidence
                    </label>
                    <div className="w-full min-h-32 bg-gray-700 border border-gray-600 rounded-lg p-4">
                      {taskData.uploadedEvidence.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                          <DocumentIcon className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                          <p>No evidence files uploaded yet</p>
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                            accept="image/*,video/*,.pdf,.doc,.docx"
                          />
                          <label
                            htmlFor="file-upload"
                            className="mt-2 inline-block bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                          >
                            Upload Files
                          </label>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {taskData.uploadedEvidence.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                              <DocumentIcon className="h-4 w-4" />
                              <span>{file.name}</span>
                            </div>
                          ))}
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload-additional"
                            accept="image/*,video/*,.pdf,.doc,.docx"
                          />
                          <label
                            htmlFor="file-upload-additional"
                            className="inline-block bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm cursor-pointer transition-colors"
                          >
                            Add More Files
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Job Information */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-medium mb-4 text-white">Job Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Job ID:</span>
              <span className="ml-2 text-white">{job._id}</span>
            </div>
            <div>
              <span className="text-gray-400">Date:</span>
              <span className="ml-2 text-white">{job.date}</span>
            </div>
            <div>
              <span className="text-gray-400">Time:</span>
              <span className="ml-2 text-white">{job.time}</span>
            </div>
            <div>
              <span className="text-gray-400">Status:</span>
              <span className="ml-2 text-white">{job.status || 'Scheduled'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate('/schedule')}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
