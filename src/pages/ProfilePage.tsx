import React from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const userProfile = {
    username: 'MusicLover',
    email: 'musiclover@example.com',
    joinDate: 'January 2024',
    totalRatings: 47,
    averageRating: 8.2,
    favoriteGenres: ['Rock', 'Electronic', 'Jazz'],
    recentActivity: [
      { track: 'Song of the Wind', artist: 'Artist Name', rating: 8, date: '2024-01-15' },
      { track: 'Melody for You', artist: 'Another Artist', rating: 7, date: '2024-01-14' },
      { track: 'Night Drive', artist: 'Electronic Band', rating: 9, date: '2024-01-13' }
    ]
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
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="stats-section">
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
              <h3 className="stat-title">Favorite Genres</h3>
              <div className="stat-value">{userProfile.favoriteGenres.length}</div>
            </div>
          </div>
        </div>

        {/* Любимые жанры */}
        <div className="genres-section">
          <h2 className="section-title">Favorite Genres</h2>
          <div className="genres-list">
            {userProfile.favoriteGenres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
        </div>

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
          <button className="action-btn primary">Edit Profile</button>
          <button className="action-btn secondary">Change Password</button>
          <button className="action-btn danger">Delete Account</button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
