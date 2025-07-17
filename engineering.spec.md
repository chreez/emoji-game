---
id: emoji-engineering-directives
version: 0.1.0
title: Engineering Directives – Emoji Game
status: draft
entry_points: []
description: >
  Defines engineering directives that assist agents during development of the emoji game. Focuses on visual debugging, user-assisted execution, and progressive enhancement safety.
---

## 🧠 Goal

Equip agents with fallback strategies and user-in-the-loop techniques to handle challenges inherent to interactive, visual game development. Define clear behavior for when full automation is not possible.

## ✅ Success Criteria

* Agents do not get stuck on visual tasks (e.g. layout bugs, rendering glitches)
* Agents wait for user signals when feedback is ambiguous
* Logs and telemetry can guide agent understanding of visual issues
* Humans are prompted only when necessary and deterministically
* Development remains safe and recoverable even during partial changes

## 🧪 Test Strategy

* Inject artificial visual issues and confirm agent halts and requests user confirmation
* Simulate incomplete frame output and require log-based resolution
* Test progressive module development (e.g. adding `audio/` last) for safe rollback and enhancement

## 🔁 Changelog

* 0.1.0 — 2025-07-17 — palme — Initial agent fallback and directive spec for emoji game
