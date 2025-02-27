// components/GameCarousel.js
'use client';
import { useState, useEffect, useRef } from 'react';
import GameCard from './GameCard';

export default function GameCarousel({ games }) {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  
  const visibleGames = 3;
  const totalGames = games.length;
  
  // If we have fewer games than the visible count, just show them all
  if (totalGames <= visibleGames) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    );
  }
  
  // Functions to control the carousel
  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % totalGames);
  };
  
  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + totalGames) % totalGames);
  };
  
  const goToSlide = (index) => {
    setStartIndex(index);
  };
  
  // Auto-rotation effect with 30 second interval
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 30000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused]);
  
  // Get the games to display in the current view
  const currentGames = [];
  for (let i = 0; i < visibleGames; i++) {
    const index = (startIndex + i) % totalGames;
    currentGames.push(games[index]);
  }
  
  // Generate pagination indicators
  const paginationDots = [];
  for (let i = 0; i < totalGames; i++) {
    const isActive = 
      i >= startIndex && i < startIndex + visibleGames || 
      (startIndex + visibleGames > totalGames && i < (startIndex + visibleGames) % totalGames);
    
    paginationDots.push(
      <button
        key={`dot-${i}`}
        onClick={() => goToSlide(i)}
        className={`h-2 w-2 rounded-full mx-1 transition-colors ${
          isActive ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-400'
        }`}
        aria-label={`Go to game ${i + 1}`}
      />
    );
  }
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 -ml-5 shadow-lg"
        aria-label="Previous games"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Games grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
        {currentGames.map((game, index) => (
          <GameCard key={`${game._id}-${startIndex}-${index}`} game={game} />
        ))}
      </div>
      
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 -mr-5 shadow-lg"
        aria-label="Next games"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Pagination indicators */}
      <div className="flex justify-center mt-6">
        {paginationDots}
      </div>
    </div>
  );
}