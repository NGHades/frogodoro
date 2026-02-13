import React from "react";

const Button = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-48 h-20
                text-white
                text-2xl
                bg-white/25
                border-3 border-white
                font-semibold
                rounded-full
                shadow-lg
                hover:bg-transparent
                hover:text-white
                active:scale-95
                transition-all
                flex items-center justify-center
                `}
    >
      {children}
    </button>
  );
};

export default Button;
