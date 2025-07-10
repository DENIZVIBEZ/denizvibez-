import React from 'react';

interface WaveDividerProps {
  className?: string;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ className }) => {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px )] h-[150px]" // Hier ist der korrigierte className
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#2E3B55" // Direkte Farbzuweisung
          ></path>
        </svg>
    </div>
  );
};

export default WaveDivider;
