---
id: emoji-state
version: 0.1.0
title: Emoji Game State Manager
status: draft
entry_points: [src/state/index.ts]
description: >
  Manages global game state including current level, score, play modes,
  and game lifecycle with support for reset and replay functionality.
---

## 🧠 Goal

Provide a centralized, predictable state management system that tracks all game-wide state, supports clean state transitions, and enables features like pause, reset, and replay while maintaining clear interfaces with other modules.

## ✅ Success Criteria

- Supports complete state reset to initial conditions for replay
- Reflects current play mode accurately (playing, paused, game-over, menu)
- Interacts cleanly with external modules (renderer, scoring) via well-defined interfaces
- State transitions are atomic and predictable
- State changes trigger appropriate events for dependent modules
- Maintains immutable state history for undo/replay features
- Persists high scores and preferences between sessions
- Thread-safe state updates prevent race conditions

## 🧪 Test Strategy

- **Unit Tests**: Test state transitions and validators
  - Verify all play mode transitions (menu → playing → paused → game-over)
  - Test score increment/decrement with bounds checking
  - Validate level progression logic and unlock conditions
  - Test state reset returns exact initial conditions
  - Verify state serialization/deserialization for save/load
  
- **Integration Tests**: Simulate game flow scenarios
  - Test complete game lifecycle from start to game-over
  - Verify state consistency during rapid mode changes
  - Test state persistence across browser refresh
  - Validate event emission on state changes
  
- **State Machine Tests**: Validate transition correctness
  - Use property-based testing to verify all valid state paths
  - Test invalid transition attempts are properly rejected
  - Verify no orphaned states or unreachable conditions
  - Test concurrent state update handling

## 🔁 Changelog

- 0.1.0 — 2025-01-17 — chris — Initial version