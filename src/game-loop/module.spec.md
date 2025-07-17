---
id: game-loop
version: 0.1.0
title: Game Loop Manager
status: draft
entry_points: [src/game-loop/index.ts]
description: >
  Manages the game tick and animation frame loop with deterministic timing
  and clean pause/resume functionality.
---

## 🧠 Goal

Provide a reliable game loop that coordinates update and render cycles at a consistent 60 FPS, ensuring smooth gameplay and deterministic behavior across different hardware configurations.

## ✅ Success Criteria

- Frame updates are throttled to exactly 60 FPS (16.67ms per frame)
- Update and render callbacks execute in deterministic order each frame
- Game loop can pause and resume cleanly without state loss or timing issues
- Accumulated time is tracked to handle frames that take longer than target
- Provides accurate delta time to update callbacks for physics calculations
- Gracefully handles tab backgrounding and visibility changes

## 🧪 Test Strategy

- **Mock Time Control**: Use Jest fake timers to simulate requestAnimationFrame behavior and verify frame timing
- **Frame Counter Tests**: Count update/render calls over simulated time periods to verify 60 FPS constraint
- **Pause/Resume Tests**: Verify state preservation and timing continuity across pause/resume cycles
- **Performance Tests**: Simulate slow frames and verify catch-up behavior without spiral of death
- **Visibility Tests**: Mock document visibility API to test backgrounding behavior

## 🔁 Changelog

- 0.1.0 — 2025-01-17 — chris — Initial version