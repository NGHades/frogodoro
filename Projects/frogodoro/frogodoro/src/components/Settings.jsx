import React, { useState, useEffect } from 'react';
import profileFrog from '../assets/profileFrog.svg';

export default function Settings({ onClose }) {
    const [pomodoroTime, setPomodoroTime] = useState(25);
    const [shortBreakTime, setShortBreakTime] = useState(5);
    const [longBreakTime, setLongBreakTime] = useState(15);
    const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);
    const [autoStartBreaks, setAutoStartBreaks] = useState(false);
    const [activeTab, setActiveTab] = useState('timer');

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="font-jersey fixed inset-0 bg-black/25 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-0 w-150 h-100 shadow-2xl overflow-hidden">
                <div className="flex h-full">
                    {/* Sidebar */}
                    <div className="w-48 bg-gray-50 p-6 flex flex-col">
                        <h2 className="text-2xl font-bold text-frogGreen mb-8">preferences</h2>
                        
                        <div className="space-y-4 flex-1">
                            <button 
                                onClick={() => setActiveTab('timer')}
                                className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                                    activeTab === 'timer' ? 'bg-green-100 text-frogGreen' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                timer
                            </button>
                            
                            <button 
                                onClick={() => setActiveTab('appearance')}
                                className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                                    activeTab === 'appearance' ? 'bg-green-100 text-frogGreen' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/>
                                </svg>
                                appearance
                            </button>
                            
                            <button 
                                onClick={() => setActiveTab('account')}
                                className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                                    activeTab === 'account' ? 'bg-green-100 text-frogGreen' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <img src={profileFrog} alt="Profile Frog" className="w-5 h-5" />
                                account
                            </button>
                        </div>
                        
                        <button 
                            onClick={onClose}
                            className="mt-auto bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            close
                        </button>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 p-8">
                        {activeTab === 'timer' && (
                            <div className="space-y-6">
                                {/* Time Settings */}
                                <div className="flex gap-6">
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600 mb-2">pomodoro</label>
                                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                                            <input 
                                                type="number" 
                                                value={pomodoroTime}
                                                onChange={(e) => setPomodoroTime(e.target.value)}
                                                className="bg-transparent text-lg font-medium w-12 text-center outline-none"
                                            />
                                            <span className="text-gray-500">minutes</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600 mb-2">short break</label>
                                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                                            <input 
                                                type="number" 
                                                value={shortBreakTime}
                                                onChange={(e) => setShortBreakTime(e.target.value)}
                                                className="bg-transparent text-lg font-medium w-12 text-center outline-none"
                                            />
                                            <span className="text-gray-500">minutes</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600 mb-2">long break</label>
                                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                                            <input 
                                                type="number" 
                                                value={longBreakTime}
                                                onChange={(e) => setLongBreakTime(e.target.value)}
                                                className="bg-transparent text-lg font-medium w-12 text-center outline-none"
                                            />
                                            <span className="text-gray-500">minutes</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Toggle Settings */}
                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700">auto start pomodoros</span>
                                        <button 
                                            onClick={() => setAutoStartPomodoros(!autoStartPomodoros)}
                                            className={`w-12 h-6 rounded-full transition-colors ${
                                                autoStartPomodoros ? 'bg-green-500' : 'bg-gray-300'
                                            }`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                                                autoStartPomodoros ? 'translate-x-6' : 'translate-x-0.5'
                                            }`} />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700">auto start breaks</span>
                                        <button 
                                            onClick={() => setAutoStartBreaks(!autoStartBreaks)}
                                            className={`w-12 h-6 rounded-full transition-colors ${
                                                autoStartBreaks ? 'bg-green-500' : 'bg-gray-300'
                                            }`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                                                autoStartBreaks ? 'translate-x-6' : 'translate-x-0.5'
                                            }`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'appearance' && (
                            <div className="text-gray-600">
                                <h3 className="text-lg font-medium mb-4">Appearance Settings</h3>
                                <p>Theme and visual customization options coming soon...</p>
                            </div>
                        )}
                        
                        {activeTab === 'account' && (
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