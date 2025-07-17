export interface InputEvent {
  type: 'pointer' | 'key';
  x?: number;
  y?: number;
  key?: string;
  timestamp: number;
}

type InputCallback = (event: InputEvent) => void;

class InputHandler {
  private callbacks: Set<InputCallback> = new Set();
  private element: HTMLElement;

  constructor(element: HTMLElement = document.body) {
    this.element = element;
    this.initialize();
  }

  private initialize(): void {
    // Pointer events (mouse/touch unified)
    this.element.addEventListener('pointerdown', this.handlePointerEvent);
    this.element.addEventListener('pointermove', this.handlePointerEvent);
    this.element.addEventListener('pointerup', this.handlePointerEvent);

    // Touch events for multi-touch support
    this.element.addEventListener('touchstart', this.handleTouchEvent, { passive: false });
    this.element.addEventListener('touchmove', this.handleTouchEvent, { passive: false });
    this.element.addEventListener('touchend', this.handleTouchEvent, { passive: false });

    // Keyboard events
    document.addEventListener('keydown', this.handleKeyEvent);
    document.addEventListener('keyup', this.handleKeyEvent);
  }

  private handlePointerEvent = (e: PointerEvent): void => {
    const rect = this.element.getBoundingClientRect();
    const event: InputEvent = {
      type: 'pointer',
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      timestamp: performance.now()
    };
    this.emit(event);
  };

  private handleTouchEvent = (e: TouchEvent): void => {
    e.preventDefault(); // Prevent scrolling
    const rect = this.element.getBoundingClientRect();
    
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const event: InputEvent = {
        type: 'pointer',
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
        timestamp: performance.now()
      };
      this.emit(event);
    }
  };

  private handleKeyEvent = (e: KeyboardEvent): void => {
    const event: InputEvent = {
      type: 'key',
      key: e.key,
      timestamp: performance.now()
    };
    this.emit(event);
  };

  private emit(event: InputEvent): void {
    this.callbacks.forEach(callback => callback(event));
  }

  public onInput(callback: InputCallback): () => void {
    this.callbacks.add(callback);
    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  }

  public destroy(): void {
    this.element.removeEventListener('pointerdown', this.handlePointerEvent);
    this.element.removeEventListener('pointermove', this.handlePointerEvent);
    this.element.removeEventListener('pointerup', this.handlePointerEvent);
    this.element.removeEventListener('touchstart', this.handleTouchEvent);
    this.element.removeEventListener('touchmove', this.handleTouchEvent);
    this.element.removeEventListener('touchend', this.handleTouchEvent);
    document.removeEventListener('keydown', this.handleKeyEvent);
    document.removeEventListener('keyup', this.handleKeyEvent);
    this.callbacks.clear();
  }
}

// Export singleton instance and factory
const defaultHandler = new InputHandler();

export const onInput = (callback: InputCallback): (() => void) => {
  return defaultHandler.onInput(callback);
};

export const createInputHandler = (element: HTMLElement): InputHandler => {
  return new InputHandler(element);
};

export default defaultHandler;