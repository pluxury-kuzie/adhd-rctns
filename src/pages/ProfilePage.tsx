import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  const userProfile = {
    username: 'MusicLover',
    email: 'musiclover@example.com',
    joinDate: 'January 2024',
    totalRatings: 47,
    averageRating: 8.2,
    recentActivity: [
      { track: 'Song of the Wind', artist: 'Artist Name', rating: 8, date: '2024-01-15' },
      { track: 'Melody for You', artist: 'Another Artist', rating: 7, date: '2024-01-14' },
      { track: 'Night Drive', artist: 'Electronic Band', rating: 9, date: '2024-01-13' },
      { track: 'Ocean Waves', artist: 'Ambient Collective', rating: 10, date: '2024-01-12' },
      { track: 'City Lights', artist: 'Urban Sound', rating: 6, date: '2024-01-11' }
    ]
  };

  const [editForm, setEditForm] = useState({
    username: userProfile.username,
    email: userProfile.email,
    bio: 'Music enthusiast who loves discovering new sounds and sharing opinions.',
    location: 'Moscow, Russia',
    favoriteGenres: ['Rock', 'Electronic', 'Jazz', 'Ambient']
  });

  const handleEditSubmit = () => {
    // Здесь будет логика сохранения изменений
    alert('Profile updated successfully!');
    setShowEditModal(false);
  };

  const handlePasswordChange = () => {
    // Здесь будет логика смены пароля
    alert('Password change feature coming soon!');
    setShowPasswordModal(false);
  };

  return (
    <div className="profile-page">
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
          <Link to="/profile" className="nav-link active">Profile</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </div>
      </nav>

      {/* Основной контент */}
      <main className="profile-content">
        <div className="profile-header">
          <h1 className="page-title">User Profile</h1>
          <p className="page-subtitle">Your music rating history and preferences</p>
        </div>

        <div className="profile-layout">
          {/* Левая колонка - основная информация */}
          <div className="profile-main">
            {/* Информация о профиле */}
            <div className="profile-info-section">
              <div className="profile-card">
                <div className="profile-avatar">
                  <span className="avatar-text">{userProfile.username.charAt(0)}</span>
                </div>
                <div className="profile-details">
                  <h2 className="profile-username">{userProfile.username}</h2>
                  <p className="profile-email">{userProfile.email}</p>
                  <p className="profile-join-date">Member since {userProfile.joinDate}</p>
                  <p className="profile-bio">{editForm.bio}</p>
                  <p className="profile-location">📍 {editForm.location}</p>
                </div>
              </div>
            </div>

            {/* Статистика */}
            <div className="stats-section">
              <h2 className="section-title">Your Statistics</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3 className="stat-title">Total Ratings</h3>
                  <div className="stat-value">{userProfile.totalRatings}</div>
                </div>
                <div className="stat-card">
                  <h3 className="stat-title">Average Rating</h3>
                  <div className="stat-value">{userProfile.averageRating}</div>
                </div>
                <div className="stat-card">
                  <h3 className="stat-title">This Month</h3>
                  <div className="stat-value">12</div>
                </div>
                <div className="stat-card">
                  <h3 className="stat-title">Top Rating</h3>
                  <div className="stat-value">10</div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - активность и действия */}
          <div className="profile-sidebar">
            {/* Недавняя активность */}
            <div className="activity-section">
              <h2 className="section-title">Recent Activity</h2>
              <div className="activity-list">
                {userProfile.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-info">
                      <h3 className="activity-track">{activity.track}</h3>
                      <p className="activity-artist">{activity.artist}</p>
                      <p className="activity-date">{activity.date}</p>
                    </div>
                    <div className="activity-rating">
                      <span className="rating-badge">{activity.rating}/13</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Действия */}
            <div className="profile-actions">
              <button 
                onClick={() => setShowEditModal(true)} 
                className="action-btn primary"
              >
                ✏️ Edit Profile
              </button>
              <button 
                onClick={() => setShowPasswordModal(true)} 
                className="action-btn secondary"
              >
                🔒 Change Password
              </button>
              <button className="action-btn danger">🗑️ Delete Account</button>
            </div>
          </div>
        </div>

        {/* Модальное окно редактирования профиля */}
        {showEditModal && (
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Profile</h3>
              <div className="edit-form">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Favorite Genres</label>
                  <input
                    type="text"
                    value={editForm.favoriteGenres.join(', ')}
                    onChange={(e) => setEditForm({...editForm, favoriteGenres: e.target.value.split(', ')})}
                    placeholder="Rock, Electronic, Jazz"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button onClick={handleEditSubmit} className="submit-btn">💾 Save Changes</button>
                <button onClick={() => setShowEditModal(false)} className="cancel-btn">❌ Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно смены пароля */}
        {showPasswordModal && (
          <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Change Password</h3>
              <div className="edit-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>
              </div>
              <div className="modal-actions">
                <button onClick={handlePasswordChange} className="submit-btn">🔒 Change Password</button>
                <button onClick={() => setShowPasswordModal(false)} className="cancel-btn">❌ Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
