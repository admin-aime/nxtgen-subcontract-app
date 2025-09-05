import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Details.css';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const jobData = location.state?.jobData;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Cause & Conduction
    primaryCause: '',
    conductionMethod: '',
    severity: '',
    onsetDate: '',
    symptoms: [],
    
    // Diagnosis & Complications
    primaryDiagnosis: '',
    secondaryDiagnosis: '',
    complications: [],
    diagnosticTests: [
      { test: '', result: '', date: '' }
    ],
    
    // History & Risk Factors
    medicalHistory: [],
    riskFactors: [],
    familyHistory: '',
    allergies: '',
    medications: [
      { name: '', dosage: '', frequency: '' }
    ],
    
    // Treatment & Outcome
    treatmentPlan: '',
    procedures: [],
    outcome: '',
    followUpDate: '',
    notes: '',
    
    // Final Review
    reviewComplete: false
  });

  const [errors, setErrors] = useState({});
  const [collapsedSections, setCollapsedSections] = useState({});

  const steps = [
    { id: 1, title: 'Cause & Conduction', icon: '🔍' },
    { id: 2, title: 'Diagnosis & Complications', icon: '🩺' },
    { id: 3, title: 'History & Risk Factors', icon: '📋' },
    { id: 4, title: 'Treatment & Outcome', icon: '💊' },
    { id: 5, title: 'Final Review', icon: '✅' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleArrayChange = (field, index, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [subField]: value } : item
      )
    }));
  };

  const addArrayItem = (field, template) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], template]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const toggleCheckbox = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.primaryCause) newErrors.primaryCause = 'Primary cause is required';
        if (!formData.conductionMethod) newErrors.conductionMethod = 'Conduction method is required';
        break;
      case 2:
        if (!formData.primaryDiagnosis) newErrors.primaryDiagnosis = 'Primary diagnosis is required';
        break;
      case 3:
        if (formData.medicalHistory.length === 0) newErrors.medicalHistory = 'At least one medical history item is required';
        break;
      case 4:
        if (!formData.treatmentPlan) newErrors.treatmentPlan = 'Treatment plan is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSave = () => {
    console.log('Saving form data:', formData);
    // Implement save logic here
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log('Submitting form:', formData);
      // Implement submit logic here
      navigate('/schedule');
    }
  };

  const renderProgressIndicator = () => (
    <div className="progress-indicator">
      {steps.map((step, index) => (
        <div key={step.id} className="progress-step">
          <div className={`step-circle ${currentStep >= step.id ? 'active' : ''} ${currentStep === step.id ? 'current' : ''}`}>
            <span className="step-icon">{step.icon}</span>
          </div>
          <span className="step-title">{step.title}</span>
          {index < steps.length - 1 && <div className="step-connector"></div>}
        </div>
      ))}
    </div>
  );

  const renderCauseConduction = () => (
    <div className="form-section">
      <h3>Cause & Conduction</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Primary Cause *</label>
          <select 
            value={formData.primaryCause}
            onChange={(e) => handleInputChange('primaryCause', e.target.value)}
            className={`form-input ${errors.primaryCause ? 'error' : ''}`}
          >
            <option value="">Select primary cause...</option>
            <option value="infection">Infection</option>
            <option value="trauma">Trauma</option>
            <option value="genetic">Genetic</option>
            <option value="environmental">Environmental</option>
            <option value="unknown">Unknown</option>
          </select>
          {errors.primaryCause && <span className="error-text">{errors.primaryCause}</span>}
        </div>

        <div className="form-group">
          <label>Conduction Method *</label>
          <select 
            value={formData.conductionMethod}
            onChange={(e) => handleInputChange('conductionMethod', e.target.value)}
            className={`form-input ${errors.conductionMethod ? 'error' : ''}`}
          >
            <option value="">Select method...</option>
            <option value="direct">Direct Contact</option>
            <option value="airborne">Airborne</option>
            <option value="vector">Vector-borne</option>
            <option value="foodborne">Foodborne</option>
          </select>
          {errors.conductionMethod && <span className="error-text">{errors.conductionMethod}</span>}
        </div>

        <div className="form-group">
          <label>Severity Level</label>
          <select 
            value={formData.severity}
            onChange={(e) => handleInputChange('severity', e.target.value)}
            className="form-input"
          >
            <option value="">Select severity...</option>
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="form-group">
          <label>Onset Date</label>
          <input 
            type="date"
            value={formData.onsetDate}
            onChange={(e) => handleInputChange('onsetDate', e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Symptoms</label>
        <div className="checkbox-group">
          {['Fever', 'Headache', 'Nausea', 'Fatigue', 'Pain', 'Swelling'].map(symptom => (
            <label key={symptom} className="checkbox-label">
              <input 
                type="checkbox"
                checked={formData.symptoms.includes(symptom)}
                onChange={() => toggleCheckbox('symptoms', symptom)}
              />
              <span>{symptom}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDiagnosisComplications = () => (
    <div className="form-section">
      <h3>Diagnosis & Complications</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Primary Diagnosis *</label>
          <input 
            type="text"
            value={formData.primaryDiagnosis}
            onChange={(e) => handleInputChange('primaryDiagnosis', e.target.value)}
            className={`form-input ${errors.primaryDiagnosis ? 'error' : ''}`}
            placeholder="Enter primary diagnosis"
          />
          {errors.primaryDiagnosis && <span className="error-text">{errors.primaryDiagnosis}</span>}
        </div>

        <div className="form-group">
          <label>Secondary Diagnosis</label>
          <input 
            type="text"
            value={formData.secondaryDiagnosis}
            onChange={(e) => handleInputChange('secondaryDiagnosis', e.target.value)}
            className="form-input"
            placeholder="Enter secondary diagnosis"
          />
        </div>
      </div>

      <div className="collapsible-section">
        <button 
          type="button"
          className="section-toggle"
          onClick={() => toggleSection('diagnosticTests')}
        >
          Diagnostic Tests {collapsedSections.diagnosticTests ? '▼' : '▲'}
        </button>
        
        {!collapsedSections.diagnosticTests && (
          <div className="table-section">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Result</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.diagnosticTests.map((test, index) => (
                  <tr key={index}>
                    <td>
                      <input 
                        type="text"
                        value={test.test}
                        onChange={(e) => handleArrayChange('diagnosticTests', index, 'test', e.target.value)}
                        className="table-input"
                        placeholder="Test name"
                      />
                    </td>
                    <td>
                      <input 
                        type="text"
                        value={test.result}
                        onChange={(e) => handleArrayChange('diagnosticTests', index, 'result', e.target.value)}
                        className="table-input"
                        placeholder="Result"
                      />
                    </td>
                    <td>
                      <input 
                        type="date"
                        value={test.date}
                        onChange={(e) => handleArrayChange('diagnosticTests', index, 'date', e.target.value)}
                        className="table-input"
                      />
                    </td>
                    <td>
                      <button 
                        type="button"
                        onClick={() => removeArrayItem('diagnosticTests', index)}
                        className="btn-remove"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button 
              type="button"
              onClick={() => addArrayItem('diagnosticTests', { test: '', result: '', date: '' })}
              className="btn-add"
            >
              + Add Test
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderHistoryRiskFactors = () => (
    <div className="form-section">
      <h3>History & Risk Factors</h3>
      
      <div className="form-group">
        <label>Medical History *</label>
        <div className="checkbox-group">
          {['Diabetes', 'Hypertension', 'Heart Disease', 'Cancer', 'Asthma', 'Allergies'].map(condition => (
            <label key={condition} className="checkbox-label">
              <input 
                type="checkbox"
                checked={formData.medicalHistory.includes(condition)}
                onChange={() => toggleCheckbox('medicalHistory', condition)}
              />
              <span>{condition}</span>
            </label>
          ))}
        </div>
        {errors.medicalHistory && <span className="error-text">{errors.medicalHistory}</span>}
      </div>

      <div className="form-group">
        <label>Risk Factors</label>
        <div className="checkbox-group">
          {['Smoking', 'Alcohol', 'Obesity', 'Sedentary Lifestyle', 'Stress', 'Poor Diet'].map(factor => (
            <label key={factor} className="checkbox-label">
              <input 
                type="checkbox"
                checked={formData.riskFactors.includes(factor)}
                onChange={() => toggleCheckbox('riskFactors', factor)}
              />
              <span>{factor}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Family History</label>
          <textarea 
            value={formData.familyHistory}
            onChange={(e) => handleInputChange('familyHistory', e.target.value)}
            className="form-textarea"
            placeholder="Describe family medical history"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Known Allergies</label>
          <textarea 
            value={formData.allergies}
            onChange={(e) => handleInputChange('allergies', e.target.value)}
            className="form-textarea"
            placeholder="List known allergies"
            rows="3"
          />
        </div>
      </div>
    </div>
  );

  const renderTreatmentOutcome = () => (
    <div className="form-section">
      <h3>Treatment & Outcome</h3>
      
      <div className="form-group">
        <label>Treatment Plan *</label>
        <textarea 
          value={formData.treatmentPlan}
          onChange={(e) => handleInputChange('treatmentPlan', e.target.value)}
          className={`form-textarea ${errors.treatmentPlan ? 'error' : ''}`}
          placeholder="Describe the treatment plan"
          rows="4"
        />
        {errors.treatmentPlan && <span className="error-text">{errors.treatmentPlan}</span>}
      </div>

      <div className="form-group">
        <label>Procedures</label>
        <div className="checkbox-group">
          {['Surgery', 'Medication', 'Physical Therapy', 'Counseling', 'Monitoring', 'Follow-up'].map(procedure => (
            <label key={procedure} className="checkbox-label">
              <input 
                type="checkbox"
                checked={formData.procedures.includes(procedure)}
                onChange={() => toggleCheckbox('procedures', procedure)}
              />
              <span>{procedure}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Outcome</label>
          <select 
            value={formData.outcome}
            onChange={(e) => handleInputChange('outcome', e.target.value)}
            className="form-input"
          >
            <option value="">Select outcome...</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div className="form-group">
          <label>Follow-up Date</label>
          <input 
            type="date"
            value={formData.followUpDate}
            onChange={(e) => handleInputChange('followUpDate', e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Additional Notes</label>
        <textarea 
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          className="form-textarea"
          placeholder="Any additional notes or observations"
          rows="4"
        />
      </div>
    </div>
  );

  const renderFinalReview = () => (
    <div className="form-section">
      <h3>Final Review</h3>
      
      <div className="review-summary">
        <div className="summary-card">
          <h4>Cause & Conduction</h4>
          <p><strong>Primary Cause:</strong> {formData.primaryCause || 'Not specified'}</p>
          <p><strong>Conduction Method:</strong> {formData.conductionMethod || 'Not specified'}</p>
          <p><strong>Severity:</strong> {formData.severity || 'Not specified'}</p>
          <p><strong>Symptoms:</strong> {formData.symptoms.join(', ') || 'None selected'}</p>
        </div>

        <div className="summary-card">
          <h4>Diagnosis & Complications</h4>
          <p><strong>Primary Diagnosis:</strong> {formData.primaryDiagnosis || 'Not specified'}</p>
          <p><strong>Secondary Diagnosis:</strong> {formData.secondaryDiagnosis || 'Not specified'}</p>
          <p><strong>Tests Conducted:</strong> {formData.diagnosticTests.length} tests</p>
        </div>

        <div className="summary-card">
          <h4>History & Risk Factors</h4>
          <p><strong>Medical History:</strong> {formData.medicalHistory.join(', ') || 'None selected'}</p>
          <p><strong>Risk Factors:</strong> {formData.riskFactors.join(', ') || 'None selected'}</p>
        </div>

        <div className="summary-card">
          <h4>Treatment & Outcome</h4>
          <p><strong>Treatment Plan:</strong> {formData.treatmentPlan || 'Not specified'}</p>
          <p><strong>Procedures:</strong> {formData.procedures.join(', ') || 'None selected'}</p>
          <p><strong>Outcome:</strong> {formData.outcome || 'Not specified'}</p>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input 
            type="checkbox"
            checked={formData.reviewComplete}
            onChange={(e) => handleInputChange('reviewComplete', e.target.checked)}
          />
          <span>I have reviewed all information and confirm it is accurate</span>
        </label>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderCauseConduction();
      case 2: return renderDiagnosisComplications();
      case 3: return renderHistoryRiskFactors();
      case 4: return renderTreatmentOutcome();
      case 5: return renderFinalReview();
      default: return null;
    }
  };

  return (
    <div className="details-container">
      <div className="details-header">
        <h1>PAS-AID - Medical Assessment Form</h1>
        <button onClick={() => navigate('/schedule')} className="btn-back">
          ← Back to Schedule
        </button>
      </div>

      {renderProgressIndicator()}

      <div className="form-wizard">
        <div className="form-card">
          {renderCurrentStep()}
        </div>

        <div className="form-navigation">
          <div className="nav-left">
            {currentStep > 1 && (
              <button onClick={handleBack} className="btn-secondary">
                ← Back
              </button>
            )}
          </div>
          
          <div className="nav-center">
            <button onClick={handleSave} className="btn-save">
              💾 Save Progress
            </button>
          </div>
          
          <div className="nav-right">
            {currentStep < steps.length ? (
              <button onClick={handleNext} className="btn-primary">
                Next →
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                className="btn-submit"
                disabled={!formData.reviewComplete}
              >
                Submit Form
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
