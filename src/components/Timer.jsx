import React, { useState, useEffect } from "react";

const Timer = ({ mode = "pomodoro", isRunning, setIsRunning }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  // Timer durations in minutes
  const durations = {
    pomodoro: 30,
    shortBreak: 10,
    longBreak: 25,
  };

  useEffect(() => {
    setTimeLeft(durations[mode] * 60); // Convert to seconds
  }, [mode]);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, setIsRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-[#F2E6C9] text-[12rem] font-bold leading-none">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;
