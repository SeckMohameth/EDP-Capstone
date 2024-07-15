import random
import json

NUM_ROWS = 1000
OUTPUT_FILE = "users.json"

random.seed(42)

users = []
for i in range(1, NUM_ROWS + 1):
    name = f"user{i}"
    email = f"user{i}@email.com"
    password = 12345
    isManager = True if random.randint(0, 1) > .5 else False
    if (not isManager):
        managerEmail = "manager@email.com"
    else:
        managerEmail = ""
        
    user = {
        "name": name,
	    "email": email,
	    "password": password,
	    "isManager": isManager,
	    "managerEmail": managerEmail
    }
    users.append(user)

with open(OUTPUT_FILE, "w") as out:
    json.dump(users, out, indent=2)