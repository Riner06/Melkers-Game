import requests

BASE = "http://127.0.0.1:5000/"

response = requests.put(BASE + "helloworld/bill", {"friends": 10})
print(response.json())