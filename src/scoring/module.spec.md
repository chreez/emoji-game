---
id: emoji-scoring
version: 0.1.0
title: Emoji Game Scoring System
status: draft
entry_points: [src/scoring/index.ts]
description: >
  Manages game scoring, tracks player achievements including hits, combos,
  stars, and other milestones while emitting events for UI updates.
---

## 🧠 Goal

Provide a comprehensive scoring system that accurately tracks player performance, calculates complex scoring mechanics (combos, multipliers), manages achievements and milestones, and broadcasts score changes to dependent systems.

## ✅ Success Criteria

- Score updates immediately based on player interactions
- Resets cleanly to initial values on game restart
- Emits typed score events for display components and external systems
- Tracks combo chains with appropriate multipliers
- Records milestone achievements (first star, 100 hits, perfect level)
- Maintains score history for statistics and leaderboards
- Validates score integrity to prevent cheating
- Supports different scoring modes (casual, competitive, challenge)

## 🧪 Test Strategy

- **Unit Tests**: Test core scoring mechanics
  - Verify base score calculations for different interaction types
  - Test combo multiplier progression (2x, 3x, 5x, etc.)
  - Validate milestone trigger conditions
  - Test score reset returns to exact initial state
  - Verify score bounds and overflow handling
  
- **Integration Tests**: Simulate gameplay scoring scenarios
  - Test rapid hit sequences generate correct combo scores
  - Verify score events emit with correct payload format
  - Test concurrent scoring from multiple interaction sources
  - Validate score persistence between game sessions
  - Test scoring mode switches mid-game
  
- **Event Tests**: Validate event emission patterns
  - Use event spies to capture all score-related events
  - Verify event ordering for complex scoring sequences
  - Test event debouncing for high-frequency updates
  - Validate event payloads contain required data
  - Test event listener cleanup on module teardown

## 🔁 Changelog

- 0.1.0 — 2025-01-17 — chris — Initial version