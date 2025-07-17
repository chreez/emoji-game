# CLAUDE.md

> **Codified Logic for Agentic, Unified, Deterministic Engineering**

---

## 🧱 Spec System Overview

This workspace uses exactly `n + 2` specs:

* `main.spec.md`: defines the overall system goal
* `engineering.spec.md`: defines agent-facing directives for tricky tasks
* `src/<module>/module.spec.md`: one per module

No other spec files are permitted. Adding/removing a module requires updating the main spec.

---

## 📄 Required Format for All Specs

All spec files must be written in **Markdown with YAML frontmatter** and follow this structure:

### 🔹 YAML Frontmatter

```yaml
id: emoji-renderer
version: 0.1.0
title: Emoji Canvas Renderer
status: draft
entry_points: [src/renderer/index.ts]
description: >
  Defines drawing behavior for a performant, emoji-based render layer.
```

### 🔸 Required Sections

```md
## 🧠 Goal
Describe what this module or system is meant to accomplish.

## ✅ Success Criteria
- List observable behaviors
- Include user-facing outcomes or performance constraints

## 🧪 Test Strategy
- Describe how the success criteria will be verified

## 🔁 Changelog
- 0.1.0 — YYYY-MM-DD — author — Initial version
```

> Everything below this line is for agent-generated sections or extensions.

---

## ♻️ Versioning Rules

Specs must follow semantic versioning:

* `MAJOR`: breaking change
* `MINOR`: added behavior
* `PATCH`: typo or clarification

A spec cannot be deleted unless first marked as `status: deprecated`.

---

## 📃 Git Commit Rules

* Each commit must reference the spec `id@version`
* Example: `feat(input@0.2.0): add mousewheel support`
* No commits may alter code in `src/` without a corresponding spec change
* Use one commit per spec change
* Changelog entries must match the commit summary

---

## 🎯 Design Goals

* One spec per module
* Spec-first development
* Deterministic validation
* Clean modular code ownership
* Clear communication between humans and agents
