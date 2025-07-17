export interface Vector2D {
  x: number;
  y: number;
}

export interface PhysicsObject {
  id: string;
  position: Vector2D;
  velocity: Vector2D;
  acceleration: Vector2D;
  radius: number; // For circular collision detection
  mass: number;
  restitution: number; // Bounciness (0 = no bounce, 1 = perfect elastic)
  friction: number; // Air/surface friction coefficient
}

export interface Boundary {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface CollisionInfo {
  object1: PhysicsObject;
  object2?: PhysicsObject;
  normal: Vector2D;
  overlap: number;
}

class PhysicsEngine {
  private objects: Map<string, PhysicsObject> = new Map();
  private boundary: Boundary = { left: 0, right: 800, top: 0, bottom: 600 };
  private gravity: Vector2D = { x: 0, y: 9.81 * 100 }; // Pixels per second²
  
  // Constants
  private readonly minVelocity = 0.1; // Velocity threshold for rest state
  private readonly positionCorrection = 0.8; // Position correction factor

  public addObject(object: PhysicsObject): void {
    this.objects.set(object.id, object);
  }

  public removeObject(id: string): void {
    this.objects.delete(id);
  }

  public getObject(id: string): PhysicsObject | undefined {
    return this.objects.get(id);
  }

  public setBoundary(boundary: Boundary): void {
    this.boundary = boundary;
  }

  public setGravity(gravity: Vector2D): void {
    this.gravity = gravity;
  }

  public simulate(dt: number): void {
    // Update each object
    this.objects.forEach(obj => {
      // Apply gravity to acceleration
      obj.acceleration.x = this.gravity.x;
      obj.acceleration.y = this.gravity.y;

      // Update velocity based on acceleration
      obj.velocity.x += obj.acceleration.x * dt;
      obj.velocity.y += obj.acceleration.y * dt;

      // Apply friction
      obj.velocity.x *= (1 - obj.friction * dt);
      obj.velocity.y *= (1 - obj.friction * dt);

      // Update position based on velocity
      obj.position.x += obj.velocity.x * dt;
      obj.position.y += obj.velocity.y * dt;

      // Check for rest state
      if (Math.abs(obj.velocity.x) < this.minVelocity) {
        obj.velocity.x = 0;
      }
      if (Math.abs(obj.velocity.y) < this.minVelocity) {
        obj.velocity.y = 0;
      }
    });

    // Handle collisions
    this.handleBoundaryCollisions();
    this.handleObjectCollisions();
  }

  private handleBoundaryCollisions(): void {
    this.objects.forEach(obj => {
      let collision = false;

      // Left boundary
      if (obj.position.x - obj.radius < this.boundary.left) {
        obj.position.x = this.boundary.left + obj.radius;
        obj.velocity.x = Math.abs(obj.velocity.x) * obj.restitution;
        collision = true;
      }
      
      // Right boundary
      else if (obj.position.x + obj.radius > this.boundary.right) {
        obj.position.x = this.boundary.right - obj.radius;
        obj.velocity.x = -Math.abs(obj.velocity.x) * obj.restitution;
        collision = true;
      }

      // Top boundary
      if (obj.position.y - obj.radius < this.boundary.top) {
        obj.position.y = this.boundary.top + obj.radius;
        obj.velocity.y = Math.abs(obj.velocity.y) * obj.restitution;
        collision = true;
      }
      
      // Bottom boundary
      else if (obj.position.y + obj.radius > this.boundary.bottom) {
        obj.position.y = this.boundary.bottom - obj.radius;
        obj.velocity.y = -Math.abs(obj.velocity.y) * obj.restitution;
        collision = true;
        
        // Extra friction when on ground
        obj.velocity.x *= 0.9;
      }

      // Prevent micro-movements at boundaries
      if (collision && Math.abs(obj.velocity.y) < this.minVelocity * 10) {
        obj.velocity.y = 0;
      }
    });
  }

  private handleObjectCollisions(): void {
    const objectArray = Array.from(this.objects.values());
    
    for (let i = 0; i < objectArray.length; i++) {
      for (let j = i + 1; j < objectArray.length; j++) {
        const obj1 = objectArray[i];
        const obj2 = objectArray[j];
        
        const collision = this.checkCollision(obj1, obj2);
        if (collision) {
          this.resolveCollision(obj1, obj2, collision);
        }
      }
    }
  }

  private checkCollision(obj1: PhysicsObject, obj2: PhysicsObject): CollisionInfo | null {
    const dx = obj2.position.x - obj1.position.x;
    const dy = obj2.position.y - obj1.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = obj1.radius + obj2.radius;

    if (distance < minDistance) {
      const normal: Vector2D = {
        x: dx / distance,
        y: dy / distance
      };
      
      return {
        object1: obj1,
        object2: obj2,
        normal,
        overlap: minDistance - distance
      };
    }

    return null;
  }

  private resolveCollision(obj1: PhysicsObject, obj2: PhysicsObject, collision: CollisionInfo): void {
    // Separate objects
    const separationX = collision.normal.x * collision.overlap * this.positionCorrection;
    const separationY = collision.normal.y * collision.overlap * this.positionCorrection;
    
    const totalMass = obj1.mass + obj2.mass;
    obj1.position.x -= separationX * (obj2.mass / totalMass);
    obj1.position.y -= separationY * (obj2.mass / totalMass);
    obj2.position.x += separationX * (obj1.mass / totalMass);
    obj2.position.y += separationY * (obj1.mass / totalMass);

    // Calculate relative velocity
    const relativeVelocity: Vector2D = {
      x: obj2.velocity.x - obj1.velocity.x,
      y: obj2.velocity.y - obj1.velocity.y
    };

    // Calculate relative velocity along collision normal
    const velocityAlongNormal = relativeVelocity.x * collision.normal.x + 
                               relativeVelocity.y * collision.normal.y;

    // Objects moving apart, no collision response needed
    if (velocityAlongNormal > 0) return;

    // Calculate restitution
    const restitution = Math.min(obj1.restitution, obj2.restitution);
    
    // Calculate impulse scalar
    const impulse = -(1 + restitution) * velocityAlongNormal / totalMass;
    
    // Apply impulse
    const impulseX = impulse * collision.normal.x;
    const impulseY = impulse * collision.normal.y;
    
    obj1.velocity.x -= impulseX * obj2.mass;
    obj1.velocity.y -= impulseY * obj2.mass;
    obj2.velocity.x += impulseX * obj1.mass;
    obj2.velocity.y += impulseY * obj1.mass;
  }

  public clear(): void {
    this.objects.clear();
  }

  public getAllObjects(): PhysicsObject[] {
    return Array.from(this.objects.values());
  }
}

// Export singleton instance and factory
const defaultEngine = new PhysicsEngine();

export const simulate = (dt: number): void => defaultEngine.simulate(dt);
export const addObject = (object: PhysicsObject): void => defaultEngine.addObject(object);
export const removeObject = (id: string): void => defaultEngine.removeObject(id);
export const getObject = (id: string): PhysicsObject | undefined => defaultEngine.getObject(id);
export const setBoundary = (boundary: Boundary): void => defaultEngine.setBoundary(boundary);
export const setGravity = (gravity: Vector2D): void => defaultEngine.setGravity(gravity);
export const getAllObjects = (): PhysicsObject[] => defaultEngine.getAllObjects();
export const clear = (): void => defaultEngine.clear();

export const createPhysicsEngine = (): PhysicsEngine => {
  return new PhysicsEngine();
};

export default defaultEngine;