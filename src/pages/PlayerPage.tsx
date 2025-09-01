import React, { useState, useRef } from 'react';
import './PlayerPage.css';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  isDonated: boolean;
  rating?: number;
}

interface RatingCriteria {
  id: string;
  name: string;
  rating: number;
}

const PlayerPage: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>({
    id: '1',
    title: 'Song of the Wind',
    artist: 'Artist Name',
    duration: '3:45',
    isDonated: true,
    rating: 8
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [queue, setQueue] = useState<Track[]>([
    { id: '2', title: 'Melody for You', artist: 'Another Artist', duration: '4:12', isDonated: false },
    { id: '3', title: 'Night Drive', artist: 'Electronic Band', duration: '5:23', isDonated: true },
    { id: '4', title: 'Ocean Waves', artist: 'Ambient Collective', duration: '6:18', isDonated: false },
    { id: '5', title: 'City Lights', artist: 'Urban Sound', duration: '3:55', isDonated: true },
    { id: '6', title: 'Mountain Echo', artist: 'Nature Sounds', duration: '4:47', isDonated: false },
    { id: '7', title: 'Digital Dreams', artist: 'Tech Artist', duration: '5:32', isDonated: true },
    { id: '8', title: 'Jazz Cafe', artist: 'Smooth Jazz', duration: '4:15', isDonated: false },
    { id: '9', title: 'Sunset Vibes', artist: 'Chill Wave', duration: '7:23', isDonated: true },
    { id: '10', title: 'Neon Nights', artist: 'Synth Pop', duration: '4:38', isDonated: false },
    { id: '11', title: 'Desert Storm', artist: 'Rock Fusion', duration: '6:12', isDonated: true },
    { id: '12', title: 'Crystal Clear', artist: 'Acoustic Folk', duration: '3:28', isDonated: false },
    { id: '13', title: 'Electric Dreams', artist: 'EDM Collective', duration: '5:45', isDonated: true },
    { id: '14', title: 'Midnight Blues', artist: 'Blues Band', duration: '4:52', isDonated: false },
    { id: '15', title: 'Forest Echo', artist: 'Nature Sounds', duration: '8:15', isDonated: true }
  ]);
  
  const [ratings, setRatings] = useState<RatingCriteria[]>([
    { id: '1', name: 'Сведение', rating: 7 },
    { id: '2', name: 'Текст', rating: 8 },
    { id: '3', name: 'Флоу/Речетатив', rating: 6 },
    { id: '4', name: 'Харизма', rating: 9 },
    { id: '5', name: 'Ритмика/Структура', rating: 7 },
    { id: '6', name: 'Бит', rating: 8 },
    { id: '7', name: 'Общий Вайб', rating: 7 }
  ]);
  
  const [draggedTrack, setDraggedTrack] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const updateRating = (criteriaId: string, newRating: number) => {
    setRatings(prev => prev.map(criteria => 
      criteria.id === criteriaId ? { ...criteria, rating: newRating } : criteria
    ));
  };

  const getTotalRating = () => {
    return ratings.reduce((sum, criteria) => sum + criteria.rating, 0);
  };

  const getAverageRating = () => {
    return (getTotalRating() / ratings.length).toFixed(1);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleNext = () => {
    if (queue.length > 0) {
      setCurrentTrack(queue[0]);
      setQueue(prev => prev.slice(1));
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    // В реальном приложении здесь была бы история прослушанных треков
    alert('Previous track feature coming soon!');
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const toggleDonation = (trackId: string) => {
    setQueue(prev => prev.map(track => 
      track.id === trackId ? { ...track, isDonated: !track.isDonated } : track
    ));
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
    // В реальном приложении здесь была бы логика воспроизведения
  };

  const handleDragStart = (e: React.DragEvent, trackId: string) => {
    setDraggedTrack(trackId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedTrack) {
      const draggedIndex = queue.findIndex(track => track.id === draggedTrack);
      
      if (draggedIndex !== -1 && draggedIndex !== targetIndex) {
        const newQueue = [...queue];
        const [draggedItem] = newQueue.splice(draggedIndex, 1);
        newQueue.splice(targetIndex, 0, draggedItem);
        setQueue(newQueue);
      }
    }
    setDraggedTrack(null);
    setDragOverIndex(null);
  };

  const saveRating = () => {
    if (currentTrack) {
      const totalScore = getTotalRating();
      alert(`Rating saved for "${currentTrack.title}"!\nTotal Score: ${totalScore}/91\nAverage: ${getAverageRating()}/13`);
      // Здесь будет логика сохранения в базу данных
    }
  };

  return (
    <div className="player-page">
      {/* Основной контент - две колонки */}
      <main className="player-main">
        {/* Левая панель - очередь треков */}
        <div className="queue-panel">
          <div className="queue-header">
            <h2>Queue</h2>
            <span className="queue-count">{queue.length} tracks</span>
          </div>
          
          <div className="queue-list">
            {queue.map((track, index) => (
              <div
                key={track.id}
                className={`queue-item ${draggedTrack === track.id ? 'dragging' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, track.id)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onClick={() => playTrack(track)}
              >
                <div className="track-info">
                  <div className="track-meta">
                    <span className="track-number">{index + 1}</span>
                    <div className="track-details">
                      <h4 className="track-title">{track.title}</h4>
                      <p className="track-artist">{track.artist}</p>
                    </div>
                  </div>
                </div>
                
                <div className="track-right">
                  <div className="track-duration">{track.duration}</div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDonation(track.id);
                    }}
                    className={`donation-btn ${track.isDonated ? 'donated' : ''}`}
                    title={track.isDonated ? 'Remove donation' : 'Mark as donated'}
                  >
                    💰
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Центральная панель - критерии оценивания */}
        <div className="rating-panel">
          <div className="criteria-container">
            {ratings.map((criteria) => (
              <div key={criteria.id} className="criteria-card">
                <div className="criteria-header">
                  <h3 className="criteria-name">{criteria.name}</h3>
                  <span className="criteria-rating">{criteria.rating}/13</span>
                </div>
                
                <div className="rating-controls">
                  <input
                    type="range"
                    min="1"
                    max="13"
                    value={criteria.rating}
                    onChange={(e) => updateRating(criteria.id, parseInt(e.target.value))}
                    className="rating-slider"
                  />
                  <div className="rating-labels">
                    <span>1</span>
                    <span>7</span>
                    <span>13</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rating-summary">
            <div className="summary-left">
              <span className="avg-label">Average Rating:</span>
              <span className="avg-value">{getAverageRating()}/13</span>
            </div>
            <button onClick={saveRating} className="save-rating-btn">
              💾 Save
            </button>
          </div>
        </div>

        {/* Правая панель - пустое пространство */}
        <div className="empty-panel">
        </div>
      </main>

      {/* Нижний плеер - черно-бело-серые тона */}
      <div className="bottom-player">
        <div className="player-left">
          <div className="track-info-large">
            <div className="track-details-large">
              <h3 className="track-title-large">{currentTrack?.title}</h3>
              <p className="track-artist-large">{currentTrack?.artist}</p>
            </div>
          </div>
        </div>

        <div className="player-center">
          <div className="player-controls">
            <button className="control-btn prev-btn" onClick={handlePrev}>
              ⏮
            </button>
            <button className="control-btn play-btn" onClick={handlePlayPause}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="control-btn next-btn" onClick={handleNext}>
              ⏭
            </button>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '35%' }}></div>
          </div>
        </div>

        <div className="player-right">
          <div className="volume-control">
            <span className="volume-icon">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <span className="volume-value">{volume}%</span>
          </div>
        </div>
      </div>

      {/* Скрытый аудио элемент */}
      <audio ref={audioRef} src="" />
    </div>
  );
};

export default PlayerPage;
