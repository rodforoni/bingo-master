import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameConfig, GameState } from './types';
import { SetupForm } from './components/SetupForm';
import { Board } from './components/Board';
import { BingoBall } from './components/BingoBall';
import { playTickSound, playSuccessSound, playFinishSound } from './services/audioService';
import { RefreshCw, ArrowLeft, Trophy } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SETUP);
  const [config, setConfig] = useState<GameConfig>({ startNumber: 1, endNumber: 75 });
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayNumber, setDisplayNumber] = useState<number | null>(null);

  const handleStartGame = (newConfig: GameConfig) => {
    setConfig(newConfig);
    setDrawnNumbers([]);
    setCurrentNumber(null);
    setDisplayNumber(null);
    setGameState(GameState.PLAYING);
  };

  const handleReset = () => {
    setGameState(GameState.SETUP);
    setDrawnNumbers([]);
    setCurrentNumber(null);
    setDisplayNumber(null);
    setIsAnimating(false);
  };

  const drawNumber = useCallback(() => {
    // 1. Check if finished
    const totalNumbers = config.endNumber - config.startNumber + 1;
    if (drawnNumbers.length >= totalNumbers) {
      setGameState(GameState.FINISHED);
      playFinishSound();
      return;
    }

    // 2. Start Animation
    setIsAnimating(true);
    
    // Animation Logic
    const duration = 1000; // 1 second
    const intervalTime = 50; // Change number every 50ms
    const startTime = Date.now();

    const animationInterval = setInterval(() => {
      // Pick a random number purely for visual effect
      const randomVisual = Math.floor(Math.random() * (config.endNumber - config.startNumber + 1)) + config.startNumber;
      setDisplayNumber(randomVisual);
      playTickSound();

      if (Date.now() - startTime >= duration) {
        clearInterval(animationInterval);
        
        // 3. Finalize Draw
        // Filter out already drawn numbers
        const available = [];
        for (let i = config.startNumber; i <= config.endNumber; i++) {
          if (!drawnNumbers.includes(i)) {
            available.push(i);
          }
        }
        
        const randomIndex = Math.floor(Math.random() * available.length);
        const winner = available[randomIndex];
        
        setDisplayNumber(winner);
        setCurrentNumber(winner);
        setDrawnNumbers(prev => [...prev, winner]);
        setIsAnimating(false);
        playSuccessSound();

        // Check if this was the last number
        if (drawnNumbers.length + 1 >= (config.endNumber - config.startNumber + 1)) {
           // We set finished state slightly after to allow the user to see the last number
           setTimeout(() => setGameState(GameState.FINISHED), 1000);
        }
      }
    }, intervalTime);

  }, [config, drawnNumbers]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center py-8 px-4 font-sans">
      
      {/* Header / Setup State */}
      {gameState === GameState.SETUP && (
        <div className="flex-1 flex items-center justify-center w-full">
           <SetupForm onStart={handleStartGame} />
        </div>
      )}

      {/* Playing / Finished State */}
      {(gameState === GameState.PLAYING || gameState === GameState.FINISHED) && (
        <div className="w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Configurar</span>
            </button>
            
            <div className="text-xl font-bold text-slate-200">
              Bingo <span className="text-blue-500">Master</span>
            </div>

            <button 
              onClick={() => {
                if (confirm('Reiniciar o sorteio atual?')) {
                  setDrawnNumbers([]);
                  setCurrentNumber(null);
                  setDisplayNumber(null);
                  setGameState(GameState.PLAYING);
                }
              }}
              className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Main Draw Area */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-8">
            
            {/* Control Button */}
            <div className="order-2 md:order-1">
              <button
                onClick={drawNumber}
                disabled={isAnimating || gameState === GameState.FINISHED}
                className={`
                  relative group overflow-hidden px-8 py-6 rounded-2xl font-black text-2xl uppercase tracking-wider transition-all
                  ${gameState === GameState.FINISHED 
                    ? 'bg-slate-700 cursor-not-allowed opacity-50 text-slate-400' 
                    : isAnimating 
                      ? 'bg-yellow-500 cursor-wait text-yellow-900 scale-95'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95'
                  }
                `}
              >
                {isAnimating ? 'Sorteando...' : gameState === GameState.FINISHED ? 'Finalizado' : 'Sortear Bola'}
                
                {/* Button Shine Effect */}
                {!isAnimating && gameState !== GameState.FINISHED && (
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                )}
              </button>
              
              {gameState === GameState.FINISHED && (
                <div className="mt-4 text-center text-yellow-400 font-bold flex flex-col items-center animate-bounce">
                  <Trophy className="w-8 h-8 mb-1" />
                  Sorteio Completo!
                </div>
              )}
            </div>

            {/* The Animated Ball */}
            <div className="order-1 md:order-2 flex flex-col items-center">
              <div className="relative">
                 {/* Glow behind the ball */}
                 <div className={`absolute inset-0 bg-blue-500 blur-3xl rounded-full transition-opacity duration-500 ${isAnimating || currentNumber ? 'opacity-40' : 'opacity-0'}`}></div>
                 
                 <BingoBall 
                    number={displayNumber} 
                    isAnimating={isAnimating} 
                    size="xl" 
                    highlight={!isAnimating && currentNumber !== null}
                 />
              </div>
              <div className="mt-4 text-slate-400 font-medium">
                {isAnimating ? 'Embaralhando...' : currentNumber ? 'Bola Sorteada' : 'Aguardando...'}
              </div>
            </div>

          </div>

          {/* The Board */}
          <Board 
            start={config.startNumber} 
            end={config.endNumber} 
            drawnNumbers={drawnNumbers}
            currentNumber={currentNumber}
          />

        </div>
      )}
    </div>
  );
};

export default App;