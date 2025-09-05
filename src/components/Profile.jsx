import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@pasaid.com',
    role: 'Field Technician',
    phone: '+1 (555) 123-4567',
    department: 'Operations',
    joinDate: '2023-01-15',
    employeeId: 'EMP-001'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <div className="profile-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={handleEdit}>
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-group">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              ) : (
                <span>{profile.name}</span>
              )}
            </div>

            <div className="info-group">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              ) : (
                <span>{profile.email}</span>
              )}
            </div>

            <div className="info-group">
              <label>Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              ) : (
                <span>{profile.phone}</span>
              )}
            </div>

            <div className="info-group">
              <label>Role</label>
              {isEditing ? (
                <select
                  value={editedProfile.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                >
                  <option value="Field Technician">Field Technician</option>
                  <option value="Senior Technician">Senior Technician</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Manager">Manager</option>
                </select>
              ) : (
                <span>{profile.role}</span>
              )}
            </div>

            <div className="info-group">
              <label>Department</label>
              {isEditing ? (
                <select
                  value={editedProfile.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                >
                  <option value="Operations">Operations</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Safety">Safety</option>
                </select>
              ) : (
                <span>{profile.department}</span>
              )}
            </div>

            <div className="info-group">
              <label>Employee ID</label>
              <span>{profile.employeeId}</span>
            </div>

            <div className="info-group">
              <label>Join Date</label>
              <span>{new Date(profile.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
