# Integration Schema for AI Health Companion

## Input
- Plain text query from user.

## Output
- JSON object with the following fields:
  - `intent`: type of query (health_query, general_info, fallback).
  - `response`: agent’s answer.
  - `confidence`: float between 0–1 indicating certainty.

## Example
```json
{"intent":"health_query","response":"Drink 2-3 liters daily.","confidence":0.87}

3. Save the file.

---

##  2. Create `examples/day2_samples.json`
This file shows sample inputs and outputs for testing.

**Steps:**
1. In your repo, create a folder `examples/` if it doesn’t exist.
2. Inside it, create a file: `day2_samples.json`.
3. Paste this content:
## Output (Updated)
- JSON object with fields:
  - `intent`
  - `response`
  - `confidence`
  - `sentiment` → positive / negative / neutral

```json
[
  {"input":"hello","output":{"intent":"general_info","response":"Hello!","confidence":0.95}},
  {"input":"how much water","output":{"intent":"health_query","response":"Drink 2-3 liters daily.","confidence":0.87}},
  {"input":"sleep tips","output":{"intent":"health_query","response":"Aim for 7-8 hours of sleep.","confidence":0.85}}
]

---

## Output (Day 4 Schema)
- JSON object with the following fields:
- `intent`: type of query (health_query, general_info, fallback).
- `response`: agent’s answer (may include personalization goals).
- `confidence`: float between 0–1 indicating certainty.
- `sentiment`: positive / negative / neutral.
- `timestamp`: ISO format time when response was generated.

---

## Example Output
```json
{
"intent": "health_query",
"response": "Drink 2-3 liters daily. (Your goal: 3 liters)",
"confidence": 0.87,
"sentiment": "neutral",
"timestamp": "2026-02-24T05:40:00"
}
