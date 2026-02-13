import React, { useState, useEffect } from 'react';

const Timer = ({ mode = 'pomodoro' }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Timer durations in minutes
    const durations = {
        pomodoro: 30,
        shortBreak: 10,
        longBreak: 25
    };

    useEffect(() => {
        setTimeLeft(durations[mode] * 60); // Convert to seconds
    }, [mode]);

    useEffect(() => {
        let interval = null;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="text-white text-8xl font-bold font-mono">
                {formatTime(timeLeft)}
            </div>
            <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-8 py-4 bg-white/25 border-2 border-white text-white text-xl font-semibold rounded-full hover:bg-white/40 transition-all"
            >
                {isRunning ? 'Pause' : 'Start'}
            </button>
        </div>
    );
};

export default Timer 