curl -X POST http://localhost:3000/goals \
-H 'Content-Type: application/json' \
-d '{
    "userA": "user123",
    "userAGoal": "Run 5km daily",
    "buyIn": 20,
    "reminder": {
        "hour": 7,
        "minute": 30
    },
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-01-31T00:00:00Z"
}'
