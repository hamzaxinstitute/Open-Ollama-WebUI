import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="speechGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#60A5FA', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#8B5CF6', stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        {/* Speech bubble background */}
        <path d="M8 4C8 2.89543 8.89543 2 10 2H26C27.1046 2 28 2.89543 28 4V20C28 21.1046 27.1046 22 26 22H18L14 26L12 24L10 22C8.89543 22 8 21.1046 8 20V4Z" fill="url(#speechGradient)" />
        
        {/* Speech bubble pointer */}
        <path d="M10 22L6 26L8 24L10 22Z" fill="url(#speechGradient)" />
        
        {/* Llama silhouette */}
        <path d="M12 8C12 7.44772 12.4477 7 13 7H15C15.5523 7 16 7.44772 16 8V10C16 10.5523 15.5523 11 15 11H13C12.4477 11 12 10.5523 12 10V8Z" fill="#1F2937" />
        <path d="M14 6C14 5.44772 14.4477 5 15 5H17C17.5523 5 18 5.44772 18 6V8C18 8.55228 17.5523 9 17 9H15C14.4477 9 14 8.55228 14 8V6Z" fill="#1F2937" />
        <path d="M16 4C16 3.44772 16.4477 3 17 3H19C19.5523 3 20 3.44772 20 4V6C20 6.55228 19.5523 7 19 7H17C16.4477 7 16 6.55228 16 6V4Z" fill="#1F2937" />
        <path d="M18 2C18 1.44772 18.4477 1 19 1H21C21.5523 1 22 1.44772 22 2V4C22 4.55228 21.5523 5 21 5H19C18.4477 5 18 4.55228 18 4V2Z" fill="#1F2937" />
        <path d="M20 3C20 2.44772 20.4477 2 21 2H23C23.5523 2 24 2.44772 24 3V5C24 5.55228 23.5523 6 23 6H21C20.4477 6 20 5.55228 20 5V3Z" fill="#1F2937" />
        <path d="M22 4C22 3.44772 22.4477 3 23 3H25C25.5523 3 26 3.44772 26 4V6C26 6.55228 25.5523 7 25 7H23C22.4477 7 22 6.55228 22 6V4Z" fill="#1F2937" />
        
        {/* Llama ears */}
        <path d="M13 5L12 3L14 4L13 5Z" fill="#1F2937" />
        <path d="M21 3L20 1L22 2L21 3Z" fill="#1F2937" />
        
        {/* Llama neck */}
        <path d="M12 10C12 9.44772 12.4477 9 13 9H15C15.5523 9 16 9.44772 16 10V12C16 12.5523 15.5523 13 15 13H13C12.4477 13 12 12.5523 12 12V10Z" fill="#1F2937" />
        <path d="M14 12C14 11.4477 14.4477 11 15 11H17C17.5523 11 18 11.4477 18 12V14C18 14.5523 17.5523 15 17 15H15C14.4477 15 14 14.5523 14 14V12Z" fill="#1F2937" />
        <path d="M16 14C16 13.4477 16.4477 13 17 13H19C19.5523 13 20 13.4477 20 14V16C20 16.5523 19.5523 17 19 17H17C16.4477 17 16 16.5523 16 16V14Z" fill="#1F2937" />
        <path d="M18 16C18 15.4477 18.4477 15 19 15H21C21.5523 15 22 15.4477 22 16V18C22 18.5523 21.5523 19 21 19H19C18.4477 19 18 18.5523 18 18V16Z" fill="#1F2937" />
      </svg>
    </div>
  );
};
