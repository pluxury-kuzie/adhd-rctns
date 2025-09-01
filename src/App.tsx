import React, { useState, useRef } from 'react';
import './App.css';

interface Track {
  id: string;
  name: string;
  artist: string;
  rating: number;
  notes: string;
  date: string;
}

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  // const audioRef = useRef<HTMLAudioElement>(null);

  const addTrack = (track: Omit<Track, 'id' | 'date'>) => {
    const newTrack: Track = {
      ...track,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ru-RU')
    };
    setTracks([...tracks, newTrack]);
    setShowAddForm(false);
  };

  const updateRating = (id: string, rating: number) => {
    setTracks(tracks.map(track => 
      track.id === id ? { ...track, rating } : track
    ));
  };

  const deleteTrack = (id: string) => {
    setTracks(tracks.filter(track => track.id !== id));
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // Здесь можно добавить логику для загрузки аудио файла
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🎵 Оценщик Треков</h1>
        <p>Оценивай музыку и веди дневник своих впечатлений</p>
      </header>

      <main className="main">
        <div className="controls">
          <button 
            className="add-button"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? '❌ Отмена' : '➕ Добавить трек'}
          </button>
        </div>

        {showAddForm && (
          <AddTrackForm onSubmit={addTrack} />
        )}

        {currentTrack && (
          <div className="player">
            <h3>🎧 Сейчас играет: {currentTrack.name}</h3>
            <p>Исполнитель: {currentTrack.artist}</p>
            <div className="player-controls">
              <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? '⏸️ Пауза' : '▶️ Играть'}
              </button>
              <button onClick={() => setCurrentTrack(null)}>⏹️ Стоп</button>
            </div>
          </div>
        )}

        <div className="tracks-list">
          <h2>📋 Список треков ({tracks.length})</h2>
          {tracks.length === 0 ? (
            <p className="empty-state">Пока нет треков. Добавь первый!</p>
          ) : (
            tracks.map(track => (
              <TrackCard
                key={track.id}
                track={track}
                onRatingChange={updateRating}
                onDelete={deleteTrack}
                onPlay={playTrack}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

interface AddTrackFormProps {
  onSubmit: (track: Omit<Track, 'id' | 'date'>) => void;
}

function AddTrackForm({ onSubmit }: AddTrackFormProps) {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && artist.trim()) {
      onSubmit({ name: name.trim(), artist: artist.trim(), rating, notes });
      setName('');
      setArtist('');
      setRating(5);
      setNotes('');
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>➕ Новый трек</h3>
      <div className="form-group">
        <label>Название трека:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите название трека"
          required
        />
      </div>
      <div className="form-group">
        <label>Исполнитель:</label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Введите имя исполнителя"
          required
        />
      </div>
      <div className="form-group">
        <label>Оценка: {rating}/10</label>
        <input
          type="range"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="rating-slider"
        />
      </div>
      <div className="form-group">
        <label>Заметки:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ваши впечатления о треке..."
          rows={3}
        />
      </div>
      <button type="submit" className="submit-button">💾 Сохранить</button>
    </form>
  );
}

interface TrackCardProps {
  track: Track;
  onRatingChange: (id: string, rating: number) => void;
  onDelete: (id: string) => void;
  onPlay: (track: Track) => void;
}

function TrackCard({ track, onRatingChange, onDelete, onPlay }: TrackCardProps) {
  return (
    <div className="track-card">
      <div className="track-info">
        <h3>{track.name}</h3>
        <p className="artist">🎤 {track.artist}</p>
        <p className="date">📅 {track.date}</p>
        {track.notes && <p className="notes">💭 {track.notes}</p>}
      </div>
      
      <div className="track-rating">
        <label>Оценка: {track.rating}/10</label>
        <input
          type="range"
          min="1"
          max="10"
          value={track.rating}
          onChange={(e) => onRatingChange(track.id, Number(e.target.value))}
          className="rating-slider"
        />
      </div>

      <div className="track-actions">
        <button onClick={() => onPlay(track)} className="play-button">
          ▶️ Играть
        </button>
        <button onClick={() => onDelete(track.id)} className="delete-button">
          🗑️ Удалить
        </button>
      </div>
    </div>
  );
}

export default App;
