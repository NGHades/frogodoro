import React, { useState, useEffect, useContext } from "react";
import profileFrog from "../assets/profileFrog.svg";
import profileFrogGray from "../assets/profileFrog-gray.svg";
import { BackgroundContext } from "../App";
import riverLandscape from "../assets/backgrounds/riverLandscape.jpg";
import swamp from "../assets/backgrounds/swamp.gif";

export default function Settings({
  currentSettings,
  onClose,
  onSettingsUpdate,
}) {
  const { background, setBackground } = useContext(BackgroundContext);

  const [pomodoroTime, setPomodoroTime] = useState(
    currentSettings.pomodoroTime,
  );
  const [shortBreakTime, setShortBreakTime] = useState(
    currentSettings.shortBreakTime,
  );
  const [longBreakTime, setLongBreakTime] = useState(
    currentSettings.longBreakTime,
  );
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(
    currentSettings.autoStartPomodoros,
  );
  const [autoStartBreaks, setAutoStartBreaks] = useState(
    currentSettings.autoStartBreaks,
  );
  const [activeTab, setActiveTab] = useState("timer");

  const [selectedBackground, setSeltectedBackground] = useState(
    currentSettings.background || "riverLandscape",
  );

  const backgrounds = [
    {
      id: "riverLandscape",
      name: "River Landscape",
      file: ".assets/backgrounds/riverLandscape.jpg",
    },
    { id: "swamp", name: "Swamp", file: "assets/backgrounds/swamp.gif" },
  ];

  // Validation state
  const isValidInput = () => {
    return pomodoroTime > 0 && shortBreakTime > 0 && longBreakTime > 0;
  };

  // Function to handle closing and updating settings
  const handleClose = () => {
    // Only close if all inputs are valid
    if (!isValidInput()) {
      return;
    }

    const newSettings = {
      pomodoroTime: parseInt(pomodoroTime),
      shortBreakTime: parseInt(shortBreakTime),
      longBreakTime: parseInt(longBreakTime),
      autoStartPomodoros,
      autoStartBreaks,
    };
    onSettingsUpdate(newSettings);
  };

  // Handle input changes with validation
  const handlePomodoroChange = (e) => {
    const value = e.target.value;
    if (value === "" || parseInt(value) >= 1) {
      setPomodoroTime(value);
    }
  };

  const handleShortBreakChange = (e) => {
    const value = e.target.value;
    if (value === "" || parseInt(value) >= 1) {
      setShortBreakTime(value);
    }
  };

  const handleLongBreakChange = (e) => {
    const value = e.target.value;
    if (value === "" || parseInt(value) >= 1) {
      setLongBreakTime(value);
    }
  };

  // Handle escape key to close settings
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isValidInput()) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    autoStartPomodoros,
    autoStartBreaks,
  ]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="font-jersey fixed inset-0 bg-black/25 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={(e) => {
        // Close when clicking on backdrop, but only if inputs are valid
        if (e.target === e.currentTarget && isValidInput()) {
          handleClose();
        }
      }}
    >
      <div className="bg-white rounded-xl p-0 w-150 h-100 shadow-2xl overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-48 bg-gray-50 p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-frogGreen mb-8">
              preferences
            </h2>

            <div className="space-y-4 flex-1">
              <button
                onClick={() => setActiveTab("timer")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                  activeTab === "timer"
                    ? "bg-green-100 text-frogGreen"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                timer
              </button>

              <button
                onClick={() => setActiveTab("appearance")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                  activeTab === "appearance"
                    ? "bg-green-100 text-frogGreen"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" />
                </svg>
                appearance
              </button>

              <button
                onClick={() => setActiveTab("account")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                  activeTab === "account"
                    ? "bg-green-100 text-frogGreen"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <img
                  src={activeTab === "account" ? profileFrog : profileFrogGray}
                  alt="Profile Frog"
                  className="w-5 h-5"
                />
                account
              </button>
            </div>

            <button
              onClick={handleClose}
              disabled={!isValidInput()}
              className={`mt-auto px-4 py-2 rounded-lg transition-colors ${
                isValidInput()
                  ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              close
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {activeTab === "timer" && (
              <div className="space-y-6 max-w-md">
                {/* Time Settings */}
                <div className="flex gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-2">
                      pomodoro
                    </label>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                      <input
                        type="number"
                        min="1"
                        value={pomodoroTime}
                        onChange={handlePomodoroChange}
                        className="bg-transparent text-lg font-medium w-8 text-center outline-none"
                      />
                      <span className="text-gray-500">minutes</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-2">
                      short break
                    </label>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                      <input
                        type="number"
                        min="1"
                        value={shortBreakTime}
                        onChange={handleShortBreakChange}
                        className="bg-transparent text-lg font-medium w-8 text-center outline-none"
                      />
                      <span className="text-gray-500">minutes</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-2">
                      long break
                    </label>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                      <input
                        type="number"
                        min="1"
                        value={longBreakTime}
                        onChange={handleLongBreakChange}
                        className="bg-transparent text-lg font-medium w-8 text-center outline-none"
                      />
                      <span className="text-gray-500">minutes</span>
                    </div>
                  </div>
                </div>

                {/* Error message for invalid inputs */}
                {!isValidInput() && (
                  <div className="text-frogGreen text-sm mt-2">
                    Please input valid, positive numbers.
                  </div>
                )}

                {/* Toggle Settings */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">auto start pomodoros</span>
                    <button
                      onClick={() => setAutoStartPomodoros(!autoStartPomodoros)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        autoStartPomodoros ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          autoStartPomodoros
                            ? "translate-x-6"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">auto start breaks</span>
                    <button
                      onClick={() => setAutoStartBreaks(!autoStartBreaks)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        autoStartBreaks ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          autoStartBreaks ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Background Selection
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {/* River Landscape */}
                  <div
                    onClick={() => setBackground("riverLandscape")}
                    className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all hover:scale-105 ${
                      background === "riverLandscape"
                        ? "border-frogGreen shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={riverLandscape}
                        alt="River Landscape"
                        className="w-full h-40 object-cover"
                      />
                      {background === "riverLandscape" && (
                        <div className="absolute top-2 right-2 bg-frogGreen text-white rounded-full p-1">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-white">
                      <h4 className="font-semibold text-gray-800">
                        River Landscape
                      </h4>
                      <p className="text-sm text-gray-500">
                        Peaceful river scene
                      </p>
                    </div>
                  </div>

                  {/* Swamp */}
                  <div
                    onClick={() => setBackground("swamp")}
                    className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all hover:scale-105 ${
                      background === "swamp"
                        ? "border-frogGreen shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={swamp}
                        alt="Swamp"
                        className="w-full h-40 object-cover"
                      />
                      {background === "swamp" && (
                        <div className="absolute top-2 right-2 bg-frogGreen text-white rounded-full p-1">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-white">
                      <h4 className="font-semibold text-gray-800">Swamp</h4>
                      <p className="text-sm text-gray-500">
                        Animated swamp scene
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Click on a background to select it. Changes are saved
                  automatically.
                </p>
              </div>
            )}

            {activeTab === "account" && (
              <div className="text-gray-600">
                <h3 className="text-lg font-medium mb-4">Account Settings</h3>
                <p>User account management coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
