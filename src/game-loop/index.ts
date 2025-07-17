export interface FrameInfo {
  dt: number;       // Delta time in seconds
  frame: number;    // Frame count
  timestamp: number; // Current timestamp
}

type FrameCallback = (info: FrameInfo) => void;

class GameLoop {
  private callbacks: Set<FrameCallback> = new Set();
  private running: boolean = false;
  private lastTime: number = 0;
  private frameCount: number = 0;
  private animationId: number | null = null;
  
  // Target 60 FPS
  private readonly targetFPS = 60;
  private readonly targetFrameTime = 1000 / this.targetFPS;

  constructor() {
    // Handle tab visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private handleVisibilityChange = (): void => {
    if (document.hidden && this.running) {
      this.pause();
    } else if (!document.hidden && this.animationId === null && this.callbacks.size > 0) {
      this.start();
    }
  };

  private tick = (timestamp: number): void => {
    if (!this.running) return;

    // Initialize lastTime on first frame
    if (this.lastTime === 0) {
      this.lastTime = timestamp;
    }

    // Calculate delta time
    const deltaMs = timestamp - this.lastTime;
    
    // Only update if enough time has passed for target FPS
    if (deltaMs >= this.targetFrameTime) {
      const dt = deltaMs / 1000; // Convert to seconds
      
      const frameInfo: FrameInfo = {
        dt: Math.min(dt, 0.1), // Cap delta time to prevent spiral of death
        frame: this.frameCount++,
        timestamp
      };

      // Emit to all callbacks
      this.callbacks.forEach(callback => callback(frameInfo));
      
      // Update last time, accounting for any extra time
      this.lastTime = timestamp - (deltaMs % this.targetFrameTime);
    }

    // Schedule next frame
    this.animationId = requestAnimationFrame(this.tick);
  };

  public start(): void {
    if (this.running) return;
    
    this.running = true;
    this.lastTime = 0; // Reset timing
    this.animationId = requestAnimationFrame(this.tick);
  }

  public pause(): void {
    this.running = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public stop(): void {
    this.pause();
    this.frameCount = 0;
    this.lastTime = 0;
  }

  public onFrame(callback: FrameCallback): () => void {
    this.callbacks.add(callback);
    
    // Auto-start if not running and this is the first callback
    if (!this.running && this.callbacks.size === 1) {
      this.start();
    }
    
    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
      
      // Auto-pause if no more callbacks
      if (this.callbacks.size === 0 && this.running) {
        this.pause();
      }
    };
  }

  public destroy(): void {
    this.stop();
    this.callbacks.clear();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  public get isRunning(): boolean {
    return this.running;
  }

  public get currentFrame(): number {
    return this.frameCount;
  }
}

// Export singleton instance and factory
const defaultLoop = new GameLoop();

export const start = (): void => defaultLoop.start();
export const pause = (): void => defaultLoop.pause();
export const stop = (): void => defaultLoop.stop();
export const onFrame = (callback: FrameCallback): (() => void) => {
  return defaultLoop.onFrame(callback);
};

export const createGameLoop = (): GameLoop => {
  return new GameLoop();
};

export default defaultLoop;