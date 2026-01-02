// Simple audio synthesizer to avoid external assets
const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
const audioCtx = new AudioContextClass();

export const playTickSound = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // High tick
  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.05);
};

export const playSuccessSound = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.5);
};

export const playFinishSound = () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
    
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
    
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.2);
      oscillator.frequency.linearRampToValueAtTime(300, audioCtx.currentTime + 0.4);
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.6);
    
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.6);
}