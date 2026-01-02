import React from 'react';
import { BallProps } from '../types';

export const BingoBall: React.FC<BallProps> = ({ number, isAnimating, size = 'md', highlight = false }) => {
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm border-2',
    md: 'w-12 h-12 text-lg border-4',
    lg: 'w-16 h-16 text-2xl border-4',
    xl: 'w-32 h-32 text-6xl border-8 shadow-2xl',
  };

  const baseClasses = "rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-white to-gray-200 text-slate-900 shadow-md transition-all duration-300";
  const animateClasses = isAnimating ? "animate-pulse scale-110" : "scale-100";
  const highlightClasses = highlight ? "ring-4 ring-yellow-400 scale-105 z-10" : "opacity-80 grayscale hover:grayscale-0 hover:opacity-100";
  // Active ball (drawn) usually looks full color, others might look different in the board.
  // But for the main ball, we always want it bright.
  
  const visualNumber = number === null ? '?' : number;

  // Color coding based on number (standard Bingo colors usually)
  // B(1-15) Blue, I(16-30) Red, N(31-45) White, G(46-60) Green, O(61-75) Yellow
  // We will apply a subtle colored border or text shadow
  const getColorClass = (num: number | null) => {
    if (num === null) return 'border-slate-300';
    if (num <= 15) return 'border-blue-500 text-blue-900';
    if (num <= 30) return 'border-red-500 text-red-900';
    if (num <= 45) return 'border-gray-500 text-slate-900'; // White/Gray
    if (num <= 60) return 'border-green-500 text-green-900';
    return 'border-yellow-500 text-yellow-900';
  };

  return (
    <div 
      className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${animateClasses} 
        ${getColorClass(number)}
        ${highlight ? 'shadow-yellow-500/50' : ''}
      `}
    >
      <span className="drop-shadow-sm font-black tracking-tighter">
        {visualNumber}
      </span>
    </div>
  );
};