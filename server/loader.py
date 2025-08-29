import requests

url = "http://127.0.0.1:8000/api/events/"

data = {
    "action": "Recycling",
    "date": "2025-01-08",
    "points": 25
}

response = requests.post(url, json=data)
print(response.status_code, response.json())