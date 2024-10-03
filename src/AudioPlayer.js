import React, { useRef, useState, useEffect } from 'react';
import beaverImage from './assets/beaver.jpg';
import forestImage from './assets/calming_forest_picture.jpg';
import sunriseImage from './assets/sunrise.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const trackImages = {
  "Calming Forest": forestImage,
  "Beaver Creek": beaverImage,
  "Sunrise": sunriseImage,
};

const AudioPlayer = ({ track, tracks, setCurrentTrack }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
      audioRef.current.volume = volume;
    }
  }, [track, volume]);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSkip = (direction) => {
    const currentIndex = tracks.indexOf(track);
    if (direction === 'next') {
      const nextTrack = (currentIndex + 1) % tracks.length;
      setCurrentTrack(tracks[nextTrack]);
    } else if (direction === 'prev') {
      const prevTrack = (currentIndex - 1 + tracks.length) % tracks.length;
      setCurrentTrack(tracks[prevTrack]);
    }
  };

  const handleScrub = (event) => {
    const scrubTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = scrubTime;
    setCurrentTime(scrubTime);
  };

  return (
    <div className="audio-player">
      <img src={trackImages[track.title]} alt={track.title} className="track-image" />
      <h2>{track.title}</h2>
      <h3>{track.artist}</h3>
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div>
        <button onClick={() => handleSkip('prev')}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button onClick={playPause}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button onClick={() => handleSkip('next')}>
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleScrub}
          style={{ flexGrow: 1 }} // Allow the timeline to take full width
        />
        <button onClick={() => setShowVolumeControl(!showVolumeControl)}>
          <FontAwesomeIcon icon={faVolumeUp} />
        </button>
        {showVolumeControl && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => {
                const newVolume = e.target.value;
                setVolume(newVolume);
                audioRef.current.volume = newVolume;
              }}
              style={{ marginRight: '5px' }} // Space between slider and percentage
            />
            <span>{Math.round(volume * 100)}%</span> {/* Show volume percentage */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
