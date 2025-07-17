# CLAUDE.md

> **Codified Logic for Agentic, Unified, Deterministic Engineering**

---

## 🧱 Workspace Structure

All code changes must originate from a validated specification.
Specs follow this deterministic layout:

```
/main.spec.md              ← Primary goal and system-wide success criteria
/engineering.spec.md       ← Directives to aid agent behavior and tooling
/src/<module>/module.spec.md  ← One per module
```

### 🔢 Rule: Total Specs = `n + 2`

* `n` = number of modules
* `+1` main spec
* `+1` engineering spec

No additional specs allowed without explicit justification and version bump in `main.spec.md`.

---

## 📄 Required Spec Format

All specs must use **Markdown with YAML frontmatter**.

### Frontmatter (required):

```yaml
id: emoji-renderer
title: Emoji Canvas Renderer
version: 0.1.0
status: draft
entry_points: [src/renderer/index.ts]
description: >
  Defines drawing behavior for a performant, emoji-based render layer.
```

---

## 🧠 Top-Level Human Area

Each spec must place **human-focused content at the top**:

```md
## 🧠 Goal
Clear articulation of what this module/system is intended to achieve.

## ✅ Success Criteria
- Concrete input/output behaviors
- Real-world performance or UX goals
- Integration expectations

## 🧪 Test Strategy
Optional but encouraged. Unit, integration, or UX test hints.

## ♻️ Changelog
- 0.1.0 — YYYY-MM-DD — author — Initial spec
```

> Everything below this line is treated as agent-optimized content.

---

## ♻️ Versioning Rules

* Follows Semantic Versioning: `MAJOR.MINOR.PATCH`
* Spec changes must increment version correctly:

  * `PATCH`: typo, clarification
  * `MINOR`: added behavior, backward-compatible
  * `MAJOR`: breaking change

Specs may not be hard-deleted. Use `status: deprecated` first.

---

## 🚰 Agent Directives (From `engineering.spec.md`)

Directives define fallback logic when agents encounter hard-to-automate tasks (e.g., visual bugs).

Examples:

* Wait for user to click a button before continuing
* Listen to a logstream until `pattern.match` resolves
* Request human validation if test coverage is insufficient

Agents must treat humans as tools: precise, minimal interactions, with deterministic expectations.

---

## ✅ Validation Requirements

Specs must pass validation with `bin/spec-validator`.

### Minimum Checks:

* Valid frontmatter
* Required top-level sections
* Chronological changelog
* Correct version bump
* No status downgrade (e.g., active → draft)
* No spec addition/removal without `main.spec.md` update

Output format: `PASS`, `WARN`, `FAIL`, with machine-readable recommendations.

---

## 📃 Git Commit Rules

All code and spec changes must follow atomic, traceable commit conventions:

* Each commit must reference a spec `id:` and version tag.
* Example commit message:

  ```
  feat(input-handler-spec@0.2.0): add mousewheel support
  ```
* No commits may touch `src/` without a corresponding spec change or reference.
* Use one commit per validated spec change.
* Use `fix:`, `feat:`, `chore:` style prefixes for clarity.
* Commit messages should match the corresponding changelog entry.

Git hooks and validation tools may reject commits that violate these rules.

---

## 🎯 Design Goals

* **Single source of intent per module**
* **Specs communicate purpose clearly to both human and machine**
* **Validation and generation must be deterministic**
* **No code is written outside the spec loop**
