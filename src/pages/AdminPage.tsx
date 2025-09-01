import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

interface TrackSubmission {
  id: string;
  trackName: string;
  artist: string;
  type: 'track' | 'album';
  source: string;
  submittedBy: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const AdminPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<TrackSubmission[]>([
    {
      id: '1',
      trackName: 'Song of the Wind',
      artist: 'Artist Name',
      type: 'track',
      source: 'mp3 file',
      submittedBy: 'MusicLover',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: '2',
      trackName: 'Melody for You',
      artist: 'Another Artist',
      type: 'album',
      source: 'Spotify link',
      submittedBy: 'JazzFan',
      date: '2024-01-14',
      status: 'approved'
    },
    {
      id: '3',
      trackName: 'Night Drive',
      artist: 'Electronic Band',
      type: 'track',
      source: 'wav file',
      submittedBy: 'EDMListener',
      date: '2024-01-13',
      status: 'rejected'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'submissions' | 'analytics' | 'settings'>('submissions');

  const updateSubmissionStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, status } : sub
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#28a745';
      case 'rejected': return '#dc3545';
      default: return '#ffc107';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return '✓ Approved';
      case 'rejected': return '✗ Rejected';
      default: return '⏳ Pending';
    }
  };

  return (
    <div className="admin-page">
      {/* Навигационная панель */}
      <nav className="navbar">
        <div className="nav-logo">
          <div className="logo-icon">
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
          </div>
          <span className="logo-text">MUSIC REACTIONS</span>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/admin" className="nav-link active">Admin</Link>
        </div>
      </nav>

      {/* Основной контент */}
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="page-title">Admin Panel</h1>
          <p className="page-subtitle">Manage track submissions and platform settings</p>
        </div>

        {/* Табы */}
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            Track Submissions
          </button>
          <button 
            className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button 
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {/* Контент табов */}
        {activeTab === 'submissions' && (
          <div className="tab-content">
            <div className="submissions-header">
              <h2>Track Submissions ({submissions.length})</h2>
              <button className="refresh-button">🔄 Refresh</button>
            </div>
            
            <div className="submissions-list">
              {submissions.map(submission => (
                <div key={submission.id} className="submission-card">
                  <div className="submission-info">
                    <div className="track-details">
                      <h3 className="track-name">{submission.trackName}</h3>
                      <p className="artist-name">{submission.artist}</p>
                      <div className="submission-meta">
                        <span className="type-badge">{submission.type}</span>
                        <span className="source-info">{submission.source}</span>
                        <span className="submitter">by {submission.submittedBy}</span>
                        <span className="date">{submission.date}</span>
                      </div>
                    </div>
                    <div className="submission-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(submission.status) }}
                      >
                        {getStatusText(submission.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="submission-actions">
                    {submission.status === 'pending' && (
                      <>
                        <button 
                          className="action-btn approve"
                          onClick={() => updateSubmissionStatus(submission.id, 'approved')}
                        >
                          ✓ Approve
                        </button>
                        <button 
                          className="action-btn reject"
                          onClick={() => updateSubmissionStatus(submission.id, 'rejected')}
                        >
                          ✗ Reject
                        </button>
                      </>
                    )}
                    <button className="action-btn view">👁️ View</button>
                    <button className="action-btn delete">🗑️ Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="tab-content">
            <h2>Analytics Dashboard</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Total Submissions</h3>
                <div className="analytics-value">{submissions.length}</div>
              </div>
              <div className="analytics-card">
                <h3>Pending Review</h3>
                <div className="analytics-value">
                  {submissions.filter(s => s.status === 'pending').length}
                </div>
              </div>
              <div className="analytics-card">
                <h3>Approved Tracks</h3>
                <div className="analytics-value">
                  {submissions.filter(s => s.status === 'approved').length}
                </div>
              </div>
              <div className="analytics-card">
                <h3>Rejected Tracks</h3>
                <div className="analytics-value">
                  {submissions.filter(s => s.status === 'rejected').length}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="tab-content">
            <h2>Platform Settings</h2>
            <div className="settings-form">
              <div className="setting-group">
                <label>Max File Size (MB)</label>
                <input type="number" defaultValue="50" min="1" max="100" />
              </div>
              <div className="setting-group">
                <label>Allowed File Types</label>
                <input type="text" defaultValue="mp3, wav, flac" />
              </div>
              <div className="setting-group">
                <label>Auto-approve submissions</label>
                <input type="checkbox" />
              </div>
              <div className="setting-group">
                <label>Notification emails</label>
                <input type="checkbox" defaultChecked />
              </div>
              <button className="save-settings">💾 Save Settings</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
