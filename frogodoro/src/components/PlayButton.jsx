import { useState } from 'react';

export default function PlayButton(props) {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
        // Call the parent's onClick if provided
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <button 
            {...props}
            onClick={handleClick}
            className="w-16 h-16 bg-frogGreen hover:bg-frogWhite hover:text-frogGreen text-frogWhite rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
        >
            {isPlaying ? (
                // Pause SVG
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                </svg>
            ) : (
                // Play SVG
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-8 h-8 ml-1"
                >
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
            )}
        </button>
    );
}