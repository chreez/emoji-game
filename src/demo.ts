import { createRenderer } from './renderer';

const renderer = createRenderer();

// Initialize canvas
renderer.initialize({
  width: 800,
  height: 600
});

// Add canvas to the page
const container = document.getElementById('canvas-container');
if (container) {
  container.appendChild(renderer.canvas);
}

// Demo emoji data
const emojis = [
  { name: '🎮', x: 100, y: 100 },
  { name: '🚀', x: 200, y: 150 },
  { name: '⭐', x: 300, y: 200 },
  { name: '🔥', x: 400, y: 250 },
  { name: '💎', x: 500, y: 300 },
  { name: '🎯', x: 600, y: 350 },
  { name: '🏆', x: 700, y: 400 }
];

let time = 0;

// Custom render loop with animations
const customRender = (timestamp: number) => {
  time = timestamp * 0.001; // Convert to seconds
  
  renderer.clear();
  
  // Draw animated emojis
  emojis.forEach((emoji, index) => {
    const wave = Math.sin(time + index * 0.5) * 20;
    const scale = 1 + Math.sin(time * 2 + index) * 0.3;
    const rotation = time * 0.5 + index * 0.2;
    
    renderer.drawEmoji(
      emoji.name,
      emoji.x,
      emoji.y + wave,
      {
        scale,
        rotation,
        opacity: 0.8 + Math.sin(time * 3 + index) * 0.2
      }
    );
  });
  
  requestAnimationFrame(customRender);
};

// Controls
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const clearBtn = document.getElementById('clear');

let animationId: number | null = null;

startBtn?.addEventListener('click', () => {
  if (!animationId) {
    animationId = requestAnimationFrame(customRender);
  }
});

stopBtn?.addEventListener('click', () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
});

clearBtn?.addEventListener('click', () => {
  renderer.clear();
});

// Start automatically
animationId = requestAnimationFrame(customRender);