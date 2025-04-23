import { useRef, useState, useEffect } from "react";
import "./App.css";
import cover_1 from "./assets/cover-1.jpg";
import cover_2 from "./assets/cover-2.jpg";
import song_1 from "./assets/forest-lullaby-110624.mp3";
import song_2 from "./assets/lost-in-city-lights-145038.mp3";
import stop_play from "./assets/Stop_and_play_fill.svg";
import stop_play_reverse from "./assets/Stop_and_play_fill-1.svg";
import Play_fill from "./assets/Play_fill.svg";

function App() {
  const songs = [
    {
      title: "Lost in the City Lights",
      author: "Cosmo Sheldrake",
      src: song_1,
      img: cover_1,
    },
    {
      title: "Forest Lullaby",
      author: "Lesfm",
      src: song_2,
      img: cover_2,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;

    if (!isNaN(current) && !isNaN(total) && total > 0) {
      setCurrentTime(current);
      setDuration(total);
      const progressPercent = (current / total) * 100;
      setProgress(progressPercent);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('/gradient-bg.jpg')] bg-cover bg-no-repeat bg-center font-sora">
      <div className="flex flex-col justify-center items-center gap-5 w-[350px] h-[500px] rounded-2xl bg-[#212936] p-4">
        <img
          className="h-[275px] w-[300px] rounded-2xl object-cover"
          src={currentSong.img}
          alt={currentSong.title}
        />
        <div className="text-center">
          <h1 className="text-[#E5E7EB] text-[16px] font-semibold">
            {currentSong.title}
          </h1>
          <p className="text-[#e5e7eb63] text-[12px]">{currentSong.author}</p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between text-[#e5e7eb63] text-[10px]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            value={progress}
            onChange={handleProgressChange}
            className="w-full accent-[#C93B76]  h-[4px]  cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button className="cursor-pointer" onClick={playPrev}>
            <img src={stop_play_reverse} alt="Prev" />
          </button>
          <button
            onClick={togglePlay}
            className="bg-[#C93B76] rounded-full cursor-pointer p-3 shadow-[0px_8px_16px_rgba(201,59,118,0.25)]"
          >
            <img
              src={Play_fill}
              alt="Play"
              className={`w-6 h-6 ${isPlaying ? "rotate-360" : ""}`}
            />
          </button>
          <button className="cursor-pointer" onClick={playNext}>
            <img src={stop_play} alt="Next" />
          </button>
        </div>
        <audio
          ref={audioRef}
          src={currentSong.src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNext}
        />
      </div>
    </div>
  );
}

export default App;
