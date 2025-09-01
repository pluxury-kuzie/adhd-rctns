import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
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
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </div>
      </nav>

      {/* Основная секция */}
      <main className="main-content">
        <div className="hero-section">
          <h1 className="main-title">MUSIC REACTIONS</h1>
          <p className="subtitle">Listen to and rate music with a streamer</p>
          
          <div className="action-buttons">
            <button className="action-button">
              <span className="button-icon">♪</span>
              <span className="button-text">Send a track</span>
            </button>
            <button className="action-button">
              <span className="button-icon">●</span>
              <span className="button-text">Send an album</span>
            </button>
          </div>
        </div>

        {/* Секция недавно оцененных треков */}
        <section className="recent-tracks">
          <h2 className="section-title">Recently rated tracks</h2>
          <div className="tracks-grid">
            <div className="track-card">
              <div className="album-cover-placeholder"></div>
              <div className="track-info">
                <h3 className="track-title">Song of the Wind</h3>
                <p className="track-artist">Artist Name</p>
                <p className="track-rating">Rating: 8/13</p>
              </div>
            </div>
            <div className="track-card">
              <div className="album-cover-placeholder"></div>
              <div className="track-info">
                <h3 className="track-title">Melody for You</h3>
                <p className="track-artist">Another Artist</p>
                <p className="track-rating">Rating: 7/13</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
