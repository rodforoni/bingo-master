export interface GameConfig {
  startNumber: number;
  endNumber: number;
}

export enum GameState {
  SETUP = 'SETUP',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export interface BallProps {
  number: number | null;
  isAnimating?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  highlight?: boolean;
}