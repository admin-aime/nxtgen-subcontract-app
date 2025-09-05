import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY'
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30'
    }
  });

  const handleNotificationChange = (type) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSecurityChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <button className="save-settings-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <label>Email Notifications</label>
                <span>Receive notifications via email</span>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Push Notifications</label>
                <span>Receive browser push notifications</span>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={() => handleNotificationChange('push')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>SMS Notifications</label>
                <span>Receive notifications via SMS</span>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.notifications.sms}
                  onChange={() => handleNotificationChange('sms')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <label>Theme</label>
                <span>Choose your preferred theme</span>
              </div>
              <select
                value={settings.preferences.theme}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Language</label>
                <span>Select your language</span>
              </div>
              <select
                value={settings.preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Timezone</label>
                <span>Your local timezone</span>
              </div>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              >
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Date Format</label>
                <span>How dates are displayed</span>
              </div>
              <select
                value={settings.preferences.dateFormat}
                onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Security</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <label>Two-Factor Authentication</label>
                <span>Add an extra layer of security</span>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactor}
                  onChange={() => handleSecurityChange('twoFactor', !settings.security.twoFactor)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Session Timeout</label>
                <span>Auto logout after inactivity (minutes)</span>
              </div>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
