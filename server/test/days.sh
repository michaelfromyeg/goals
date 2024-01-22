curl -X POST http://localhost:3000/goals/<goalid>/days \
-H 'Content-Type: multipart/form-data' \
-F 'user=user123' \
-F 'photo=cat.png'

curl http://localhost:3000/goals/<goalid>/days
