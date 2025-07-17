export interface CanvasConfig {
  width: number;
  height: number;
  pixelRatio?: number;
}

export interface EmojiDrawOptions {
  scale?: number;
  rotation?: number;
  opacity?: number;
}

export interface Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  initialize(config: CanvasConfig): void;
  drawEmoji(name: string, x: number, y: number, options?: EmojiDrawOptions): void;
  clear(): void;
  start(): void;
  stop(): void;
}

export interface RenderFrame {
  timestamp: number;
  deltaTime: number;
}