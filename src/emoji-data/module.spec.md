---
id: emoji-data
version: 0.1.0
title: Emoji Data Registry
status: draft
entry_points: [src/emoji-data/index.ts]
description: >
  Defines the registry of available emoji characters with metadata including physics properties, visual characteristics, and semantic tags for game object creation.
---

## 🧠 Goal

Create a structured data registry that defines available emoji characters with associated metadata, enabling dynamic emoji selection based on themes, tags, or properties while maintaining consistent data schemas for game mechanics.

## ✅ Success Criteria

- **Structured Definitions**: Each emoji has a consistent schema with character, type, physics properties (bounciness, mass), and semantic tags
- **Theme Support**: Ability to select coherent emoji sets by theme (e.g., "space", "ocean", "carnival")
- **Tag Querying**: Support for retrieving emoji by multiple tags (e.g., "food", "faces", "animals", "vehicles")
- **Random Selection**: Weighted random selection from full registry or filtered subsets
- **Physics Properties**: Each emoji includes game-relevant metadata like bounciness coefficient (0.0-1.0) and relative mass
- **Extensibility**: Easy to add new emoji definitions without breaking existing queries
- **Performance**: Fast lookups and filtering operations for real-time game usage

## 🧪 Test Strategy

- **Schema Validation**: Verify all emoji entries conform to the required data structure
- **Tag Query Testing**: Test filtering by single and multiple tags returns expected emoji sets
- **Theme Validation**: Ensure themed sets contain appropriate, cohesive emoji selections
- **Random Selection**: Statistical testing to verify weighted random selection distributions
- **Property Range Testing**: Validate physics properties stay within acceptable ranges
- **Data Integrity**: Check for duplicate entries, missing required fields, and invalid values
- **Query Performance**: Measure lookup and filtering times with full emoji dataset
- **Edge Cases**: Test empty queries, non-existent tags, and boundary conditions

## 🔁 Changelog

- 0.1.0 — 2025-07-17 — agent — Initial emoji data registry spec with metadata and querying support