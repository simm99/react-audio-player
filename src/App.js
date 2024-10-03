import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import './App.css';

const tracks = [
  {
    title: "Calming Forest",
    artist: "Nature Sounds",
    src: require('./assets/5minutesong.mp3'),
    background: "calming_forest_picture.jpg",
    image: "forest_image.jpg",
  },
  {
    title: "Beaver Creek",
    artist: "Aso, Middle School, Aviino",
    src: require('./assets/5minutelofi.mp3'),
    background: "beaver.jpg",
    image: "beaver_image.jpg",
  },
  {
    title: "Sunrise",
    artist: "Morning Vibes",
    src: require('./assets/5minutehappy.mp3'),
    background: "sunrise.jpg",
    image: "sunrise_image.jpg",
  }
];

function App() {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX <= 50) {
        setIsSidebarVisible(true);
      } else if (e.clientX > 250) {
        setIsSidebarVisible(false);
      }
    };
  
    window.addEventListener('mousemove', handleMouseMove);
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);  

  const changeTrack = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${require('./assets/black_stones.jpg')})` }}>
      <div className="overlay"></div>
      
      <div
        className="sidebar"
        style={{ transform: isSidebarVisible ? 'translateX(0)' : 'translateX(-250px)' }}
        onMouseEnter={() => setIsSidebarVisible(true)}
        onMouseLeave={() => setIsSidebarVisible(false)}
      >
        <h2>Library</h2>
        <ul>
          {tracks.map((track, index) => (
            <li 
              key={index} 
              onClick={() => changeTrack(track)} 
              style={{ cursor: 'pointer', padding: '10px', listStyle: 'none' }}
            >
              {track.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <h1>Vibes</h1>
        <AudioPlayer track={currentTrack} tracks={tracks} setCurrentTrack={setCurrentTrack} />
      </div>
    </div>
  );
}

export default App;
