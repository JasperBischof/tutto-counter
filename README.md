# Tutto Counter

A simple score counter for the dice game **Tutto**, built as a mobile-friendly web app.

Instead of tracking scores on paper, players enter points at the end of each turn and the app handles the rest: turn order, running totals, per-turn history, and win conditions.

https://jasperbischof.github.io/tutto-counter

## Features

- Add 2–10 players and set turn order before starting
- Numeric keypad for quick score entry each turn
- Special card support (`Insta-Win`, `Swap 1000`) with their own scoring rules
- Automatic final-round handling once a player reaches the winning score (6000 points)
- Scoreboard view with per-turn point history for every player
- Game-over screen showing the winner

## Tech Stack

- [React 19](https://react.dev/) + TypeScript
- [Vite](https://vite.dev/) for dev/build tooling
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Oxlint](https://oxc.rs/) for linting

## Getting Started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build    # type-check and build for production
npm run preview  # preview the production build locally
npm run lint      # run oxlint
```
