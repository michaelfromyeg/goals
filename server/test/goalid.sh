curl -X PATCH http://localhost:3000/goals/40218486-753e-4d6d-9a68-0af295953c5f \
-H 'Content-Type: application/json' \
-d '{
    "userB": "user456",
    "userBGoal": "Read 30 pages daily"
}'

curl http://localhost:3000/goals/40218486-753e-4d6d-9a68-0af295953c5f
