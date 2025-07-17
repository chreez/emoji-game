import { CanvasConfig, EmojiDrawOptions, Renderer, RenderFrame } from './types';

class EmojiRenderer implements Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  private animationId: number | null = null;
  private lastTimestamp: number = 0;
  private isRunning: boolean = false;

  constructor() {
    this.canvas = document.createElement('canvas');
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D rendering context');
    }
    this.ctx = ctx;
  }

  initialize(config: CanvasConfig): void {
    const pixelRatio = config.pixelRatio || window.devicePixelRatio || 1;
    
    this.canvas.width = config.width * pixelRatio;
    this.canvas.height = config.height * pixelRatio;
    this.canvas.style.width = `${config.width}px`;
    this.canvas.style.height = `${config.height}px`;
    
    this.ctx.scale(pixelRatio, pixelRatio);
    
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
  }

  drawEmoji(name: string, x: number, y: number, options: EmojiDrawOptions = {}): void {
    const { scale = 1, rotation = 0, opacity = 1 } = options;
    
    this.ctx.save();
    
    this.ctx.globalAlpha = opacity;
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    
    const fontSize = 32 * scale;
    this.ctx.font = `${fontSize}px sans-serif`;
    
    this.ctx.fillText(name, 0, 0);
    
    this.ctx.restore();
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.render(this.lastTimestamp);
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private render = (timestamp: number): void => {
    if (!this.isRunning) return;
    
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    
    const frame: RenderFrame = {
      timestamp,
      deltaTime
    };
    
    this.animationId = requestAnimationFrame(this.render);
  }
}

export function createRenderer(): Renderer {
  return new EmojiRenderer();
}

export * from './types';