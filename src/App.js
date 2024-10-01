import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import './App.css';

const tracks = [
  {
    title: "Calming Forest",
    artist: "Nature Sounds",
    src: "calming_forest.mp3",
    background: "calming_forest_picture.jpg",
  },
  {
    title: "Beaver Creek",
    artist: "Aso, Middle School, Aviino",
    src: "beaver-creek.mp3",
    background: "beaver.jpg",
  },
  {
    title: "Sunrise",
    artist: "Morning Vibes",
    src: "sunrise.mp3",
    background: "sunrise.jpg",
  }
];

function App() {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);

  const changeTrack = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${require(`./assets/${currentTrack.background}`)})` }}>
      <div className="sidebar">
        <h2>Library</h2>
        <ul>
          {tracks.map((track, index) => (
            <li key={index} onClick={() => changeTrack(track)}>
              {track.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="main">
        <h1>Vibes</h1>
        <AudioPlayer track={currentTrack} />
      </div>
    </div>
  );
}

export default App;
