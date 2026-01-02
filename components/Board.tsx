import React from 'react';

interface BoardProps {
  start: number;
  end: number;
  drawnNumbers: number[];
  currentNumber: number | null;
}

export const Board: React.FC<BoardProps> = ({ start, end, drawnNumbers, currentNumber }) => {
  const totalNumbers = end - start + 1;
  const numbers = Array.from({ length: totalNumbers }, (_, i) => start + i);

  return (
    <div className="w-full bg-slate-800 rounded-2xl p-6 shadow-inner border border-slate-700">
      <h3 className="text-xl font-bold text-slate-300 mb-4 flex items-center gap-2">
        <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
        Painel de Números
        <span className="ml-auto text-sm font-normal text-slate-500 bg-slate-900 px-3 py-1 rounded-full">
          {drawnNumbers.length} / {totalNumbers} Sorteados
        </span>
      </h3>
      
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
        {numbers.map((num) => {
          const isDrawn = drawnNumbers.includes(num);
          const isCurrent = currentNumber === num;

          return (
            <div 
              key={num} 
              className="relative aspect-square flex items-center justify-center"
            >
              {/* Background Slot (Inactive State) */}
              <div className="absolute inset-0 rounded-full bg-slate-700/30 border-2 border-slate-700/50 flex items-center justify-center transition-colors duration-300">
                 <span className="text-slate-600 font-bold text-lg select-none">{num}</span>
              </div>

              {/* Active Ball Layer (Animated State) */}
              <div 
                className={`
                  absolute inset-0 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-400/50
                  bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg select-none
                  transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  ${isDrawn ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-90 pointer-events-none'}
                  ${isCurrent ? 'ring-4 ring-yellow-400/80 z-10 shadow-yellow-500/20' : ''}
                `}
              >
                {num}
                
                {/* Ping effect for current number */}
                {isCurrent && (
                 <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                 </span>
               )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};