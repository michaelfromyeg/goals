curl -X POST http://localhost:3000/goals/40218486-753e-4d6d-9a68-0af295953c5f/days \
    -F 'user=mdema' \
    -F 'file=@/home/mdema/code/goals/server/test/cat.jpg'

curl http://localhost:3000/goals/40218486-753e-4d6d-9a68-0af295953c5f/days
