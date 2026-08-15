# FPL Team Optimizer — backend

This folder is the server-side starting point for the specification.

Planned production modules:
- FPL API ingestion
- Player / fixture / price / ownership models
- Weighted expected-points heuristic
- PuLP squad optimizer (£100m, 2 GK / 5 DEF / 5 MID / 3 FWD, max 3 per club)
- Celery + Redis hourly data/news jobs
- Isolated news source adapters
- Weekly prediction-vs-actual review and weight adjustment

The included frontend is runnable immediately with its demonstration dataset. Replace the demonstration data with API responses when connecting Django endpoints.
