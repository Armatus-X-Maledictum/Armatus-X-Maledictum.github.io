# Armatus-X-Maledictum.github.io

## Card battle prototype

The first playable systems pass lives in `index.html`, `styles.css`, and `app.js`.
It currently establishes the visual and interaction vocabulary for the mode:

- an opening menu for Battle, Account, Inventory, Achievements, and Settings
- a three-slot front-line board for each side
- a data-driven hand of unit and tactic cards
- energy spending and end-turn recovery
- deck count, health, round, phase, and combat-log elements
- responsive layout for desktop and mobile screens

This phase is intentionally a foundation. Targeting, damage resolution, deck construction, and multiplayer rules are not implemented yet.

The opening menu is the default view. Battle opens the playable prototype, while the other destinations currently show placeholder screens. A future background can be applied through `window.setGameBackground(value)` without changing the page structure; no background is selected yet.

## Run locally

From the repository root:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173` in a browser.

## Roadmap

# Just beginning step up:
# Phase 1 — DesignFinalize rule
# Phase 2 — Prototype Prove gameplay
# Phase 3 — Website Create player interface
# Phase 4 — Progression Add collection systems
# Phase 5 — Story Add narrative
# Phase 6 — Online Add multiplayer
# Phase 7 — Administration Operate safely
# Phase 8 — Testing Improve stability
# Phase 9 — Release Public launch
# Phase 10 — Live Updates Maintain the game

