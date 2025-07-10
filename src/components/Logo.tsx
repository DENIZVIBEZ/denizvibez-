import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DENIZVIBEZ Logo"
    >
      <text
        x="0"
        y="30"
        fontFamily="Cinzel, serif"
        fontSize="32"
        fontWeight="700"
        fill="currentColor"
      >
        DENIZVIBEZ
      </text>
    </svg>
   );
};

export default Logo;
