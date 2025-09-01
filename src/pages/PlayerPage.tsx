import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PlayerPage.css';

interface RatingCriteria {
  id: string;
  name: string;
  description: string;
  rating: number;
}

const PlayerPage: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<string>('Song of the Wind - Artist Name');
  const [isPlaying, setIsPlaying] = useState(false);
  const [ratings, setRatings] = useState<RatingCriteria[]>([
    {
      id: '1',
      name: 'Melody',
      description: 'How catchy and memorable is the melody',
      rating: 7
    },
    {
      id: '2',
      name: 'Production',
      description: 'Quality of sound and mixing',
      rating: 8
    },
    {
      id: '3',
      name: 'Vocals',
      description: 'Quality and performance of vocals',
      rating: 6
    },
    {
      id: '4',
      name: 'Instrumentation',
      description: 'Musical arrangement and instruments',
      rating: 9
    },
    {
      id: '5',
      name: 'Overall Impact',
      description: 'Overall emotional and musical impact',
      rating: 7
    }
  ]);

  const updateRating = (id: string, newRating: number) => {
    setRatings(ratings.map(criteria => 
      criteria.id === id ? { ...criteria, rating: newRating } : criteria
    ));
  };

  const getTotalRating = () => {
    return ratings.reduce((sum, criteria) => sum + criteria.rating, 0);
  };

  const getAverageRating = () => {
    return (getTotalRating() / ratings.length).toFixed(1);
  };

  return (
    <div className="player-page">
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
          <Link to="/admin" className="nav-link">Admin</Link>
        </div>
      </nav>

      {/* Основной контент */}
      <main className="player-content">
        <div className="player-header">
          <h1 className="page-title">Streamer Player</h1>
          <p className="page-subtitle">Rate music with detailed criteria</p>
        </div>

        {/* Плеер и информация о треке */}
        <div className="player-section">
          <div className="track-info-large">
            <h2 className="track-title-large">{currentTrack}</h2>
            <div className="player-controls">
              <button 
                className={`play-button ${isPlaying ? 'playing' : ''}`}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
              <button className="stop-button">⏹️ Stop</button>
              <button className="next-button">⏭️ Next</button>
            </div>
          </div>
        </div>

        {/* Критерии оценивания */}
        <div className="rating-section">
          <h2 className="rating-title">Rating Criteria (13-point scale)</h2>
          
          <div className="criteria-grid">
            {ratings.map(criteria => (
              <div key={criteria.id} className="criteria-card">
                <div className="criteria-header">
                  <h3 className="criteria-name">{criteria.name}</h3>
                  <span className="criteria-rating">{criteria.rating}/13</span>
                </div>
                <p className="criteria-description">{criteria.description}</p>
                <div className="rating-controls">
                  <input
                    type="range"
                    min="1"
                    max="13"
                    value={criteria.rating}
                    onChange={(e) => updateRating(criteria.id, Number(e.target.value))}
                    className="rating-slider"
                  />
                  <div className="rating-labels">
                    <span>1</span>
                    <span>13</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Итоговая оценка */}
          <div className="final-rating">
            <div className="rating-summary">
              <h3>Final Rating</h3>
              <div className="total-score">
                <span className="score-number">{getTotalRating()}</span>
                <span className="score-max">/65</span>
              </div>
              <div className="average-score">
                Average: <span className="avg-number">{getAverageRating()}</span>/13
              </div>
            </div>
            <button className="submit-rating">Submit Rating</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayerPage;
