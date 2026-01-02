import React, { useState } from 'react';
import { GameConfig } from '../types';
import { PlayCircle } from 'lucide-react';

interface SetupFormProps {
  onStart: (config: GameConfig) => void;
}

export const SetupForm: React.FC<SetupFormProps> = ({ onStart }) => {
  const [startNumber, setStartNumber] = useState<string>('1');
  const [endNumber, setEndNumber] = useState<string>('75');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = parseInt(startNumber);
    const end = parseInt(endNumber);

    if (isNaN(start) || isNaN(end)) {
      setError('Por favor, insira números válidos.');
      return;
    }

    if (start >= end) {
      setError('O número final deve ser maior que o inicial.');
      return;
    }

    if (end - start > 200) {
      setError('O intervalo não pode ser maior que 200 números.');
      return;
    }

    setError('');
    onStart({ startNumber: start, endNumber: end });
  };

  return (
    <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
          Bingo Master
        </h1>
        <p className="text-slate-400">Configure o intervalo para começar o sorteio</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Número Inicial
            </label>
            <input
              type="number"
              min="1"
              value={startNumber}
              onChange={(e) => setStartNumber(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Número Final
            </label>
            <input
              type="number"
              min="1"
              max="999"
              value={endNumber}
              onChange={(e) => setEndNumber(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transform transition hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
        >
          <PlayCircle className="w-6 h-6" />
          <span>Iniciar Sorteio</span>
        </button>
      </form>
    </div>
  );
};