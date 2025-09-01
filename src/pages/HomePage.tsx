import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [showTrackForm, setShowTrackForm] = useState(false);
  const [showAlbumForm, setShowAlbumForm] = useState(false);

  const handleTrackSubmit = () => {
    // Здесь будет логика отправки трека
    alert('Track submission feature coming soon!');
    setShowTrackForm(false);
  };

  const handleAlbumSubmit = () => {
    // Здесь будет логика отправки альбома
    alert('Album submission feature coming soon!');
    setShowAlbumForm(false);
  };

  return (
    <div className="home-page">
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
          <Link to="/" className="nav-link active">Home</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </div>
      </nav>

      {/* Основной контент */}
      <main className="main-content">
        {/* Героическая секция */}
        <div className="hero-section">
          <h1 className="main-title">MUSIC REACTIONS</h1>
          <p className="subtitle">Listen to and rate music with a streamer</p>
          
          {/* Описание платформы */}
          <div className="platform-description">
            <p className="description-text">
              Join our community of music enthusiasts and discover new tracks through 
              detailed ratings and reactions. Submit your favorite music and get 
              professional feedback from our experienced streamer.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span className="feature-text">13-point rating system</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎧</span>
                <span className="feature-text">Live stream reactions</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span className="feature-text">Detailed analytics</span>
              </div>
            </div>
          </div>
          
          {/* Кнопки действий */}
          <div className="action-buttons">
            <button 
              className="action-button track-button"
              onClick={() => setShowTrackForm(true)}
            >
              <span className="button-icon">♪</span>
              <span className="button-text">Send a track</span>
            </button>
            <button 
              className="action-button album-button"
              onClick={() => setShowAlbumForm(true)}
            >
              <span className="button-icon">💿</span>
              <span className="button-text">Send an album</span>
            </button>
          </div>
        </div>

        {/* Секция недавно оцененных треков */}
        <section className="recent-tracks">
          <h2 className="section-title">Recently rated tracks</h2>
          <p className="section-description">
            Check out the latest music that has been rated by our community
          </p>
          <div className="tracks-grid">
            <div className="track-card">
              <div className="album-cover-placeholder"></div>
              <div className="track-info">
                <h3 className="track-title">Song of the Wind</h3>
                <p className="track-artist">Artist Name</p>
                <p className="track-rating">Rating: 8/13</p>
                <p className="track-genre">Genre: Ambient</p>
              </div>
            </div>
            <div className="track-card">
              <div className="album-cover-placeholder"></div>
              <div className="track-info">
                <h3 className="track-title">Melody for You</h3>
                <p className="track-artist">Another Artist</p>
                <p className="track-rating">Rating: 7/13</p>
                <p className="track-genre">Genre: Jazz</p>
              </div>
            </div>
            <div className="track-card">
              <div className="album-cover-placeholder"></div>
              <div className="track-info">
                <h3 className="track-title">Night Drive</h3>
                <p className="track-artist">Electronic Band</p>
                <p className="track-rating">Rating: 9/13</p>
                <p className="track-genre">Genre: Electronic</p>
              </div>
            </div>
          </div>
        </section>

        {/* Секция статистики */}
        <section className="stats-section">
          <h2 className="section-title">Platform Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">1,247</div>
              <div className="stat-label">Tracks Rated</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">156</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">8.4</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24</div>
              <div className="stat-label">Genres Covered</div>
            </div>
          </div>
        </section>

        {/* Модальные окна для форм */}
        {showTrackForm && (
          <div className="modal-overlay" onClick={() => setShowTrackForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Submit a Track</h3>
              <p>Upload your MP3/WAV file or provide a music service link</p>
              <div className="modal-actions">
                <button onClick={handleTrackSubmit} className="submit-btn">Submit Track</button>
                <button onClick={() => setShowTrackForm(false)} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showAlbumForm && (
          <div className="modal-overlay" onClick={() => setShowAlbumForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Submit an Album</h3>
              <p>Provide a link to a music service (Spotify, Apple Music, etc.)</p>
              <div className="modal-actions">
                <button onClick={handleAlbumSubmit} className="submit-btn">Submit Album</button>
                <button onClick={() => setShowAlbumForm(false)} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
