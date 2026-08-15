# FPL Team Optimizer

A clean Fantasy Premier League squad dashboard based directly on the supplied project specification.

## What is included

- React + Vite frontend
- Matchday pitch formation
- Player chips with team, projected points and availability status
- Captain recommendation
- Suggested transfers
- Player detail drawer with reasoning and ranked alternatives
- Squad checks for budget / club limit / availability
- Player outlook table
- Responsive mobile layout
- Starter Django backend requirements and architecture notes

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

The frontend currently uses a small local demonstration dataset so the UI works immediately. The backend folder documents the production integration path from the specification: official FPL API ingestion, heuristic prediction, PuLP optimization, Celery/Redis hourly jobs, isolated news scrapers and the weekly self-review loop.

## Design approach

The interface intentionally avoids generic AI-dashboard patterns: no gradients, oversized marketing cards, excessive rounded containers, neon colors, chatbot language, fake metrics, or decorative AI imagery. It is designed like a restrained football analysis tool / matchday team sheet.
