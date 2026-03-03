import { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import RefreshButton from "./RefreshButton";
import VolumeButton from "./VolumeButton";
import SettingsButton from "./SettingsButton";
import Settings from "./Settings";
import PomodoroButton from "./PomodoroButton";
import ShortBreakButton from "./ShortBreakButton";
import LongBreakButton from "./LongBreakButton";
import frogJump from "../assets/frog-jump.gif";
import frogIdle from "../assets/frog-idle.gif";

export default function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [cycles, setCycles] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  function countdown() {
    let totalTime;
    if (mode === "focus") {
      totalTime = 25 * 60;
    } else if (mode === "shortBreak") {
      totalTime = 5 * 60;
    } else if (mode === "longBreak") {
      totalTime = 15 * 60;
    } else {
      totalTime = 25 * 60;
    }
    const elapsed = totalTime - time;
    return (elapsed / totalTime) * 100;
  }

  function reset() {
    let initialTime;
    if (mode === "focus") {
      initialTime = 25 * 60; // 25 minutes for focus
    } else if (mode === "shortBreak") {
      initialTime = 5 * 60; // 5 minutes for short break
    } else if (mode === "longBreak") {
      initialTime = 15 * 60; // 15 minutes for long break
    } else {
      initialTime = 25 * 60; // default to focus
    }
    setTime(initialTime);
    setIsRunning(false);
  }

  function handleModeChange(newMode) {
    setMode(newMode);
    setIsRunning(false);
    // Set time based on new mode
    let initialTime;
    if (newMode === "focus") {
      initialTime = 25 * 60;
    } else if (newMode === "shortBreak") {
      initialTime = 5 * 60;
    } else if (newMode === "longBreak") {
      initialTime = 15 * 60;
    }
    setTime(initialTime);
  }

  function formatTime() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="font-jersey flex flex-col items-center">
      <div className="flex flex-row justify-center gap-4 mb-6">
        <PomodoroButton 
          currentMode={mode} 
          onModeChange={handleModeChange}
        />
        <ShortBreakButton 
          currentMode={mode} 
          onModeChange={handleModeChange}
        />
        <LongBreakButton 
          currentMode={mode} 
          onModeChange={handleModeChange}
        />
      </div>
      <div className="w-32 h-20 mx-auto overflow-hidden">
        <img
          src={isRunning ? frogJump : frogIdle}
          alt={isRunning ? "Jumping frog" : "Idle frog"}
          className="w-32 h-32 object-cover object-top"
        />
      </div>
      <div className="w-75 h-75 mx-auto">
        <CircularProgressbar
          value={countdown()}
          text={formatTime()}
          styles={buildStyles({
            textColor: "#373737",
            pathColor: "#58AF79",
            trailColor: "#FFFFFF",
            textSize: "32px",
          })}
        />
      </div>
      <div className="flex flex-row justify-center gap-4 py-16">
        <PlayButton 
          isPlaying={isRunning} 
          onClick={() => setIsRunning(!isRunning)} 
        />
        <RefreshButton onClick={reset} />
        <VolumeButton />
        <SettingsButton onClick={() => setShowSettings(true)} />
      </div>
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
