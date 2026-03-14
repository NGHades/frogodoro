import React, { useState, useEffect, useContext } from "react";
import profileFrog from "../assets/profileFrog.svg";
import profileFrogGray from "../assets/profileFrog-gray.svg";
import { BackgroundContext } from "../App";
import { AuthContext } from "../context/AuthContext";
import {
  createUserProfile,
  saveUserSettings,
} from "../services/firestoreService";

export default function Settings({
  currentSettings,
  onClose,
  onSettingsUpdate,
}) {
  const { background, setBackground, backgroundsData } =
    useContext(BackgroundContext);
  const { currentUser, login, signup, logout } = useContext(AuthContext);

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
  const [accountMode, setAccountMode] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Sync Settings form values when currentSettings prop changes (from Timer)
  useEffect(() => {
    setPomodoroTime(currentSettings.pomodoroTime);
    setShortBreakTime(currentSettings.shortBreakTime);
    setLongBreakTime(currentSettings.longBreakTime);
    setAutoStartPomodoros(currentSettings.autoStartPomodoros);
    setAutoStartBreaks(currentSettings.autoStartBreaks);
  }, [currentSettings]);

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
      background,
    };

    // Save to Firestore if user is logged in (but don't wait for it)
    if (currentUser) {
      saveUserSettings(currentUser.uid, newSettings).catch((error) =>
        console.error("Failed to save settings to Firestore:", error),
      );
    }

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

  // Auth handlers
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (accountMode === "login") {
      try {
        await login(email, password);
        setEmail("");
        setPassword("");
      } catch (err) {
        setAuthError(err.message);
      }
    } else {
      // Signup mode
      if (password !== confirmPassword) {
        setAuthError("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        setAuthError("Password must be at least 6 characters");
        return;
      }
      try {
        const result = await signup(email, password);
        await createUserProfile(result.user.uid, email);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (err) {
        setAuthError(err.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAuthError("");
    } catch (err) {
      setAuthError(err.message);
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
                onClick={() => setActiveTab("background")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                  activeTab === "background"
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
                background
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
          <div className="flex-1 p-8 overflow-y-auto">
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

            {activeTab === "background" && (
              <div>
                <h3 className="text-2xl font-medium text-gray-700 mb-6">
                  Background Selection
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {backgroundsData?.map((bg) => (
                    <div
                      key={bg.id}
                      onClick={() => setBackground(bg.id)}
                      className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all hover:scale-105 ${
                        background === bg.id
                          ? "border-frogGreen shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={bg.image}
                          alt={bg.name}
                          className="w-full h-40 object-cover"
                        />
                        {background === bg.id && (
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
                        <h4 className="font-medium text-gray-700">{bg.name}</h4>
                        <p className="text-sm text-gray-500">
                          {bg.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Click on a background to select it. Changes are saved
                  automatically.
                </p>
              </div>
            )}

            {activeTab === "account" && (
              <div>
                {currentUser ? (
                  // Logged in view
                  <div className="space-y-6">
                    <h3 className="text-2xl font-medium text-gray-700">
                      Account
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-600 mb-2">
                        <span className="font-extralight">Email:</span>{" "}
                        {currentUser.email}
                      </p>
                      <p className="text-gray-600 text-sm">
                        You are logged in and your stats are being saved to
                        Firestore.
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  // Guest mode - show login/signup
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium text-gray-700 mb-6">
                      {accountMode === "login"
                        ? "Login to Frogodoro"
                        : "Create Account"}
                    </h3>

                    {authError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {authError}
                      </div>
                    )}

                    <form onSubmit={handleAuthSubmit} className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      {accountMode === "signup" && (
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        {accountMode === "login" ? "Login" : "Sign Up"}
                      </button>
                    </form>

                    <div className="text-center pt-4 border-t">
                      <p className="text-gray-600 text-sm mb-2">
                        {accountMode === "login"
                          ? "Don't have an account?"
                          : "Already have an account?"}
                      </p>
                      <button
                        onClick={() => {
                          setAccountMode(
                            accountMode === "login" ? "signup" : "login",
                          );
                          setAuthError("");
                          setEmail("");
                          setPassword("");
                          setConfirmPassword("");
                        }}
                        className="text-green-500 hover:underline font-medium"
                      >
                        {accountMode === "login"
                          ? "Sign up here"
                          : "Login instead"}
                      </button>
                    </div>

                    <p className="text-gray-500 text-sm pt-4 border-t">
                      You can use Frogodoro as a guest without creating an
                      account, but your stats won't be saved.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
