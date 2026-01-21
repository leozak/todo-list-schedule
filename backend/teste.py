import requests

headers = {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsZW96YWtAZ21haWwuY29tIiwiZXhwIjoxNzY5MDA3MzIzfQ.LwRdE3YPV8pdsWKof9ReX3W59OHza1a7exQ3tt19m1s"
}

# request = requests.get("http://localhost:8000/refresh-token", headers=headers)
request = requests.get("http://localhost:8000/verify-token", headers=headers)

print(request)

print(request.json())