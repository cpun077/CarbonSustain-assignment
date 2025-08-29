import requests

BASE_URL = "http://127.0.0.1:8000/api/actions/"

# 1️⃣ Create a new action (POST)
response = requests.post(BASE_URL, json={
    "action": "Recycling",
    "date": "2025-01-08",
    "points": 25
})
new_action = response.json()
print("Created:", new_action)

action_id = new_action["id"]

# 2️⃣ Retrieve the action by id (GET)
response = requests.get(f"{BASE_URL}{action_id}/")
retrieved = response.json()
print("Retrieved:", retrieved)

# 3️⃣ Update the action (PUT)
response = requests.put(f"{BASE_URL}{action_id}/", json={
    "points": 50,
    "action": "Recycle"
})
updated = response.json()
print("Updated:", updated)

# 4️⃣ Delete the action (DELETE)
response = requests.delete(f"{BASE_URL}{action_id}/")
if response.status_code == 204:
    print("Deleted successfully")
else:
    print("Delete failed:", response.json())

