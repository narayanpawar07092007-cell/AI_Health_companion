

import pandas as pd

def generate_nudge(steps, sleep_hours, water_liters):
    nudges = []
    if steps < 5000:
        nudges.append("You're below 5000 steps, go for a walk!")
    else: 
        nudges.append("Great job hitting your step goal!")

    if sleep_hours < 6:
        nudges.append("You slept less than 6 hours, try resting more tonight.")
    else:
        nudges.append("Nice! You got good sleep.")

    if water_liters < 2:
        nudges.append("Drink more water to stay hydrated.")
    else:
        nudges.append("Hydration on point!")

    return nudges

def calculate_tokens(steps, sleep_hours, water_liters):
    tokens = 0
    tokens += (steps // 1000) * 5
    tokens += int(water_liters) * 2
    if sleep_hours >= 7:
        tokens += 10
    return tokens

# Example usage
if __name__ == "__main__":
    df = pd.DataFrame({
        "steps": [3000, 7000, 10000],
        "sleep_hours": [5, 8, 6],
        "water_liters": [1, 2, 3]
    })

    for i, row in df.iterrows():
        print(f"Day {i+1}: {generate_nudge(row['steps'], row['sleep_hours'], row['water_liters'])}")

        print(f"Day {i+1}: Tokens earned = {calculate_tokens(row['steps'], row['sleep_hours'], row['water_liters'])}")

import json

def search_kb(user_text):
    with open("knowledge_base.json") as f:
        kb = json.load(f)
    for entry in kb:
        if entry["question"] in user_text.lower():
            return entry["response"], entry["intent"]
    return None, "fallback"

def process_input(user_text):
    response, intent = search_kb(user_text)
    if response:
        return {"intent":intent,"response":response,"confidence":0.87}
    else:
        return {"intent":"fallback","response":"I’m not sure, can you rephrase?","confidence":0.50}
print(process_input("hello"))
print(process_input("how much water should I drink"))
print(process_input("sleep tips"))
