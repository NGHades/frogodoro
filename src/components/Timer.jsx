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
  // Load settings from localStorage or use defaults
  const loadTimerSettings = () => {
    const saved = localStorage.getItem("frogodoro-settings");
    return saved
      ? JSON.parse(saved)
      : {
          pomodoroTime: 25,
          shortBreakTime: 5,
          longBreakTime: 15,
          autoStartPomodoros: false,
          autoStartBreaks: false,
          background: "riverLandscape",
        };
  };

  const [timerSettings, setTimerSettings] = useState(loadTimerSettings);
  const [time, setTime] = useState(timerSettings.pomodoroTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [cycles, setCycles] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("frogodoro-settings", JSON.stringify(timerSettings));
  }, [timerSettings]);

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

  // Handle auto-starting next session when timer completes
  useEffect(() => {
    if (time === 0 && !isRunning) {
      // Timer just completed
      if (mode === "focus") {
        // Pomodoro completed, increment cycles
        const newCycles = cycles + 1;
        setCycles(newCycles);

        // Determine which break to take
        const nextMode = newCycles % 4 === 0 ? "longBreak" : "shortBreak";
        const nextTime =
          nextMode === "longBreak"
            ? timerSettings.longBreakTime * 60
            : timerSettings.shortBreakTime * 60;

        setMode(nextMode);
        setTime(nextTime);

        // Auto-start break if enabled
        if (timerSettings.autoStartBreaks) {
          setIsRunning(true);
        }
      } else if (mode === "shortBreak" || mode === "longBreak") {
        // Break completed, switch to focus
        const nextTime = timerSettings.pomodoroTime * 60;
        setMode("focus");
        setTime(nextTime);

        // Auto-start pomodoro if enabled
        if (timerSettings.autoStartPomodoros) {
          setIsRunning(true);
        }
      }
    }
  }, [time, isRunning, mode, cycles, timerSettings]);

  function countdown() {
    let totalTime;
    if (mode === "focus") {
      totalTime = timerSettings.pomodoroTime * 60;
    } else if (mode === "shortBreak") {
      totalTime = timerSettings.shortBreakTime * 60;
    } else if (mode === "longBreak") {
      totalTime = timerSettings.longBreakTime * 60;
    } else {
      totalTime = timerSettings.pomodoroTime * 60;
    }
    const elapsed = totalTime - time;
    return (elapsed / totalTime) * 100;
  }

  function reset() {
    let initialTime;
    if (mode === "focus") {
      initialTime = timerSettings.pomodoroTime * 60;
    } else if (mode === "shortBreak") {
      initialTime = timerSettings.shortBreakTime * 60;
    } else if (mode === "longBreak") {
      initialTime = timerSettings.longBreakTime * 60;
    } else {
      initialTime = timerSettings.pomodoroTime * 60;
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
      initialTime = timerSettings.pomodoroTime * 60;
    } else if (newMode === "shortBreak") {
      initialTime = timerSettings.shortBreakTime * 60;
    } else if (newMode === "longBreak") {
      initialTime = timerSettings.longBreakTime * 60;
    }
    setTime(initialTime);
  }

  function handleSettingsUpdate(newSettings) {
    setTimerSettings(newSettings);
    setShowSettings(false);
    // If the current mode's time changed, update the current timer
    let newTime;
    if (mode === "focus") {
      newTime = newSettings.pomodoroTime * 60;
    } else if (mode === "shortBreak") {
      newTime = newSettings.shortBreakTime * 60;
    } else if (mode === "longBreak") {
      newTime = newSettings.longBreakTime * 60;
    }
    if (newTime && !isRunning) {
      setTime(newTime);
    }
  }

  function formatTime() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="font-jersey flex flex-col items-center">
      <div className="flex flex-row justify-center gap-4 mb-6">
        <PomodoroButton currentMode={mode} onModeChange={handleModeChange} />
        <ShortBreakButton currentMode={mode} onModeChange={handleModeChange} />
        <LongBreakButton currentMode={mode} onModeChange={handleModeChange} />
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
      {showSettings && (
        <Settings
          currentSettings={timerSettings}
          onClose={() => setShowSettings(false)}
          onSettingsUpdate={handleSettingsUpdate}
        />
      )}
    </div>
  );
}
