export default function TimerModeButton({ mode, currentMode, onModeChange, children, className = "" }) {
  const isActive = mode === currentMode;
  
  const handleClick = () => {
    onModeChange(mode);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`
        font-jersey rounded-2xl flex flex-row items-center justify-center 
        shadow-lg px-4 py-2.5 transition-all duration-200 hover:scale-105
        ${isActive 
          ? 'bg-frogWhite text-frogGreen ring-2 ring-frogGreen hover:bg-frogGreen hover:text-frogWhite' 
          : 'bg-frogGreen text-frogWhite hover:bg-frogWhite hover:text-frogGreen'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}