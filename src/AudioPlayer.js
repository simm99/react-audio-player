import React, { useRef, useState, useEffect } from 'react';

const AudioPlayer = ({ track }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // När en ny låt väljs, pausas den föregående och startar den nya
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();  // Laddar det nya spåret
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [track]);

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
    const skipTime = 10;  // Skippa 10 sekunder framåt/bakåt
    audioRef.current.currentTime += direction === 'forward' ? skipTime : -skipTime;
  };

  const handleScrub = (event) => {
    const scrubTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = scrubTime;
    setCurrentTime(scrubTime);
  };

  return (
    <div className="audio-player">
      <h2>{track.title}</h2>
      <h3>{track.artist}</h3>
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div>
        <button onClick={playPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={() => handleSkip('back')}>Back 10s</button>
        <button onClick={() => handleSkip('forward')}>Forward 10s</button>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleScrub}
        />
        <span>{Math.floor(currentTime)} / {Math.floor(duration)} seconds</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
