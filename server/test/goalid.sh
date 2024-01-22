curl -X PATCH http://localhost:3000/goals/<goalid> \
-H 'Content-Type: application/json' \
-d '{
    "userB": "user456",
    "userBGoal": "Read 30 pages daily"
}'

curl http://localhost:3000/goals/<goalid>
