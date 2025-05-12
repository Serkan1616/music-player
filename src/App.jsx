import { useRef, useState, useEffect } from "react";
import "./App.css";
import stop_play from "./assets/Stop_and_play_fill.svg";
import stop_play_reverse from "./assets/Stop_and_play_fill-1.svg";
import pause from "./assets/pause.svg";
import play_button from "./assets/play-buttton.svg";

function App() {
  const songs = [
    {
      title: "Yiğidim Aslanım",
      author: "Serkan Durmaz",
      src: "/covers/yigidim.mp3",
      img: "/pictures/img1.jpg",
    },
    {
      title: "Canon in D",
      author: "Serkan Durmaz",
      src: "/covers/canond.mp3",
      img: "/pictures/img3.jpg",
    },
    {
      title: "I Giorni",
      author: "Serkan Durmaz",
      src: "/covers/ı giorni.mp3",
      img: "/pictures/img2.jpg",
    },
    {
      title: "Solas",
      author: "Serkan Durmaz",
      src: "/covers/solas.mp3",
      img: "/pictures/img4.jpg",
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
    <div className="flex justify-center items-center min-h-screen bg-[radial-gradient(circle_at_center,_#ffffff_10%,_#333333_70%,_#000000_100%)] font-sora">
      <div className="flex flex-col justify-center items-center gap-5 w-[350px] h-[500px] rounded-2xl bg-[#111315eb] p-4 shadow-lg">
        <div className="relative h-[275px] w-[300px] rounded-2xl overflow-hidden">
          <img
            className="h-full w-full object-cover brightness-[0.7]"
            src={currentSong.img}
            alt={currentSong.title}
          />
        </div>
        <div className="text-center">
          <h1 className="text-[#F1F2F6] text-[16px] font-semibold">
            {currentSong.title}
          </h1>
          <p className="text-[#a1a1aa] text-[12px]">{currentSong.author}</p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between text-[#a1a1aa] text-[10px]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            value={progress}
            onChange={handleProgressChange}
            className="w-full accent-[#3F51B5] h-[4px] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button className="cursor-pointer" onClick={playPrev}>
            <img src={stop_play_reverse} alt="Prev" />
          </button>
          <button
            onClick={togglePlay}
            className="bg-[#3F51B5] rounded-full flex justify-center items-center cursor-pointer p-3 shadow-[0px_8px_16px_rgba(63,81,181,0.25)]"
          >
            <img
              src={isPlaying ? pause : play_button}
              alt={isPlaying ? "Pause" : "Play"}
              className="w-3 h-3"
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
