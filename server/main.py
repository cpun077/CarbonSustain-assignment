import requests

BASE_URL = "http://127.0.0.1:8000/api/actions/"


exrows = [
    {"action": "Recycling", "date": "2025-01-08", "points": 25},
    {"action": "Shenanigans", "date": "2025-01-08", "points": 25},
    {"action": "Recycling", "date": "2025-01-08", "points": 25},
    {"action": "Recycling", "date": "2025-01-08", "points": 25},
    {"action": "Recycling", "date": "2025-01-08", "points": 25},
    {"action": "Recycling", "date": "2025-01-08", "points": 25},
    {"action": "Recycling", "date": "2025-01-08", "points": 25},
    {"action": "Recycling", "date": "2025-01-08", "points": 25},
    {"action": "Recycling", "date": "2025-01-08", "points": 25},
    {"action": "Recycling", "date": "2025-01-08", "points": 25},
]

for row in exrows:
    response = requests.post(BASE_URL, json=row)
    new_action = response.json()
    print("Created:", new_action)

action_id = new_action["id"]
response = requests.get(f"{BASE_URL}{action_id}/")
retrieved = response.json()
print("Retrieved:", retrieved)

response = requests.put(f"{BASE_URL}{action_id}/", json={
    "points": 50,
    "action": "Recycle"
})
updated = response.json()
print("Updated:", updated)

response = requests.delete(f"{BASE_URL}{action_id}/")
if response.status_code == 204:
    print("Deleted Successfully")
else:
    print("Delete failed:", response.json())

response = requests.get(BASE_URL)
retrieved = response.json()
print("Retrieved:", retrieved)

response = requests.get(f"{BASE_URL}download")
retrieved = response.json()
print("Downloaded")